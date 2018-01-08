class DebtService {

  constructor(dataStore) {
    this.dbContext = dataStore;
  }

  // CRUDs
  insertDebt(debtObject) {

      this.dbContext.insert(debtObject, function (err, newDoc) {

      console.log(err);
      console.log(newDoc);

    });
  }

  removeDebt(debtID){

    this.dbContext.remove({ _id: debtID }, {}, function (err, numRemoved) {
      console.log("Removed: ");
      console.log(numRemoved);
    });

  }

  updateDebt(debtObject){
    // Replace a document by another
    this.dbContext.update({ _id: debtObject._id }, debtObject, {}, function (err, numReplaced) {
      console.log("Replaced: ");
      console.log(numReplaced);
    });
  }

};
module.exports = DebtService;
