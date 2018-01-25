import React, { Component } from 'react';
import { View, Label, Button } from 'react-desktop/windows';
import AccountLoginForm from './accountForms/AccountLoginForm'
import AccountCreateForm from './accountForms/CreateAccountForm'
import AccountService from '../services/AccountService'
import SwitchComponent from './Switch'
import DatabaseContext from '../dal/database'
import PropTypes from 'prop-types';

class AccountComponent extends React.Component{

 constructor(props) {
    super(props);
    this.state = { showLoginForm : true };

    this.currentEmail = props.loggedInUser;
    this.accountService = new AccountService(new DatabaseContext());

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
    this.props.OnLogoutEvent();
  }

  handleLoginFormSubmit(obj) {
    let that = this;
    this.accountService.logginAccount(obj, function(result){

        if(result.status === "Success")
        {
          that.currentEmail = result.email;
          that.props.OnSubmitEvent({ email: that.currentEmail });
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
    console.log("Create form object:");
    this.accountService.createAccount(obj);
    console.log(obj);
  }

  render() {
    return (
      <View
        color={this.props.color}
        padding="20px"
        horizontalAlignment="left"
        verticalAlignment="left"
        layout="vertical"
      >
      <SwitchComponent OnChangeEvent={this.handleCreateAccountClick} />

      { this.state.showLoginForm
                ? <AccountLoginForm OnSubmitEvent={this.handleLoginFormSubmit.bind(this)}
                                    OnLogoutEvent={this.handleLogoutFormSubmit.bind(this)} />
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
