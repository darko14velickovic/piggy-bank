import { View } from 'react-desktop/windows';
import DebtService from '../services/DebtService'
import DebtAddForm from './debtForms/DebtAddForm'
import DatabaseContext from '../dal/database'
import styles from './DebtComponentStyle';
import OfflineStorage from '../dal/browser-storage'
import React from 'react';


class DebtComponent extends React.Component{

 constructor(props) {
    super(props);

    this.state = {
                  name: props.name,
                  money: props.money,
                  loggedInUser: props.loggedInUser,
                  debts: [],
                  initialDebts: [],
                };

    this.debtService = new DebtService(DatabaseContext);
    this.storage = new OfflineStorage();
  }

  componentWillMount() {
    var that = this;
    this.debtService.getAllDebts(this.state.loggedInUser, function(list){
      that.setState({debts : list, initialDebts: list});
    })
  }

  handleAddFormSubmit(obj) {
    var that = this;

    obj.accountEmail = this.state.loggedInUser;
    this.debtService.insertDebt(obj, function(){
        that.debtService.getAllDebts(that.state.loggedInUser, function(list){
          that.setState({debts : list, initialDebts: list});
    })
    });

  }

  handleSearchParam(event)
  {
     var updatedList = this.state.initialDebts;
      updatedList = updatedList.filter(function(item){
      return item.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({debts: updatedList});
  }

  removeDebt(id)
  {
    console.log("Should remove debt with id: ");
    console.log(id);

    let thisProxy = this;

    let result = window.confirm("Are you sure you want to remove this item?");

    if(result)
    {
      this.debtService.removeDebt(id,
      function(numRemoved){

        let newArray = thisProxy.state.debts.filter(function( obj ) {
          return obj._id !== id;
        });

        thisProxy.setState({debts: newArray});
        //alert("Success!");

      },
      function(err){
        alert("Failed to remove the item!");
      })
    }

  }

  render() {

    const loggedIn = this.state.loggedInUser != '';
    let listStyle = { ...styles.listHolder };
    let listItemStyle = { ...styles.listItemStyle };
    let removeIconStyle = { ...styles.removeIconStyle };
    let textBoxStyle = { ...styles.textBox };


    let listItems = this.state.debts.map((debt) =>
        <li key={debt._id}>
          <div style={listItemStyle}> {debt.name} - {debt.money} {debt.currency}
            <i onClick={() => this.removeDebt(debt._id)} style={removeIconStyle} className="fa fa-times"></i>
          </div>
        </li>
    );

    if(listItems.length == 0)
    {
      listItems = "No debts";
    }

    if(loggedIn)
    {
      return (
      <View
        color={this.props.color}
        padding="20px"
        horizontalAlignment="left"
        verticalAlignment="left"
        layout="vertical">

          <label>
            Search:
            <input style={textBoxStyle} type="text"
                   value={this.state.name}
                   onChange={this.handleSearchParam.bind(this)}/>
          </label>


          <ul className="ul-holder" style={listStyle}>{listItems}</ul>

          <div className="inline-content">
            <DebtAddForm loggedInUser={this.state.loggedInUser} name={this.state.name} money={this.state.money} OnSubmitEvent={this.handleAddFormSubmit.bind(this)} />
          </div>
      </View>

      );
    }
    else{
      return (
      <View
        color={this.props.color}
        padding="20px"
        horizontalAlignment="left"
        verticalAlignment="left">
          <h1>Not logged in. </h1>

      </View>

      );
    }

  }
}

export default DebtComponent
