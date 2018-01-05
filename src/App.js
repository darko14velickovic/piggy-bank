import React, { Component } from 'react';
import { Window, NavPaneItem, NavPane, TitleBar, View, Dialog, Pin, Button, Text, ProgressCircle } from 'react-desktop/windows';
import logo from './logo.svg';
import './App.css';

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
  }

  close = () => remote.BrowserWindow.getFocusedWindow().close();
  minimize = () => remote.BrowserWindow.getFocusedWindow().minimize();

  toggleMaximize = () => this.setState({ isMaximized: !this.state.isMaximized });

  testDb(){
    var doc = { hello: 'world'
               , n: 5
               , today: new Date()
               , nedbIsAwesome: true
               , notthere: null
               , notToBeSaved: undefined  // Will not be saved
               , fruits: [ 'apple', 'orange', 'pear' ]
               , infos: { name: 'nedb' }
               };

    db.insert(doc, function (err, newDoc) {   // Callback is optional
      // newDoc is the newly inserted document, including its _id
      // newDoc has no key called notToBeSaved since its value was undefined
      console.log(err);
      console.log(newDoc);
    });
  }

  renderIcon(title){
    const fill = this.props.theme === 'dark' ? '#ffffff' : '#000000';

    return (
        <svg x="0px" y="0px" width="16px" height="14.9px" viewBox="0 0 16 14.9">
          <polygon fill={fill} points="16,5.6 10.6,4.7 8,0 5.4,4.7 0,5.7 3.8,9.6 3.1,14.9 8,12.6 13,14.8 12.3,9.5 "/>
        </svg>
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
        onSelect={this.testDb}
        padding="10px 20px"
        push
      >
        <Text>{content}</Text>
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
        {this.renderItem('Item 1', 'Content 1')}
        {this.renderItem('Item 2', 'Content 2')}
        {this.renderItem('Item 3', 'Content 3')}
      </NavPane>
      </Window>
    );
  }
}

export default App;
