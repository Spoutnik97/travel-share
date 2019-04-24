import React, { Component } from 'react';
import PropTypes from 'prop-types';

import firebase from 'firebase';

import { AsyncStorage, Text, View } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { Button, Subheading, TextInput, Title } from 'react-native-paper';

import colors from '../styles/colors';
import styles from '../styles/styles';

import firebaseConfig from '../keys/firebase';

export default class SignIn extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.initFirebase();
    // this.observeAuth();
    this.state = {
      signup: true,
    };
  }

  initFirebase = () => {
    try {
      firebase.initializeApp(firebaseConfig);
    } catch (err) {
      console.log(err.message);
    }
  };

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = async user => {
    if (!user) {
      this.setState({ signup: true });
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    } else {
      this.props.navigation.navigate('App');
    }
  };

  componentDidMount() {}

  handleSignInEmail = () => {
    this.signup_TEST();
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        await AsyncStorage.setItem('user', JSON.stringify({ email }));
        await AsyncStorage.setItem('password', password);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ' : ' + errorMessage);
        // ...
      });
  };
  handleSignUpEmail = () => {
    this.signup_TEST();
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          this.setState({ password_error: true });
        } else {
          console.log(errorMessage);
        }
        console.log(error);
      });
  };

  handleSignInGoogle = () => {
    this.signup_TEST();
  };

  handleSignInFacebook = () => {
    this.signup_TEST();
  };

  handleSignInLinkedIn = () => {
    this.signup_TEST();
  };

  signup_TEST = async () => {
    const user = {
      id: 'TESTIDUSER_' + Date.now(),
      given_name: 'Guillaume',
      email: 'guillaume.piedigrossi@gadz.org',
    };

    await AsyncStorage.setItem('user', JSON.stringify(user));
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <View style={styles.container}>
        <Title>
          {
            "Connectez-vous à la plus grande plateforme d'échange entre voyageur au monde"
          }
        </Title>
        {this.state.signup && (
          <View style={[styles.column, styles.center]}>
            <SocialIcon
              title={"S'identifier avec Facebook"}
              button
              onPress={this.handleSignInFacebook}
              type="facebook"
            />
            <SocialIcon
              title={"S'identifier avec Google"}
              button
              onPress={this.handleSignInGoogle}
              type="google-plus-official"
            />
            <SocialIcon
              title={"S'identifier avec LinkedIn"}
              button
              onPress={this.handleSignInLinkedIn}
              type="linkedin"
            />
            <TextInput
              mode="outlined"
              label="Votre email"
              placeholder=""
              value={this.state.email}
              onChangeText={value => this.setState({ email: value })}
            />
            <TextInput
              mode="outlined"
              label="Mot de passe"
              placeholder="********"
              value={this.state.password}
              onChangeText={value => this.setState({ password: value })}
            />

            <Button mode="contained" onPress={this.handleSignInEmail}>
              {'Suivant'}
            </Button>
          </View>
        )}
      </View>
    );
  }
}
