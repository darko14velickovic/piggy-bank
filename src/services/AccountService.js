let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}

class AccountService {

  constructor(dataStore) {
    this.db = dataStore;



  }

  // CRUDs

  getAccount(email, callback)
  {
    this.db.users.find({ email: email }, function (err, docs) {

          if(docs.length === 0)
          {
            callback(null);
          }
          else
          {
            callback(docs[0]);
          }

      });
  }

  createAccount(accountObject, successCallback, failedCallback) {

      let context = this.db.users;

      this.db.users.find({ email: accountObject.email }, function (err, docs) {

          if(docs.length === 0)
          {

            accountObject.password = crypto.createHash('sha256').update(accountObject.password).digest('base64');

            context.insert(accountObject, function (err, newDoc) {

              if(err)
              {
                console.log(err);
                failedCallback(err);
              }
              else
              {
                console.log(newDoc);
                successCallback();
              }


            });

          }
          else
          {
            alert("Account with email: " + accountObject.email +
              " already exists!");
            failedCallback("AlreadyExists");
          }


      });
  }

  removeAccount(email){

    this.db.users.remove({ email: email }, {}, function (err, numRemoved) {

      console.log("Removed: ");
      console.log(numRemoved);

    });

  }


  logginAccount(object, callback)
  {
    this.db.users.find({ email: object.email }, function (err, docs) {

          if(docs.length === 0)
          {
            callback({status: "Not found"});
          }
          else
          {
            let hash = crypto.createHash('sha256').update(object.password).digest('base64');
            if(hash === docs[0].password)
            {
              docs[0].status = "Success";

              if(window.localStorage != undefined)
              {
                  window.localStorage.setItem('loggedInUser', object.email);
              }

              callback(docs[0])
            }
            else
            {
              docs[0].status = "Wrong password";
              callback(docs[0])
            }

          }

      });
  }

};
module.exports = AccountService;
