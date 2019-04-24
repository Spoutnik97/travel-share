import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AsyncStorage, Text, View } from 'react-native';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class AuthLoading extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const user = await AsyncStorage.getItem('user');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(user ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <Text>Waiting for connexion...</Text>
      </View>
    );
  }
}
