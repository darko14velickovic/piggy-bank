const remote = window.require('electron').remote;
const path = window.require('path');
const app = remote.app;
const Datastore = remote.require('nedb');
const fs = window.require('fs');


class DatabaseContext {
  constructor() {

    let basePath = app.getAppPath('userData');
    
    try
    {
      fs.mkdirSync(path.join(basePath, '/db'), { recursive: true }, (err) => {
        if (err) throw err;
      });
  
      fs.openSync(path.join(basePath, "/db/debt.db"), 'w');
      fs.openSync(path.join(basePath, "/db/users.db"), 'w');
      fs.openSync(path.join(basePath, "/db/savings.db"), 'w');
      fs.openSync(path.join(basePath, "/db/currencies.db"), 'w');
      fs.openSync(path.join(basePath, "/db/conversions.db"), 'w');
    }
    catch(error)
    {

    }

    
    this.debts =  new Datastore({ filename: path.join(basePath, "/db/debt.db"), autoload: true });
    this.users =  new Datastore({ filename: path.join(basePath, "/db/users.db"), autoload: true });
    this.savings = new Datastore({ filename: path.join(basePath, "/db/savings.db"), autoload: true });
    this.currencies = new Datastore({ filename: path.join(basePath, "/db/currencies.db"), autoload: true });
    this.conversions = new Datastore({ filename: path.join(basePath, "/db/conversions.db"), autoload: true });
  }
};

export default new DatabaseContext();
