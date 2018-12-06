import axios from 'axios';
import Configuration from '../const'
import DatabaseContext from '../dal/database'

class CurrencyHelper
{
    constructor()
    {

    }

    async getExchange(currency1, currency2)
    {
        var that = this;

        return await axios.get(Configuration.getCurrencyAPI(currency1, currency2))
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            })
            .then(res => {
                console.log("Got response from server: ");
                console.log(res);

                var data = res.data[`${currency1}_${currency2}`];

                DatabaseContext.conversions.find({ "from": currency1, "to": currency2 }, function (err, docs) {
                    if (err) {
                        alert("Error happened with fetching Exchange conversions!");
                        return;
                    }

                    if (docs.length === 0) {
                        DatabaseContext.conversions.insert({from: currency1, to: currency2, data: data}, function (err, newDoc) {
              
                          console.log(err);
                          console.log(newDoc);
              
                          alert("Successfully added conversion!");
              
                        });
                    }
                    else
                    {
                        DatabaseContext.conversions.update({ from: currency1, to: currency2 }, { $set: { data: data } }, { multi: true }, function (err, numReplaced) {
                            if (err) {
                                alert("Error happened with fetching Exchange conversions!");
                                return;
                            }
                            else{
                                alert("Updated: "+ numReplaced + " conversions.");
                            }
                        });
                    }
                  });
            });
    }

    getAllCurrencies()
    {
        // TODO: add the database support for this
        axios.get(Configuration.getAllCurrenciesAPI())
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            })
            .then(res => {
                console.log("Got response from server: ");
                console.log(res);
                
                var allCurrencies = [];

                Object.keys(res.data.results).map(function(key, index) {
                    allCurrencies.push(res.data.results[key]);
                });


                // clear all previous
                DatabaseContext.currencies.remove({}, { multi: true }, function (err, numRemoved) {
                    if(err)
                        alert("Error happened with inserting of currencies.");
                    else
                        alert("Currencies removed: " + numRemoved.toString());
                });

                // add new ones
                DatabaseContext.currencies.insert(allCurrencies, function (err, newDocs) {
                    // Two documents were inserted in the database
                    // newDocs is an array with these documents, augmented with their _id
                    if(err)
                        alert("Error happened with inserting of currencies.");
                    else
                        alert("Currencies updated.");
                  });
            });
    }
}

export default CurrencyHelper;

