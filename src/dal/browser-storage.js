class OfflineStorage {

    constructor() {
        this.descriptionObject = {};
        this.descriptionObject.userEmailKey = "loggedInUser";
       
    };
    
    // general
    
    setItem(key, value)
    {
        return localStorage.setItem(key, value); //test
    };

    getItem(key)
    {
        return localStorage.getItem(key);
    };

    removeItem(key)
    {
        return localStorage.removeItem(key);
    };

    // user persistence

    setLoggedinUser(email)
    {
        return localStorage.setItem(this.descriptionObject.userEmailKey, email);
    };

    getLoggedinUser()
    {
        return localStorage.getItem(this.descriptionObject.userEmailKey);
    };

    logoutTheCurrentuser()
    {
        localStorage.removeItem(this.descriptionObject.userEmailKey);
    };
    
  };
  
  module.exports = OfflineStorage;