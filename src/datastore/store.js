export const Store = {
  _instance: null,
  get instance() {
    if (!this._instance) {
      this._instance = {
        handlers: [],

        state: {
          test: false,
          user: '',
          isLoggedIn: false,
          token: '',
        },

        subscribe (fn) {
          this.handlers.push(fn);
        },

        unsubscribe (fn) {
          this.handlers = this.handlers.filter(
            function (item) {
              if (item !== fn) {
                return item;
              }
            }
          );
        },

        setState(obj, passedScope) {

          Object.assign(this.state, obj);

          var scope = passedScope || window;
          this.handlers.forEach(function (item) {
            item.call(scope, obj);
          });
        },

        _type: 'Store',

        get type() {
          return this._type;
        },

        set type(value) {
          this._type = value;
        }
      };
    }
    return this._instance;
  }
};
