import React from 'react';
import { View } from 'react-desktop/windows';
import AccountLoginForm from './accountForms/AccountLoginForm'
import AccountCreateForm from './accountForms/CreateAccountForm'
import AccountService from '../services/AccountService'
import SwitchComponent from './Switch'
import DatabaseContext from '../dal/database'
import OfflineStorage from '../dal/browser-storage'
import PropTypes from 'prop-types';

class AccountComponent extends React.Component{

 constructor(props) {
    super(props);
    this.state = { showLoginForm : true, loggedInUser : props.loggedInUser};


    this.storage = new OfflineStorage();

    this.currentEmail = props.loggedInUser;
    this.accountService = new AccountService(DatabaseContext);

    this.handleCreateAccountClick = this.handleCreateAccountClick.bind(this);
  }

  handleCreateAccountClick(flag)
  {
    console.log(flag);
    this.setState({ showLoginForm: flag });
  }

  handleLogoutFormSubmit(obj)
  {
    console.log("Handling logout in account component!");
    console.log(obj);

    this.setState({loggedInUser : "" });
    this.props.OnLogoutEvent();
  }

  handleLoginFormSubmit(obj) {
    let that = this;
    this.accountService.logginAccount(obj, function(result){

        if(result.status === "Success")
        {
          that.currentEmail = result.email;
          that.setState({ loggedInUser: result.email });
          that.storage.setLoggedinUser(result.email);

          that.props.OnSubmitEvent({ email: that.currentEmail });
          alert("Logged in as: " + that.currentEmail);
        }
        else
        {
          alert("Can't log in the user. Reason: " + result.status);
        }

        console.log("Object:");
        console.log(obj);

    });




  }

  handleCreateFormSubmit(obj)
  {

    var that = this;
    let safeKeeping = Object.assign({}, obj);

    this.accountService.createAccount(obj,
      function(){
        alert("Successfully created account: " + obj.email);
        that.handleLoginFormSubmit(safeKeeping);
    },function(err){
      alert("Creation of the account failed!");
    });

    console.log("Create form object:");
    console.log(obj);
  }

  render() {
    const boolLogFlag = this.state.loggedInUser != '';
    return (
      <View
        color={this.props.color}
        padding="20px"
        horizontalAlignment="left"
        verticalAlignment="left"
        layout="vertical"
      >
      { boolLogFlag ? <h3>User: {this.state.loggedInUser} logged in.</h3> : "" }

      <SwitchComponent OnChangeEvent={this.handleCreateAccountClick} />

      { this.state.showLoginForm
                ? <AccountLoginForm OnSubmitEvent={this.handleLoginFormSubmit.bind(this)}
                                    OnLogoutEvent={this.handleLogoutFormSubmit.bind(this)}
                                    loggedIn = {boolLogFlag} />
                : <AccountCreateForm OnSubmitEvent={this.handleCreateFormSubmit.bind(this)} />
      }


      </View>

    );
  }
}
AccountComponent.propTypes = {
  OnSubmitEvent: PropTypes.func,
  OnLogoutEvent: PropTypes.func
};
export default AccountComponent
