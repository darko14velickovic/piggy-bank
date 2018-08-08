import React, { Component } from 'react';
import { Window, NavPaneItem, NavPane, TitleBar, View, Dialog, Pin, Button, Text, ProgressCircle } from 'react-desktop/windows';
import logo from './logo.svg';
import AccountIcon from './icons/AccountIcon'
import HomeIcon from './icons/HomeIcon'
import DollarIcon from './icons/DollarIcon'
import SavingsIcon from './icons/SavingsIcon'

import './App.css';


import DebtComponent from './components/DebtComponent'
import HomeComponent from './components/HomeComponent'
import AccountComponent from './components/AccountComponent'
import SavingsComponent from './components/SavingsComponent'

const remote = window.require('electron').remote;
const path = window.require('path');
const app = remote.app;

class App extends Component {

  static defaultProps = {
    theme: 'light',
    background: '#bec7d1',
    color: '#bec8d3'
  };

  constructor(props) {
    super(props);
    this.state = { isMaximized: true, loggedInUser:"" };

    this.iconDict = {};
    this.iconDict["Home"] = <HomeIcon />;
    this.iconDict["Account"] = <AccountIcon />;
    this.iconDict["Debt"] = <DollarIcon />;
    this.iconDict["Savings"] = <SavingsIcon />;

    this.state.selected = "Account";


  }

  componentWillMount()
  {
    if(window.localStorage != undefined)
    {
      let cachedUser = window.localStorage.getItem('loggedInUser');
      let lastState = window.localStorage.getItem('lastState');
      if(cachedUser != undefined)
      {
        this.setState({loggedInUser: cachedUser});

        if(lastState != undefined)
        {
          this.setState({selected: lastState});
        }

      }
    }
  }

  close = () => remote.BrowserWindow.getFocusedWindow().close();
  minimize = () => remote.BrowserWindow.getFocusedWindow().minimize();

  toggleMaximize = () => this.setState({ isMaximized: !this.state.isMaximized });


  logout()
  {

    this.setState({loggedInUser : ""});

    if(window.localStorage != undefined)
    {
      window.localStorage.removeItem('loggedInUser');
      window.localStorage.removeItem('lastState');
    }
  }

  changeLoggedInUser(user){
    this.setState({loggedInUser : user.email});
    // this.savingsComponent.updateView(user.email);

  }


  renderIcon(title){
    const fill = this.props.theme === 'dark' ? '#ffffff' : '#000000';

    return (
        this.iconDict[title]
      );
  }

  renderItem(title) {

    let titleComposite = '';
    if(this.state.loggedInUser != '')
    {
      titleComposite = title + ' - ' + this.state.loggedInUser;
    }
    else
    {
      titleComposite = title;
    }


    return (
      <NavPaneItem
        title={titleComposite}
        icon={this.renderIcon(title)}
        theme="dark"
        background="#fff"
        selected={this.state.selected === title}
        onSelect={() => {this.setState({ selected: title }); console.log("Selected: " + title)}}
        padding="10px 20px"
        push
      >
        {this.views[title]}
      </NavPaneItem>
    );
  }

  render() {

    let titleAddin = '';
    if(this.state.loggedInUser != '')
    {
      titleAddin = ' - ' + this.state.loggedInUser;
    }

    return (
      <Window
        chrome
        padding="10px"
      >
        <TitleBar
        title={"Piggy bank" + titleAddin}
        controls
        isMaximized={this.state.isMaximized}
        theme={this.props.theme}
        background={this.props.color}
        onCloseClick={this.close}
        onMinimizeClick={this.minimize}
        onMaximizeClick={this.toggleMaximize}
        onRestoreDownClick={this.toggleMaximize}
        />

        <NavPane openLength={200} push background={this.props.background} color={this.props.color} theme={this.props.theme}>

        <NavPaneItem
        title={"Account"}
        icon={this.renderIcon("Account")}
        theme="dark"
        background="#fff"
        selected={this.state.selected === "Account"}
        onSelect={() => {this.setState({ selected: "Account" }); window.localStorage.setItem("lastState", "Account")}}
        padding="10px 20px"
        push
        >
          <AccountComponent   ref={foo => {this.accountComponent = foo;}}
                              OnSubmitEvent={this.changeLoggedInUser.bind(this)}
                              loggedInUser={this.state.loggedInUser}
                              OnLogoutEvent={this.logout.bind(this)} />
        </NavPaneItem>

        <NavPaneItem
        title={"Home"}
        icon={this.renderIcon("Home")}
        theme="dark"
        background="#fff"
        selected={this.state.selected === "Home"}
        onSelect={() => {this.setState({ selected: "Home" }); window.localStorage.setItem("lastState", "Home")}}
        padding="10px 20px"
        push
        >
          <HomeComponent ref={foo => {this.homeComponent = foo;}}
                                        loggedInUser={this.state.loggedInUser} />
        </NavPaneItem>

        <NavPaneItem
        title={"Debt"}
        icon={this.renderIcon("Debt")}
        theme="dark"
        background="#fff"
        selected={this.state.selected === "Debt"}
        onSelect={() => {this.setState({ selected: "Debt" }); window.localStorage.setItem("lastState", "Debt")}}
        padding="10px 20px"
        push
        >
          <DebtComponent ref={foo => {this.debtComponent = foo;}}
                                        loggedInUser={this.state.loggedInUser}
                                         />
        </NavPaneItem>

        <NavPaneItem
        title={"Savings"}
        icon={this.renderIcon("Savings")}
        theme="dark"
        background="#fff"
        selected={this.state.selected === "Savings"}
        onSelect={() => {this.setState({ selected: "Savings" }); window.localStorage.setItem("lastState", "Savings")}}
        padding="10px 20px"
        push
        >
          <SavingsComponent ref={foo => {this.savingsComponent = foo;}}
                                        loggedInUser={this.state.loggedInUser} />
        </NavPaneItem>


      </NavPane>
      </Window>
    );
  }
}

export default App;
