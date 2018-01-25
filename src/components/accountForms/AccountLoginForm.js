import styles from './styles/windows10';
import React, { Component } from 'react';
import { Button, Label } from 'react-desktop/windows';
import PropTypes from 'prop-types';
import Radium from 'radium';


class AccountLoginForm extends React.Component{

 constructor(props) {
    super(props);

    this.state = {email: '', password: ''};

    this.handleChangeEmail= this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePassword(event){
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {

    event.preventDefault();

    console.log("Notify the parent!");
    this.props.OnSubmitEvent(this.state);

  }

  handleLogout(event)
  {
    event.preventDefault();

    console.log("Notify the parent!");
    this.props.OnLogoutEvent(this.state);
  }

  render() {

    let componentStyle = { ...styles.textBox };
    let formStyle = { ...styles.formBox };
    return (

        <form style={formStyle} onSubmit={this.handleSubmit}>

          <label>
            Email:
            <input style={componentStyle} type="email" value={this.state.name} onChange={this.handleChangeEmail} />
          </label>

          <label>
            Password:
            <input style={componentStyle} type="password" value={this.state.password} onChange={this.handleChangePassword} />
          </label>


          <Button push color={this.props.color} onClick={this.handleSubmit}>
            Login
          </Button>

          <Button push color={this.props.color} onClick={this.handleLogout}>
            Logout
          </Button>

        </form>
    );
  }
}

AccountLoginForm.propTypes = {
  OnSubmitEvent: PropTypes.func,
  OnLogoutEvent: PropTypes.func
};

export default AccountLoginForm
