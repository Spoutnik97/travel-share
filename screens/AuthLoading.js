import React, { Component } from 'react';

import firebase from 'firebase';
import '@firebase/firestore';

import { AsyncStorage, Text, View } from 'react-native';

import firebaseConfig from '../keys/firebase';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class AuthLoading extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.initFirebase();
    this.bootstrapAsync();
  }

  initFirebase = () => {
    try {
      firebase.initializeApp(firebaseConfig);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const user = await AsyncStorage.getItem('user');
    this.props.navigation.navigate(user ? 'App' : 'Auth');
  };

  componentDidMount() {}

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <Text>Waiting for connexion...</Text>
      </View>
    );
  }
}
