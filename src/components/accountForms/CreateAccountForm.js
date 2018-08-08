import styles from './styles/windows10';
import React, { Component } from 'react';
import { Button, Label } from 'react-desktop/windows';
import PropTypes from 'prop-types';
import Radium from 'radium';


class AccountCreateForm extends React.Component{

 constructor(props) {
    super(props);

    this.state = {
                    email: '',
                    password: '',
                    name:'',
                    age: 0,
                    touched: {
                      email: false,
                      password: false,
                      age: false,
                      name: false
                    }
                  };

    this.handleChangeEmail= this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAge = this.handleChangeAge.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate(email, password, age, name) {
    // true means invalid, so our conditions got reversed

    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return {
      email: !emailRegex.test(String(email).toLowerCase()),
      password: password.length < 8,
      age: age > 150 || age === 0,
      name: name.length === 0
    };
  }


  // changes events-------------------------------------------------------------

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

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeAge(event){
    this.setState({age: event.target.value});
  }

  //----------------------------------------------------------------------------


  handleSubmit(event) {

    event.preventDefault();

    console.log("Notify the parent!");
    let cleanedObject = Object.assign({}, this.state);

    delete cleanedObject['touched'];

    this.props.OnSubmitEvent(cleanedObject);

  }

  render() {

    const errors = this.validate(this.state.email,
                                 this.state.password,
                                 this.state.age,
                                 this.state.name);

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };



    const isDisabled = Object.keys(errors).some(x => errors[x]);


    let componentStyle = { ...styles.textBox };
    let formStyle = { ...styles.formBox };

    return (

        <form style={formStyle} onSubmit={this.handleSubmit}>

          <label>
            Email:
            <input style={componentStyle} type="email"
                   className={shouldMarkError("email") ? "error" : ""}
                   value={this.state.email}
                   onChange={this.handleChangeEmail}
                   onBlur={this.handleBlur('email')} />
          </label>

          <label>
            Name:
            <input style={componentStyle} type="text"
                   className={shouldMarkError("name") ? "error" : ""}
                   value={this.state.name}
                   onChange={this.handleChangeName}
                   onBlur={this.handleBlur('name')} />
          </label>

          <label>
            Password:
            <input style={componentStyle} type="password"
                   className={shouldMarkError("password") ? "error" : ""}
                   value={this.state.password}
                   onChange={this.handleChangePassword}
                   onBlur={this.handleBlur('password')} />
          </label>

          <label>
            Age:
            <input style={componentStyle} type="number"
                   className={shouldMarkError("age") ? "error" : ""}
                   value={this.state.age}
                   onChange={this.handleChangeAge}
                   onBlur={this.handleBlur('age')} />
          </label>


          <Button disabled={isDisabled} push color={this.props.color} onClick={this.handleSubmit}>
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
