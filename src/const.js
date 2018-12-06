

class Configuration {
    constructor() {
      this.getCurrencyAPI = function(currency1, currency2)
      {
        return `https://free.currencyconverterapi.com/api/v6/convert?q=${currency1}_${currency2}&compact=ultra`;
      };
      this.getAllCurrenciesAPI = function()
      {
          return `https://free.currencyconverterapi.com/api/v6/currencies`;
      }
    }
  };
  
  export default new Configuration();