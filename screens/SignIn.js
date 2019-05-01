import React, { Component } from 'react';
import PropTypes from 'prop-types';

import firebase from 'firebase';

import {
  AsyncStorage,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import {
  Button,
  Subheading,
  TextInput,
  Headline,
  Snackbar,
} from 'react-native-paper';

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

  handleSignUpEmail = () => {
    //this.signup_TEST();
    const { email, password, confirm_password } = this.state;

    if (confirm_password === password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async () => {
          await AsyncStorage.setItem('user', JSON.stringify({ email }));
          // await AsyncStorage.setItem('password', password);
          this.props.navigation.navigate('App');
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;

          if (errorCode === 'auth/email-already-in-use') {
            this.setState({
              email_error: true,
              snackbarMessage: 'Cet utilisateur existe déjà. Connectez-vous !',
              snackbarVisible: true,
              signup: false,
            });
          } else if (errorCode === 'auth/invalid-email') {
            this.setState({
              email_error: true,
              snackbarMessage: "L'email est incorrect",
              snackbarVisible: true,
            });
          } else if (errorCode === 'auth/operation-not-allowed') {
            console.log(errorCode + ' : ' + errorMessage);
          } else if (errorCode === 'auth/weak-password') {
            this.setState({
              snackbarMessage:
                'Votre mot de passe doit contenir au moins 6 charactères',
              snackbarVisible: true,
              password_error: true,
              confirm_password_error: true,
            });
          } else {
            console.log(errorCode + ' : ' + errorMessage);
          }
        });
    } else {
      this.setState({
        password_error: true,
        confirm_password_error: true,
        snackbarMessage: 'Le mot de passe et la confirmation son différents',
        snackbarVisible: true,
      });
    }
  };
  handleSignInEmail = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        await AsyncStorage.setItem('user', JSON.stringify({ email }));
        // await AsyncStorage.setItem('password', password);
        this.props.navigation.navigate('App');
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
          this.setState({ password_error: true });
        } else if (errorCode === 'auth/invalid-email') {
          this.setState({
            email_error: true,
            snackbarMessage: "L'email est incorrect",
            snackbarVisible: true,
          });
        } else if (errorCode === 'auth/user-disabled') {
          this.setState({
            snackbarMessage: 'Cet utilisateur a été désactivé',
            snackbarVisible: true,
          });
        } else if (errorCode === 'auth/user-not-found') {
          this.setState({
            snackbarMessage:
              'Utilisateur inconnu. Inscrivez-vous pour commencer !',
            snackbarVisible: true,
            signup: true,
          });
        } else {
          console.log(errorCode + ' : ' + errorMessage);
        }
      });
  };

  handleSignInGoogle = () => {};

  handleSignInFacebook = () => {};

  handleSignInLinkedIn = () => {};

  render() {
    return (
      <ImageBackground
        source={imageBackground}
        style={{ width: '100%', height: '100%' }}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <ScrollView style={styles.container}>
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
              error={this.state.email_error}
              onChangeText={value => this.setState({ email: value })}
            />
            <TextInput
              mode="flat"
              label="Mot de passe"
              placeholder="Mot de passe"
              secureTextEntry
              value={this.state.password}
              style={styles.input}
              error={this.state.password_error}
              onChangeText={value => this.setState({ password: value })}
            />
            {this.state.signup && (
              <TextInput
                mode="flat"
                label="Confirmation"
                placeholder="Confirmez votre mot de passe"
                secureTextEntry
                value={this.state.confirm_password}
                style={styles.input}
                error={this.state.confirm_password_error}
                onChangeText={value =>
                  this.setState({ confirm_password: value })
                }
              />
            )}

            <Button
              mode="contained"
              style={{ marginTop: 24 }}
              onPress={
                this.state.signup
                  ? this.handleSignUpEmail
                  : this.handleSignInEmail
              }
            >
              {this.state.signup ? 'Commencer' : 'Connexion'}
            </Button>
            <Button
              mode="text"
              style={{ marginTop: 12, marginBottom: 24 }}
              onPress={() => {
                this.setState(prev => ({ signup: !prev.signup }));
              }}
            >
              {this.state.signup ? 'Connexion' : 'Inscription'}
            </Button>

            <SocialIcon title="Sign In With Facebook" button type="facebook" />
          </View>
          <Snackbar
            visible={this.state.snackbarVisible}
            duration={Snackbar.DURATION_SHORT}
            onDismiss={() => this.setState({ snackbarVisible: false })}
          >
            {this.state.snackbarMessage}
          </Snackbar>
        </ScrollView>
      </ImageBackground>
    );
  }
}
