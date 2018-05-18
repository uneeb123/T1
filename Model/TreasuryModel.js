import {
  AsyncStorage,
} from 'react-native';

export default class TreasuryModel {
  constructor() {
    this.baseUrl = "http://10.0.2.2:3000/"
    // this.baseUrl = "http://treasury.addr.company/";
    this.memberUrl = this.baseUrl + "member/"
    this.treasuryUrl = this.baseUrl + "treasury/"
  }

  /**
   * Checks for saved member
   * @returns {Promise} true if user id is saved, false otherwise
   */
  userSaved() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('userId').then((id) => {
        if (id == null) {
          resolve(false);
        }
        else {
          resolve(true);
        }
      }, (e) => {
        reject(e);
      });
    });
  }

  /**
   * Gets the user stored and fetch full information
   * @returns {Promise} returns user information
   */
  getUser() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('userId').then((id) => {
        if (id == null) {
          reject(new Error('user not saved'));
        } else {
          this.getUserDetails(id).then((user) => {
            resolve(user);
          }, (e) => {
            reject(e);
          });
        }
      }, (e) => {
        reject(e);
      });
    });
  }

  /**
   * Registers the user in the server and saves the id
   * @param {String} phoneNumber
   * @returns {Promise} user id if operation successful, error otherwise
   */
  saveUser(phoneNumber) {
    return new Promise((resolve, reject) => {
      body = {
        phone_number: phoneNumber,
      };
      fetch(this.memberUrl, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json'}
      }).then((response) => {
        response.json().then((json) => {
          var userId = json.id;
          AsyncStorage.setItem('userId', userId).then(() => {
            resolve(userId);
          }, (e) => {
            reject(e);
          });
        }, (e) => {
          reject(e);
        });
      });
    });
  }

  /**
   * Used for retrieving all the relevant information
   * @returns {Promise} object containing member information and his treasuries
   */
  getDetailedInformation() {
    return new Promise((resolve, reject) => {
      this.getUser().then((user) => {
        this.getUserTreasuries(user._id_).then((treasuries) => {
          var result = {
            user: user,
            treasuries: treasuries
          };
          resolve(result);
        }, (e) => {
          reject(e);
        });
      }, (e) => {
        reject(e);
      });
    });
  }

  /**
   * Given a user id, returns the collection of the treasuries of different kinds
   * @param {String} user id
   * @returns {Promise} treasury object classified different ways
   */
  getUserTreasuries(userId) {
    return new Promise((resolve, reject) => {
      var readyTreasuries = [];
      var invitedTreasuries = [];
      var pendingTreasuries = [];
      this.getUserDetails(userId).then((user) => {
        var treasuriesPartOf = user.status;
        function eachTreasury(i, that) {
          if (i >= treasuriesPartOf.length) {
            var treasuries = {
              ready_treasuries: readyTreasuries,
              invited_treasuries: invitedTreasuries,
              pending_treasuries: pendingTreasuries,
            };
            resolve(treasuries);
          } else {
            let treasuryId = treasuriesPartOf[i].treasury;
            let inviteAccepted = treasuriesPartOf[i].invite_accepted;
            if (inviteAccepted) {
              that.getTreasuryDetails(treasuryId).then((treasury) => {
                if (treasury.ready) {
                  readyTreasuries.push(treasury);
                  eachTreasury(i+1, that);
                } else {
                  pendingTreasuries(treasury);
                  eachTreasury(i+1, that);
                }
              }, (e) => {
                reject(e);
              });
            } else {
              that.getTreasuryDetails(treasuryId).then((treasury) => {
                invitedTreasuries(treasury);
                eachTreasury(i+1, that);
              }, (e) => {
                reject(e);
              });
            }
          }
        }
        eachTreasury(0, this);
      });
    });
  }

  /**
   * Fetches information about the user given the id
   * @param {String} userId
   * @returns {Promise} full information about the user
   */
  getUserDetails(userId) {
    return new Promise((resolve, reject) => {
      fetch(this.memberUrl + userId).then((response) => {
        response.json().then((json) => {
          resolve(json);
        }, (e) => {
          reject(e);
        });
      }, (e) => {
        reject(e);
      });
    });
  }

  /**
   * Fetches information about the treasury given the id
   * @param {String} treasuryId
   * @returns {Promise} full information about the treasury
   */
  getTreasuryDetails(treasuryId) {
    return new Promise((resolve, reject) => {
      fetch(this.treasuryUrl + treasuryId).then((response) => {
        response.json().then((json) => {
          resolve(json);
        }, (e) => {
          reject(e);
        });
      }, (e) => {
        reject(e);
      });
    });
  }

  /**
   * Fetches the history of treasury
   * @param {String} treasury id
   * @returns {Promise} history of the treasury
   */
  getTreasuryHistory(treasuryId) {
    return new Promise((resolve, reject) => {
      getTreasuryDetails(treasuryId).then((treasury) => {
        resolve(treasury.history);
      }, (e) => {
        reject(e);
      });
    });
  }

  /**
   * Creates a new treasury
   * @param {Array} phone numbers of invited members
   * @param {String} phone number of treasurer
   * @param {String} phone number of creator
   * @param {Number} spending limit of the treasury
   * @returns {Promise} id of the created treasury
   */
  createTreasury(invitedMembers, treasurer, creator, limit) {
    return new Promise((resolve, reject) => {
      body = {
        invited_members: invitedMembers,
        treasurer: treasurer,
        creator: creator,
        limit: limit,
      };
      fetch(this.treasuryUrl, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json'}
      }).then((response) => {
        response.json().then((json) => {
          var treasuryId = json.id;
          resolve(treasuryId);
        }, (e) => {
          reject(e);
        });
      });
    });
  }
}
