import React, {Component} from 'react';
import {StyleSheet, View, Switch, Text, I18nManager, Alert} from 'react-native';
import Home from './src/components/Home';

export default class App extends Component {
  constructor() {
    super();
    this.state={
      isRTL: false
    }
  }
  _onDirectionChange = () => {
    I18nManager.forceRTL(!this.state.isRTL);
    this.setState({isRTL: !this.state.isRTL});
    Alert.alert(
      'Reload this page',
      'Please reload this page to change the UI direction! '
    );
  };
  render() {
    return (
      <View style={styles.container}>
      <Text >forceRTL</Text>
      <View >
        <Switch
          onValueChange={this._onDirectionChange}
          style={styles.rightAlignStyle}
          value={this.state.isRTL}
        />
      </View>
            <Home />
    </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
