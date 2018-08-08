import styles from './styles/windows10';
import React, { Component } from 'react';
import { Button, Label } from 'react-desktop/windows';
import PropTypes from 'prop-types';
import Radium from 'radium';


class AccountLoginForm extends React.Component{

 constructor(props) {
    super(props);

    this.state = {
                    email: '',
                    password: '',
                    loggedIn: props.loggedIn,
                    touched: {
                      email: false,
                      password: false,
                    }
                  };

    this.handleChangeEmail= this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePassword(event){
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {

    event.preventDefault();
    // this.setState({ loggedIn: true });
    console.log("Notify the parent!");
    this.props.OnSubmitEvent(this.state);

  }

  handleLogout(event)
  {
    event.preventDefault();
    this.setState({ loggedIn: false });
    console.log("Notify the parent!");
    this.props.OnLogoutEvent(this.state);
  }

  validate(email, password) {
    // true means invalid, so our conditions got reversed

    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return {
      email: !emailRegex.test(String(email).toLowerCase()),
      password: password.length < 8,
    };
  }

  render() {

    const errors = this.validate(this.state.email, this.state.password);

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };


    const isDisabled = Object.keys(errors).some(x => errors[x]);

    let componentStyle = { ...styles.textBox };
    let formStyle = { ...styles.formBox };
    let button = null;



    if(this.state.loggedIn)
    {
      button = <Button push color={this.props.color} onClick={this.handleLogout}>Logout</Button>;
    }
    else
    {
      button = <Button disabled={isDisabled} push color={this.props.color} onClick={this.handleSubmit}>Login</Button>;
    }
    return (

        <form style={formStyle} onSubmit={this.handleSubmit}>

          <label>
            Email:
            <input className={shouldMarkError("email") ? "error" : ""}
                   style={componentStyle} type="email"
                   value={this.state.name}
                   onChange={this.handleChangeEmail}
                   onBlur={this.handleBlur('email')} />
          </label>

          <label>
            Password:
            <input className={shouldMarkError("password") ? "error" : ""}
                   style={componentStyle} type="password"
                   value={this.state.password}
                   onChange={this.handleChangePassword}
                   onBlur={this.handleBlur('password')} />
          </label>
          {button}
        </form>
    );
  }
}

AccountLoginForm.propTypes = {
  OnSubmitEvent: PropTypes.func,
  OnLogoutEvent: PropTypes.func
};

export default AccountLoginForm
