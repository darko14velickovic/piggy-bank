const remote = window.require('electron').remote;
const path = window.require('path');
const app = remote.app;
const Datastore = remote.require('nedb');


class DatabaseContext {
  constructor() {
    this.debts =  new Datastore({ filename: path.join(app.getAppPath(), "/db/debt.db"), autoload: true });
    this.users =  new Datastore({ filename: path.join(app.getAppPath(), "/db/users.db"), autoload: true });
    this.savings = new Datastore({ filename: path.join(app.getAppPath(), "/db/savings.db"), autoload: true });
  }
};

export default new DatabaseContext();
