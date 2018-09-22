import React from 'react';
import SavingsService from '../services/SavingsService'
import DatabaseContext from '../dal/database'
import styles from './styles/windows10';
import { Button } from 'react-desktop/windows';

class SavingsComponent extends React.Component{

 constructor(props) {
    super(props);
    console.log("Logged in user from savings component: ");
    console.log(this.props.loggedInUser);

    this.state = {
                  loggedInUser : this.props.loggedInUser,
                  savingsAccounts: [],
                  initialSavingsAccounts: [],
                  createSavings: false,
                  currentSavingsAccountName: '',
                  currentSavingsAccountStatus: 0,
                  currentSavingsCurrency: 'din'
                 };

    this.openCreateSavingsAccount = this.openCreateSavingsAccount.bind(this);
    this.createSaving = this.createSaving.bind(this);
    this.closeForm = this.closeForm.bind(this);

    this.handleSavingsNameChange= this.handleSavingsNameChange.bind(this);
    this.handleSavingsStatusChange = this.handleSavingsStatusChange.bind(this);
    this.handleSavingsCurrencyChange = this.handleSavingsCurrencyChange.bind(this);


    this.savingService = new SavingsService(DatabaseContext);

  }

  componentWillMount() {
    var that = this;
    this.savingService.getAllSavingsForUser(this.state.loggedInUser, function(list){
      that.setState({savingsAccounts : list, initialSavingsAccounts: list});
    })
  }

  handleSavingsNameChange(event)
  {
    this.setState({currentSavingsAccountName: event.target.value});
  }

  handleSavingsStatusChange(event)
  {
    this.setState({currentSavingsAccountStatus: Number(event.target.value)});
  }

  handleSavingsCurrencyChange(event)
  {
    this.setState({currentSavingsCurrency: event.target.value});
  }

  updateView(loggedUser){
    this.setState({loggedInUser: loggedUser});
  }

  openCreateSavingsAccount(){
    console.log("Opening the create account menu.");
    this.setState(
      {
        createSavings: true,
        currentSavingsAccountName: '',
        currentSavingsAccountStatus: 0,
        currentSavingsCurrency: 'din'
      });
  }

  closeForm()
  {
    this.setState({ createSavings: false });
  }

  createSaving() {
    let that = this;
    let saveObject = {
      accountEmail: this.state.loggedInUser,
      name: this.state.currentSavingsAccountName,
      currency: this.state.currentSavingsCurrency,
      amount: this.state.currentSavingsAccountStatus,
    };

    this.savingService.createSavingsAccount(saveObject, function (newObject) {

      let currentlyShown = that.state.savingsAccounts.filter(function (item) {
        return item.name === saveObject.name;
      });

      if (currentlyShown.length === 0) {
        let newArray = that.state.savingsAccounts.concat(newObject);
        that.setState({ savingsAccounts: newArray });
      }
      else {

        let index = that.state.savingsAccounts.findIndex(function (c) {
          return c._id == newObject._id;
        });

        var newArray = [].concat(that.state.savingsAccounts);
        var newArray2 = newArray.splice(index, 1, newObject);
        that.setState({ savingsAccounts: newArray });
      }
      that.setState({ createSavings: false });
    })


  }

  openSavingsAccount(id)
  {
    let newArray = this.state.savingsAccounts.filter(function(item){
      return item._id === id;
    });

    let selectedAccount = newArray[0];

    let stateObject = {
      createSavings: true,
      currentSavingsAccountName: selectedAccount.name,
      currentSavingsAccountStatus: selectedAccount.amount,
      currentSavingsCurrency: selectedAccount.currency
    };

    this.setState(stateObject);

  }

  deleteSavingsAccount(id) {
    let that = this;
    this.savingService.removeSavingsAccount(id,
      function () {
        let newArray = that.state.savingsAccounts.filter(function(item){
          return item._id !== id;
        })

        that.setState({ savingsAccounts: newArray});
      },
      function () {
        alert("Error happened while deleting savings account!");
      })
  }

  render() {
    let renderCreateSevings = this.state.createSavings;
    let componentStyle = { ...styles.textBox };

    const smallIconsStyle = {
      fontSize: '2vw',
      marginTop: '3px',
      marginRight: '5px'
    };

    const flexContainer = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap'
    };
    

    const savingsList = this.state.savingsAccounts.map((savingsAccount) =>
      <div key={savingsAccount._id} className="saving-item col-md-3">
          <div className="row">
            <div className="col-md-12">
              <i className="fa fa-briefcase" style={smallIconsStyle}></i>
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
              <i style={smallIconsStyle} className="fa fa-eye" onClick={() => this.openSavingsAccount(savingsAccount._id)}></i>
              <i style={smallIconsStyle} className="fa fa-times" onClick={() => this.deleteSavingsAccount(savingsAccount._id)}></i>
            </div>
          </div>

        </div>
    );

    return (
      <div className="row container">
        <div className="saving-holder col-md-12">
          <div className="row">
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
        </div>
        <div className="col-md-3 no-left-padding">
          {renderCreateSevings &&

            <div className="col-lg-12 no-left-padding">
              <label>
                Savings name:
                <input className=""
                  style={componentStyle} type="text"
                  value={this.state.currentSavingsAccountName}
                  onChange={this.handleSavingsNameChange}
                //  onBlur={this.handleBlur('email')} 
                />
              </label>

              <label>
                Current status:
                <input className=""
                   type="number"
                  style={componentStyle} type="number"
                  value={this.state.currentSavingsAccountStatus}
                  onChange={this.handleSavingsStatusChange}
                //  onBlur={this.handleBlur('password')} 
                />
              </label>

              <label>
                Currency:

                <div className='custom-select'>
                  <select value={this.state.currentSavingsCurrency} onChange={this.handleSavingsCurrencyChange}>
                    <option value="€">Euro</option>
                    <option value="din">Dinar</option>
                  </select>
                </div>
              </label>
            <div style={flexContainer}>
              <Button className="m-r-small" push color={this.props.color} onClick={this.createSaving}>Save</Button>
              <Button className="m-l-small" push color={this.props.color} onClick={this.closeForm}>Cancel</Button>
            </div>

            </div>


          }
        </div>
      </div>

      )
    }
  }
export default SavingsComponent
