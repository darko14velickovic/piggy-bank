import React, { Component } from 'react';
import { Button, View, Label } from 'react-desktop/windows';
import DebtService from '../services/DebtService'
import DebtAddForm from './debtForms/DebtAddForm'
import DatabaseContext from '../dal/database'

const remote = window.require('electron').remote;
const path = window.require('path');
const app = remote.app;




class DebtComponent extends React.Component{

 constructor(props) {
    super(props);
    this.state = {name: props.name, money: props.money};
    this.debtService = new DebtService(new DatabaseContext());
  }

  handleAddFormSubmit(obj) {

    this.debtService.insertDebt(obj);

    console.log("Added object:");
    console.log(obj);
  }

  render() {
    return (
      <View
        color={this.props.color}
        padding="20px"
        horizontalAlignment="left"
        verticalAlignment="left"

      >
      <DebtAddForm OnSubmitEvent={this.handleAddFormSubmit.bind(this)} />

      </View>

    );
  }
}

export default DebtComponent
