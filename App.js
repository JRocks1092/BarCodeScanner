import React, { Component } from 'react';
import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import ScanScreen from "./Screens/ScanScreens.js";

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Appcontainer />
      </View>
    )
  }
}

var switchContainer = createSwitchNavigator({
  class1: ScanScreen,  
})
const Appcontainer = createAppContainer(switchContainer)