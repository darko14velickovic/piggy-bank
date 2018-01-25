import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SwitchComponent extends React.Component{

 constructor(props) {
    super(props);
    this.state = { on : true };
  }


  handleChange(event)
  {
    console.log("value is :");
    console.log(event.target.checked);

    this.setState({ on: event.target.checked });
    this.props.OnChangeEvent(event.target.checked);
  }

  render() {
    return (

      <label className="switch">
        <input checked={this.state.on} type="checkbox" onChange={this.handleChange.bind(this)} />
        <span className="slider round"></span>
      </label>
      );

  }
}
SwitchComponent.propTypes = {
  OnChangeEvent: PropTypes.func
};

export default SwitchComponent
