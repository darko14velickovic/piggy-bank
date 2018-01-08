import React, { Component } from 'react';
import { Button, View, Label } from 'react-desktop/windows';
import DebtService from '../services/DebtService'
import DebtAddForm from './debtForms/DebtAddForm'

const remote = window.require('electron').remote;
const path = window.require('path');
const app = remote.app;

var Datastore = remote.require('nedb')
    , db = new Datastore({ filename: path.join(app.getAppPath(), "/db/test.db"), autoload: true });


class DebtComponent extends React.Component{

 constructor(props) {
    super(props);
    this.state = {name: props.name, money: props.money};
    this.debtService = new DebtService(db);
    //this.handleChangeName = this.handleChangeName.bind(this);
    //this.handleChangeMoney = this.handleChangeMoney.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
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
