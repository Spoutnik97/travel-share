import React, { Component } from 'react';

import firebase from 'firebase';
import '@firebase/firestore';

import { AsyncStorage, Text, View } from 'react-native';
import { Asset, AppLoading } from 'expo';

import firebaseConfig from '../keys/firebase';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class AuthLoading extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    // this.initFirebase();
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
<<<<<<< HEAD
    const user = await AsyncStorage.getItem('user');
    this.props.navigation.navigate(user ? 'App' : 'Auth');
=======
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('user').then(user => {
        this.setState({ user: JSON.parse(user) });
        resolve(JSON.parse(user));
      });
    });
  };

  onLoad = () => {
    this.props.navigation.navigate(this.state.user ? 'App' : 'Auth');
>>>>>>> 76fd75b2ffb30a5e1623de21f97fdd38060a68bd
  };

  componentDidMount() {}

  // Render any loading content that you like here
  render() {
    return (
      <AppLoading
        startAsync={this.bootstrapAsync}
        onFinish={this.onLoad}
        onError={console.warn}
        autoHideSplash={false}
      />
    );
  }
}
