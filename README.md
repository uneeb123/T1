# Treasury client

Treasury client is a mobile application that is a special form of Bitcoin wallet.

The frontend of the client application is built using React Native. The backend of the client is written in Java.
For that reason, currently treasury is only supported on Android devices. We are working on providing an alternative
support for people that do not have android devices, but still want to use Treasury.

The frontend of the application in structured in the following format:
* All screens are in the root directory of the project. And referenced in the App.js.
* All re-useable components that are referenced in the any screen can be found in the /Components directory.
* Calls to the treasury server are made from the models, which can be found in the /Model directory.

Treasury use Firebase authentication to authenticate using phone numbers.

Treasury uses Bitcoinj library to support Bitcoin wallet.
