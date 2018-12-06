import React from 'react';
import CurrencyHelper from '../services/CurrencyHelper'
import { Text, View, Button} from 'react-desktop/windows';

class HomeComponent extends React.Component{

 constructor(props) {
    super(props);

    this.handleSyncCurrencies = this.handleSyncCurrencies.bind(this);

    this.handleConversionSync = this.handleConversionSync.bind(this);

    this.currencyHelper = new CurrencyHelper();
  }

  handleSyncCurrencies()
  {
    this.currencyHelper.getAllCurrencies();
  }

  handleConversionSync()
  {
    this.currencyHelper.getExchange('EUR', 'RSD');
    this.currencyHelper.getExchange('RSD', 'EUR');
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
        Home screen text for user {this.props.loggedInUser}
        <br/>
        <div>
          <Button onClick = {this.handleSyncCurrencies}>Sync currencies</Button>
          <Button onClick = {this.handleConversionSync}>Sync conversions</Button>         
        </div>

      </Text>

      </View>

    );
  }
}

export default HomeComponent
