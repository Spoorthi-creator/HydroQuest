import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from './screens/DashboardScreen';
import FormScreen from './screens/FormScreen';
import SettingScreen from './screens/SettingScreen';
import Loading from './screens/LoadingScreen';

export default class App extends React.Component {
  render() {
    return <AppContainer  />;
  }
}

var switchNav = createSwitchNavigator({
  Loading: { screen: Loading },
  LoginScreen: { screen: LoginScreen },
  SignUpScreen: { screen: SignUpScreen },
  DashboardScreen: { screen: DashboardScreen },
  FormScreen: { screen: FormScreen },
  SettingScreen: { screen: SettingScreen },
});

const AppContainer  = createAppContainer(switchNav);
