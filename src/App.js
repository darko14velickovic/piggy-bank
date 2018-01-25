import React, { Component } from 'react';
import { Window, NavPaneItem, NavPane, TitleBar, View, Dialog, Pin, Button, Text, ProgressCircle } from 'react-desktop/windows';
import logo from './logo.svg';
import AccountIcon from './icons/AccountIcon'
import HomeIcon from './icons/HomeIcon'
import DollarIcon from './icons/DollarIcon'
import './App.css';


import DebtComponent from './components/DebtComponent'
import HomeComponent from './components/HomeComponent'
import AccountComponent from './components/AccountComponent'


const remote = window.require('electron').remote;
const path = window.require('path');
const app = remote.app;

class App extends Component {

  static defaultProps = {
    theme: 'light',
    background: '#eff3f7'
  };

  constructor(props) {
    super(props);
    this.state = { isMaximized: true, loggedInUser:"" };

    this.iconDict = {};
    this.iconDict["Home"] = <HomeIcon />;
    this.iconDict["Account"] = <AccountIcon />;
    this.iconDict["Debt"] = <DollarIcon />;

    this.views = {};
    this.views["Home"] = <HomeComponent loggedInUser={this.state.loggedInUser} />;
    this.views["Account"] = <AccountComponent
                              OnSubmitEvent={this.changeLoggedInUser.bind(this)}
                              loggedInUser={this.state.loggedInUser}
                              OnLogoutEvent={this.logout.bind(this)} />;

    this.views["Debt"] = <DebtComponent loggedInUser={this.state.loggedInUser} />;

    this.state.selected = "Home";
  }

  close = () => remote.BrowserWindow.getFocusedWindow().close();
  minimize = () => remote.BrowserWindow.getFocusedWindow().minimize();

  toggleMaximize = () => this.setState({ isMaximized: !this.state.isMaximized });


  logout()
  {
    this.setState({loggedInUser : ""});
  }

  changeLoggedInUser(user){
    this.setState({loggedInUser : user.email});
  }


  renderIcon(title){
    const fill = this.props.theme === 'dark' ? '#ffffff' : '#000000';

    return (
        this.iconDict[title]
      );
  }

  renderItem(title, content) {

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
    return (
      <Window
        chrome
        padding="10px"
      >
        <TitleBar
        title="Piggy bank"
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
        {this.renderItem('Home', 'Content 1')}
        {this.renderItem('Account', 'Content 2')}
        {this.renderItem('Debt', 'Content 3')}
      </NavPane>
      </Window>
    );
  }
}

export default App;
