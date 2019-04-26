import React, { Component } from 'react';
import PropTypes from 'prop-types';

import firebase from 'firebase';

import { AsyncStorage, Image, ImageBackground, Text, View } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { Button, Subheading, TextInput, Headline } from 'react-native-paper';

import colors from '../styles/colors';
import styles from '../styles/styles';

import firebaseConfig from '../keys/firebase';

const imageBackground = require('../assets/background.jpg');
const imageLogo = require('../assets/logo.png');

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
    //this.signup_TEST();
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        await AsyncStorage.setItem('user', JSON.stringify({ email }));
        await AsyncStorage.setItem('password', password);
        this.props.navigation.navigate('App');
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
    // this.signup_TEST();
    // const { email, password } = this.state;
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // [START_EXCLUDE]
    //     if (errorCode === 'auth/wrong-password') {
    //       this.setState({ password_error: true });
    //     } else {
    //       console.log(errorMessage);
    //     }
    //     console.log(error);
    //   });
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
    // <FAB onPress={this.handleSignInFacebook} icon='check' label={"S'identifier avec Facebook"} />
    // <FAB
    //   title={"S'identifier avec Google"}
    //   button
    //   onPress={this.handleSignInGoogle}
    //   type="google-plus-official"
    // />
    // <FAB
    //   title={"S'identifier avec LinkedIn"}
    //   button
    //   onPress={this.handleSignInLinkedIn}
    //   type="linkedin"
    // />

    return (
      <ImageBackground
        source={imageBackground}
        style={{ width: '100%', height: '100%' }}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <View style={styles.container}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Headline>{'Travel&Share'}</Headline>
            <Image source={imageLogo} style={{ width: 100, height: 100 }} />
          </View>

          <View>
            <TextInput
              mode="flat"
              label="Votre email"
              placeholder="Email"
              value={this.state.email}
              style={styles.input}
              onChangeText={value => this.setState({ email: value })}
            />
            <TextInput
              mode="flat"
              label="Mot de passe"
              placeholder="Mot de passe"
              secureTextEntry
              value={this.state.password}
              style={styles.input}
              onChangeText={value => this.setState({ password: value })}
            />

            <Button
              mode="contained"
              style={{ marginTop: 24 }}
              onPress={this.handleSignInEmail}
            >
              {'Connexion'}
            </Button>
            <Button
              mode="text"
              style={{ marginTop: 12, marginBottom: 24 }}
              onPress={this.handleSignUp}
            >
              {'Inscription'}
            </Button>

            <SocialIcon title="Sign In With Facebook" button type="facebook" />
          </View>
        </View>
      </ImageBackground>
    );
  }
}
