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

var Datastore = remote.require('nedb')
    , db = new Datastore({ filename: path.join(app.getAppPath(), "/db/test.db"), autoload: true });

class App extends Component {

  static defaultProps = {
    theme: 'light',
    background: '#eff3f7'
  };

  constructor(props) {
    super(props);
    this.state = { isMaximized: true };

    this.iconDict = {};
    this.iconDict["Home"] = <HomeIcon />;
    this.iconDict["Account"] = <AccountIcon />;
    this.iconDict["Debt"] = <DollarIcon />;

    this.views = {};
    this.views["Home"] = <HomeComponent />;
    this.views["Account"] = <AccountComponent />;
    this.views["Debt"] = <DebtComponent />;

    this.state.selected = "Home";
  }

  close = () => remote.BrowserWindow.getFocusedWindow().close();
  minimize = () => remote.BrowserWindow.getFocusedWindow().minimize();

  toggleMaximize = () => this.setState({ isMaximized: !this.state.isMaximized });

  renderIcon(title){
    const fill = this.props.theme === 'dark' ? '#ffffff' : '#000000';

    return (
        this.iconDict[title]
      );
  }

  renderItem(title, content) {

    return (
      <NavPaneItem
        title={title}
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
        title="My Windows Application"
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
