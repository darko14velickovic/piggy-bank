class DebtService {

  constructor(dataStore) {
    this.db = dataStore;
  }

  // CRUDs

  getAllDebts(email, callback)
  {
    this.db.debts.find({accountEmail: email}, function(err, docs){
      console.log(err);

      callback(docs);
    });
  }

  insertDebt(debtObject) {

      this.db.debts.find({ name: debtObject.name }, function (err, docs) {

          if(docs.length === 0)
          {
            this.db.debts.insert(debtObject, function (err, newDoc) {

              console.log(err);
              console.log(newDoc);

            });
          }
          else
          {
            this.db.update({ _id: docs[0]._id },
            { $set: { money: docs[0].money + debtObject.money } },
            function (err, numReplaced) {

              console.log(err);
              console.log(numReplaced);

            });
          }

      });


  }

  removeDebt(debtID){

    this.db.debts.remove({ _id: debtID }, {}, function (err, numRemoved) {

      console.log("Removed: ");
      console.log(numRemoved);

    });

  }

  updateDebt(debtObject){
    // Replace a document by another
    this.db.debts.update({ _id: debtObject._id }, debtObject, {}, function (err, numReplaced) {

      console.log("Replaced: ");
      console.log(numReplaced);

    });
  }

};
module.exports = DebtService;
