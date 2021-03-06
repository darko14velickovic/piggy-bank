import styles from './styles/windows10';
import React from 'react';
import { Button } from 'react-desktop/windows';
import PropTypes from 'prop-types';
import SavingsService from '../../services/SavingsService'
import DatabaseContext from '../../dal/database'


class DebtAddForm extends React.Component{

 constructor(props) {
    super(props);

    this.state = {
                  loggedInUser: this.props.loggedInUser,
                  name: '',
                  money: 0,
                  currency: '€',
                  savingsAccount: '',
                  savingsAccounts: [],
                  touched:{
                    name: false,
                    money: false,
                    currency: false,
                    savingsAccount: false
                  }
                 };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeMoney = this.handleChangeMoney.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSavingsAccountChange = this.handleSavingsAccountChange.bind(this);

    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);

    this.savingService = new SavingsService(DatabaseContext);

  }

  componentWillMount() {
    var that = this;
    this.savingService.getAllSavingsForUser(this.state.loggedInUser, function(list){
      that.setState({savingsAccounts : list, savingsAccount: list[0]});
      that.props.OnAccountChange(list[0]);
    })
  }


  validate(name, money) {
    // true means invalid, so our conditions got reversed

    return {
      name: name.length === 0,
      money: money === 0,
    };
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeMoney(event){
    this.setState({money: parseInt(event.target.value)});
  }

  handleCurrencyChange(event)
  {
    this.setState({currency: event.target.value});

  }

  handleSavingsAccountChange(event)
  {
    console.log(event.target.value);
    this.setState({savingsAccount: event.target.value});
    this.props.OnAccountChange(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.savingsAccount === undefined || this.state.savingsAccount === '')
    {
      alert('Please create savings account first!');
      return;
    }

    alert('A name was submitted: ' + this.state.name + " with debt: " + this.state.money.toString() + this.state.currency);

    console.log("Notify the parent!");
    this.props.OnSubmitEvent({  savingsAccountId: this.state.savingsAccount._id, 
                                name: this.state.name, 
                                money: this.state.money, 
                                currency: this.state.currency 
                              });

  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  render() {

    let componentStyle = { ...styles.textBox };


    const errors = this.validate(this.state.name, this.state.money);

    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    const isDisabled = Object.keys(errors).some(x => errors[x]);


    let savingsAccountOptions = this.state.savingsAccounts.map((acc) =>
      <option key={acc._id} value={acc._id}>{acc.name}</option>
    );

    return (

        <form className="inline-content" onSubmit={this.handleSubmit}>
          <div className="inline-content p-r-small">
            <label>
            Name:

            <input style={componentStyle} type="text"
                   className={shouldMarkError("name") ? "error" : ""}
                   value={this.state.name}
                   onChange={this.handleChangeName}
                   onBlur={this.handleBlur}  />
          </label>

          <label>
            Savings account:

            <div className='custom-select'>
              <select value={this.state.savingsAccount} onChange={this.handleSavingsAccountChange}>
                {savingsAccountOptions}
              </select>
            </div>
          </label>
          </div>

          <div className="inline-content p-r-small">
            <label>
            Value:

            <input style={componentStyle} type="number"
                   className={shouldMarkError("money") ? "error" : ""}
                   value={this.state.money}
                   onChange={this.handleChangeMoney}
                   onBlur={this.handleBlur} />
          </label>

          <label>
            Currency:

            <div className='custom-select'>
              <select value={this.state.currency} onChange={this.handleCurrencyChange}>
                <option value="€">Euro</option>
                <option value="din">Dinar</option>
              </select>
            </div>


          </label>
          </div>

          <Button className="block-content" disabled={isDisabled} push color={this.props.color} onClick={this.handleSubmit}>
            Add debt
          </Button>
        </form>

    );
  }
}

DebtAddForm.propTypes = {
  OnSubmitEvent: PropTypes.func,
  OnAccountChange: PropTypes.func
};

export default DebtAddForm
