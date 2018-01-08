import styles from './styles/windows10';
import React, { Component } from 'react';
import { Button, Label } from 'react-desktop/windows';
import PropTypes from 'prop-types';
import Radium from 'radium';


class DebtAddForm extends React.Component{

 constructor(props) {
    super(props);

    this.state = {name: '', money: 0};
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeMoney = this.handleChangeMoney.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeMoney(event){
    this.setState({money: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name + " with debt: " + this.state.money.toString());
    event.preventDefault();

    // this.debtService.insertDebt({ person: this.state.name, debt: this.state.money});

    console.log("Notify the parent!");
    this.props.OnSubmitEvent({name: this.state.name, money: this.state.money });

  }

  render() {

    let componentStyle = { ...styles.textBox };

    return (

        <form onSubmit={this.handleSubmit}>

          <label>
            Name:
            <input style={componentStyle} type="text" value={this.state.name} onChange={this.handleChangeName} />
          </label>

          <label>
            Money:
            <input style={componentStyle} type="number" value={this.state.money} onChange={this.handleChangeMoney} />
          </label>


          <Button push color={this.props.color} onClick={this.handleSubmit}>
            Submit
          </Button>
        </form>
    );
  }
}

DebtAddForm.propTypes = {
  OnSubmitEvent: PropTypes.func
};

export default DebtAddForm
