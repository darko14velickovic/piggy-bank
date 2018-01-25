import styles from './styles/windows10';
import React, { Component } from 'react';
import { Button, Label } from 'react-desktop/windows';
import PropTypes from 'prop-types';
import Radium from 'radium';


class AccountCreateForm extends React.Component{

 constructor(props) {
    super(props);

    this.state = {email: '', password: '', name:'', age: 0};

    this.handleChangeEmail= this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAge = this.handleChangeAge.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // changes events-------------------------------------------------------------

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePassword(event){
    this.setState({password: event.target.value});
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeAge(event){
    this.setState({age: event.target.value});
  }

  //----------------------------------------------------------------------------


  handleSubmit(event) {

    alert("Logged in as: " + this.state.email);
    event.preventDefault();

    console.log("Notify the parent!");
    this.props.OnSubmitEvent(this.state);

  }

  render() {

    let componentStyle = { ...styles.textBox };
    let formStyle = { ...styles.formBox };
    return (

        <form style={formStyle} onSubmit={this.handleSubmit}>

          <label>
            Email:
            <input style={componentStyle} type="email" value={this.state.email} onChange={this.handleChangeEmail} />
          </label>

          <label>
            Name:
            <input style={componentStyle} type="text" value={this.state.name} onChange={this.handleChangeName} />
          </label>

          <label>
            Password:
            <input style={componentStyle} type="password" value={this.state.password} onChange={this.handleChangePassword} />
          </label>

          <label>
            Age:
            <input style={componentStyle} type="number" value={this.state.age} onChange={this.handleChangeAge} />
          </label>


          <Button push color={this.props.color} onClick={this.handleSubmit}>
            Create account
          </Button>
        </form>
    );
  }
}

AccountCreateForm.propTypes = {
  OnSubmitEvent: PropTypes.func
};

export default AccountCreateForm
