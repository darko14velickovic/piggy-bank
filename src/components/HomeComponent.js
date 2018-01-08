import React, { Component } from 'react';
import { Text, View } from 'react-desktop/windows';


class HomeComponent extends React.Component{

 constructor(props) {
    super(props);
  }


  render() {
    return (
      <View
        color={this.props.color}
        padding="20px"
        horizontalAlignment="left"
        verticalAlignment="left"

      >
      <Text
        background={this.props.color}
        theme={this.props.theme}
        width="100%"
        horizontalAlignment="left"
        verticalAlignment="left"
        padding="0px"
      >
        Home screen text.
      </Text>

      </View>

    );
  }
}

export default HomeComponent
