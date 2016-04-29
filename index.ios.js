/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import Main from './main';

class Concrn3 extends Component {
  render() {
    return <Main></Main>;
  }
}

AppRegistry.registerComponent('Concrn3', () => Concrn3);
