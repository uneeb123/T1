package com.treasury;

import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.FirebaseException;
import com.google.firebase.FirebaseTooManyRequestsException;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthProvider;

import java.util.concurrent.TimeUnit;

import static android.content.ContentValues.TAG;

public class PhoneVerification extends ReactContextBaseJavaModule {

    private static final String TAG = "PhoneVerification";

    private FirebaseAuth mAuth;
    private String mPhoneNumber;
    private String mCallingCode;
    private String mVerificationId;
    private PhoneAuthProvider.ForceResendingToken mResendToken;
    private PhoneAuthProvider.OnVerificationStateChangedCallbacks mCallbacks;

    public PhoneVerification(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "PhoneVerification";
    }

    @ReactMethod
    public void show(String value) {
        Toast.makeText(getReactApplicationContext(), value, Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void verifyCode(String code, Promise promise) {
        try {
            PhoneAuthCredential credential = PhoneAuthProvider.getCredential(mVerificationId, code);
            promise.resolve(null);
        } catch(Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void sendCode(String callingCode, String phoneNumber, Promise promise) {
        try {
            mCallingCode = callingCode;
            mPhoneNumber = phoneNumber;
            registerCallbacks();
            startPhoneNumberVerification();
            promise.resolve(null);
        } catch(Exception e) {
            promise.reject(e);
        }
    }

    private void triggerVerificationCode() {
        sendEvent("codeSent", null);
    }

    // TODO: handle event
    private void triggerInvalidPhoneNumber() {
        sendEvent("invalidPhoneNumber", null);
    }

    // TODO: handle event
    private void triggerQuotaExceeded() {
        sendEvent("quotaExceeded", null);
    }

    private void registerCallbacks() {
        mCallbacks = new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {

            @Override
            public void onVerificationCompleted(PhoneAuthCredential credential) {
                show("Something unexpected happened");
            }

            @Override
            public void onVerificationFailed(FirebaseException e) {
                Log.w(TAG, "onVerificationFailed", e);
                if (e instanceof FirebaseAuthInvalidCredentialsException) {
                    triggerInvalidPhoneNumber();

                } else if (e instanceof FirebaseTooManyRequestsException) {
                    triggerQuotaExceeded();
                }
            }

            @Override
            public void onCodeSent(String verificationId,
                                   PhoneAuthProvider.ForceResendingToken token) {
                Log.d(TAG, "onCodeSent:" + verificationId);

                mVerificationId = verificationId;
                mResendToken = token;

                show("Code was sent");
                triggerVerificationCode();
            }
        };
    }

    private void startPhoneNumberVerification() {
        String constructedNumber = constructNumber(mCallingCode, mPhoneNumber);
        PhoneAuthProvider.getInstance().verifyPhoneNumber(
                constructedNumber,              // Phone number to verify
                60,                          // Timeout duration
                TimeUnit.SECONDS,               // Unit of timeout
                getCurrentActivity(),           // Activity (for callback binding)
                mCallbacks);                    // OnVerificationStateChangedCallbacks
    }

    private void signInWithPhoneAuthCredential(PhoneAuthCredential credential) {
        mAuth.signInWithCredential(credential)
                .addOnCompleteListener(getCurrentActivity(), new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            // Sign in success, update UI with the signed-in user's information
                            Log.d(TAG, "signInWithCredential:success");

                            FirebaseUser user = task.getResult().getUser();
                            show("Success");
                            // ...
                        } else {
                            // Sign in failed, display a message and update the UI
                            Log.w(TAG, "signInWithCredential:failure", task.getException());
                            if (task.getException() instanceof FirebaseAuthInvalidCredentialsException) {
                                // The verification code entered was invalid
                            }
                            show("Failure");
                        }
                    }
                });
    }

    private String constructNumber(String callingCode, String phoneNumber) {
        return "+" + callingCode + phoneNumber;
    }

    private void sendEvent(String eventName,
                           @Nullable WritableMap params) {
        ReactContext reactContext = this.getReactApplicationContext();
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}