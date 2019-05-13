import React, { Component } from 'react';
import PropTypes from 'prop-types';

import firebase from 'firebase';
import '@firebase/firestore';

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

const imageBackground = require('../assets/background.jpg');
const imageLogo = require('../assets/logo.png');

export default class SignIn extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      signup: false,
    };
  }

  getUser = (id, email) => {
    const db = firebase.firestore();

    return new Promise((resolve, reject) => {
      db.collection('users')
        .doc(id)
        .get()
        .then(doc => {
          if (doc.exists) {
            const user = doc.data();
            resolve(user);
          } else {
            db.collection('users')
              .doc(id)
              .set({
                email,
                id,
              })
              .then(() => {
                const user = { email, id };
                resolve(user);
              })
              .catch(err => console.log(err));
          }
        })
        .catch(error => {
          console.error('Error getting document: ', error);
          reject(error);
        });
    });
  };

  newUser = (user, callback) => {
    const db = firebase.firestore();

    db.collection('users')
      .add(user)
      .then(docRef => {
        db.collection('users')
          .doc(docRef.id)
          .update({ ...user, id: docRef.id })
          .then(() => {
            console.log(`docRef.id : ${docRef.id}`);

            AsyncStorage.setItem(
              'user',
              JSON.stringify({ ...user, id: docRef.id })
            ).then(() => callback(docRef.id));
          });
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };

  handleSignUpEmail = () => {
    //this.signup_TEST();
    const { email, password, confirm_password } = this.state;
    this.setState({ isConnecting: true });
    if (confirm_password === password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async () => {
          // await AsyncStorage.setItem('user', JSON.stringify({ email }));
          this.newUser({ email }, () => {
            this.props.navigation.navigate('App');
          });
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;

          if (errorCode === 'auth/email-already-in-use') {
            this.setState({
              email_error: true,
              snackbarMessage: 'Cet utilisateur existe déjà. Connectez-vous !',
              snackbarVisible: true,
              signup: false,
              isConnecting: false,
            });
          } else if (errorCode === 'auth/invalid-email') {
            this.setState({
              email_error: true,
              snackbarMessage: "L'email est incorrect",
              snackbarVisible: true,
              isConnecting: false,
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
              isConnecting: false,
            });
          } else {
            console.log(errorCode + ' : ' + errorMessage);
          }
        });
    } else {
      this.setState({
        password_error: true,
        confirm_password_error: true,
        snackbarMessage: 'Le mot de passe et la confirmation sont différents',
        snackbarVisible: true,
        isConnecting: false,
      });
    }
  };

  handleSignInEmail = () => {
    const { email, password } = this.state;
    this.setState({ isConnecting: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const id = userCredentials.user.uid;
        console.log(`id : ${id}`);

        this.getUser(id, email)
          .then(user => {
            AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
              this.props.navigation.navigate('App');
            });
          })
          .catch(err => console.log(err));
        // await AsyncStorage.setItem('user', JSON.stringify({ email }));
        // await AsyncStorage.setItem('password', password);
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ' : ' + errorMessage);
        if (errorCode === 'auth/wrong-password') {
          this.setState({ password_error: true, isConnecting: false });
        } else if (errorCode === 'auth/invalid-email') {
          this.setState({
            email_error: true,
            snackbarMessage: "L'email est incorrect",
            snackbarVisible: true,
            isConnecting: false,
          });
        } else if (errorCode === 'auth/user-disabled') {
          this.setState({
            snackbarMessage: 'Cet utilisateur a été désactivé',
            snackbarVisible: true,
            isConnecting: false,
          });
        } else if (errorCode === 'auth/user-not-found') {
          this.setState({
            snackbarMessage:
              'Utilisateur inconnu. Inscrivez-vous pour commencer !',
            snackbarVisible: true,
            signup: true,
            isConnecting: false,
          });
        } else {
          console.log(errorCode + ' : ' + errorMessage);
        }
      });
  };

  handleSignInGoogle = () => {};

  handleSignInFacebook = () => {};

  handleSignInLinkedIn = () => {};

  componentDidMount() {}

  render() {
    return (
      <ImageBackground
        source={imageBackground}
        style={{ width: '100%', height: '100%' }}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
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
              loading={this.state.isConnecting}
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
