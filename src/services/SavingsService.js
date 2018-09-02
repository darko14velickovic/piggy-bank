class SavingsService {

  constructor(dataStore) {
    this.db = dataStore;
  }

  // CRUDs

  getAllSavingsForUser(email, callback)
  {
    this.db.savings.find({accountEmail: email}, function(err, docs){
      console.log(err);

      callback(docs);
    });
  }

  createSavingsAccount(accountObject, callback) {
    var that = this;
    this.db.savings.find({ accountEmail: accountObject.accountEmail, name: accountObject.name },
      function (err, docs) {
        if (err) {
          alert("Error happened with account creation!");
          return;
        }

        if (docs.length === 0) {
          that.db.savings.insert(accountObject, function (err, newDoc) {

            console.log(err);
            console.log(newDoc);

            callback(newDoc);

          });
        }
        else {
          that.db.savings.update({ _id: docs[0]._id },
            {
              $set:
              {
                amount: accountObject.amount,
                name: accountObject.name,
                currency: accountObject.currency
              }
            },
            {
              multi:false
            },
            function (err, numReplaced) {

              console.log(err);
              if(!err)
              {
                let returnObject = Object.assign(docs[0]);

                returnObject.amount = accountObject.amount;
                returnObject.name = accountObject.name;
                returnObject.currency =accountObject.currency;

                callback(returnObject);
              }
              console.log(numReplaced);

            });
        }
      });

  }

  removeSavingsAccount(accountID, successCallback, errorCallback){
      this.db.savings.remove({ _id: accountID }, {}, function (err, numRemoved) {

      if(err)
      {
        errorCallback(err);
        console.log("Not removing, error.");
        console.e(err);
      }
      else
      {
        successCallback(numRemoved);
        console.log("Removed: ");
        console.log(numRemoved);
      }


    });
  }

  addMoneyToAccount(accountID, money, currency)
  {
      this.db.savings.find({ _id: accountID, currency: currency },
        function (err, docs) {

                  if(docs.length != 0)
                  {
                    let doc = docs[0];
                    doc.money += money;
                    this.db.savings.update({ _id: doc._id }, doc, {}, function (err, numReplaced) {

                        if(err)
                        {
                          alert("Error happened!");
                        }

                    });
                  }
                  else
                  {
                    alert("Account does not exists!");
                  }

        });
  }

};
module.exports = SavingsService;
