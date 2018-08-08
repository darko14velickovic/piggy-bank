import React, { Component } from 'react';

class SavingsComponent extends React.Component{

 constructor(props) {
    super(props);
    console.log("Logged in user from savings component: ");
    console.log(this.props.loggedInUser);

    this.state = {
                  loggedInUser : this.props.loggedInUser,
                  savingsAccounts: [],
                  createSavings: false
                 };

    this.openCreateSavingsAccount = this.openCreateSavingsAccount.bind(this);
    this.createSaving = this.createSaving.bind(this);
  }

  updateView(loggedUser){
    this.setState({loggedInUser: loggedUser});
  }

  openCreateSavingsAccount(){
    console.log("Opening the create account menu.");
    this.setState({createSavings: true});
  }
  createSaving(){
    console.log("Simulate create saving.");
    this.state.savingsAccounts.push({ _id: new Date().toLocaleTimeString(), name: "Random", amount: "100k", currency: "din"});
    this.setState({createSavings: false});
  }
  render() {
    let renderCreateSevings = this.state.createSavings;

    const savingsList = this.state.savingsAccounts.map((savingsAccount) =>
      <div key={savingsAccount._id} className="saving-item col-md-3">
          <div className="row">
            <div className="col-md-12">
              <i className="fa fa-briefcase small-icon"></i>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
             <i className="acc-name-field"> {savingsAccount.name} </i>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <i className="acc-name-field"> Current status: {savingsAccount.amount} {savingsAccount.currency} </i>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <i className="fa fa-eye small-icon"></i>
              <i className="fa fa-times small-icon"></i>
            </div>
          </div>

        </div>
    );

    return (
      <div className="row container">
      <div className="saving-holder row">

        {savingsList}

        <div className="saving-item col-md-3">

          <div className="row">
            <div className="col-md-12">
              <i onClick={this.openCreateSavingsAccount} className="fa fa-plus-square big-icon"></i>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <i className="add-text-field" > Add new savings </i>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
      {renderCreateSevings &&

            <div className="col-lg-12">
              <h1>Placeholder saver</h1>
              <button onClick={this.createSaving}>Save</button>
            </div>


        }
      </div>
      </div>

      )
    }
  }
export default SavingsComponent
