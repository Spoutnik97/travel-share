import React, { Component } from 'react';
import PropTypes from 'prop-types';

import firebase from 'firebase';
import '@firebase/firestore';

import { AsyncStorage, Text, View } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';

import colors from '../styles/colors';
import styles from '../styles/styles';

import firebaseConfig from '../keys/firebase';

export default class Admin extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  // insertAirport = () => {
  //   const db = firebase.firestore();
  //   console.ignoredYellowBox = ['Setting a timer'];
  //   // firebase.initializeApp(firebaseConfig);
  //   db.collection('airports')
  //     .add({
  //       name: 'Charles de Gaulle',
  //       location: {
  //         latitude: 49.009258, // The latitude in degrees.
  //         longitude: 2.546245, // The longitude in degrees.
  //         altitude: null, // The altitude in meters above the WGS 84 reference ellipsoid.
  //       },
  //       picture:
  //         'https://firebasestorage.googleapis.com/v0/b/travelshare-97.appspot.com/o/airports%2Froissy.jpg?alt=media&token=36a71510-d89f-470a-934f-42f1163a2fe9',
  //       map:
  //         'https://firebasestorage.googleapis.com/v0/b/travelshare-97.appspot.com/o/airports%2Froissy-t1.jpg?alt=media&token=30284f96-525c-4e56-a51a-642594120aa4',
  //     })
  //     .then(docRef => {
  //       console.log('Document written with ID: ', docRef.id);
  //       db.collection('airports')
  //         .doc(docRef.id)
  //         .collection('services')
  //         .add({
  //           name: 'Le Spoutnik',
  //           description: 'Un petit restaurant de charme...',
  //           type: 'restaurant',
  //           picture:
  //             'https://firebasestorage.googleapis.com/v0/b/travelshare-97.appspot.com/o/services%2Fcafe1.jpg?alt=media&token=fe64daf5-ed4e-463c-8911-c4b44826fd46',
  //           likes: 0,
  //         })
  //         .then(serviceRef => {
  //           console.log(serviceRef.id);
  //         });
  //     })
  //     .catch(function(error) {
  //       console.error('Error adding document: ', error);
  //     });
  // };
  insertAirport = () => {
    const db = firebase.database();
    db.ref('airports')
      .push({
        name: 'Charles de Gaulle',
        location: {
          latitude: 49.009258, // The latitude in degrees.
          longitude: 2.546245, // The longitude in degrees.
          altitude: null, // The altitude in meters above the WGS 84 reference ellipsoid.
        },
        picture:
          'https://firebasestorage.googleapis.com/v0/b/travelshare-97.appspot.com/o/airports%2Froissy.jpg?alt=media&token=36a71510-d89f-470a-934f-42f1163a2fe9',
        map:
          'https://firebasestorage.googleapis.com/v0/b/travelshare-97.appspot.com/o/airports%2Froissy-t1.jpg?alt=media&token=30284f96-525c-4e56-a51a-642594120aa4',
      })
      .then(el => {
        console.log(`el : ${el}`);
      });
  };
  insertAirportService = () => {
    const db = firebase.database();
    db.ref('airports/-Ldok8iYCv7KLC37sSPa/services')
      .push({
        name: 'Le Spoutnik',
        description: 'Un petit restaurant de charme...',
        type: 'restaurant',
        picture:
          'https://firebasestorage.googleapis.com/v0/b/travelshare-97.appspot.com/o/services%2Fcafe1.jpg?alt=media&token=fe64daf5-ed4e-463c-8911-c4b44826fd46',
        likes: 0,
      })
      .then(el => {
        console.log(`el : ${el}`);
      });
    db.ref('airports/-Ldok8iYCv7KLC37sSPa/services')
      .push({
        name: 'Hello Cafe',
        description: 'Un petit cafe sympa',
        type: 'restaurant',
        picture:
          'https://firebasestorage.googleapis.com/v0/b/travelshare-97.appspot.com/o/services%2Fcafe2.jpg?alt=media&token=65083f6c-8304-4407-8ba7-6fd054ce265e',
        likes: 0,
      })
      .then(el => {
        console.log(`el : ${el}`);
      });
  };
  // insertAirportServiceFirestore = () => {
  //   const db = firebase.firestore();
  //   db.collection('airports')
  //     .where('name', '==', 'Charles de Gaulle')
  //     .get()
  //     .then(querySnapshot => {
  //       querySnapshot
  //         .forEach(doc => {
  //           console.log(doc.id);
  //           db.collection('airports')
  //             .doc(doc.id)
  //             .collection('services')
  //             .add({
  //               name: 'Lounge Air France',
  //               description:
  //                 'Espace de repos AirFrance pour les business traveller',
  //               type: 'chill',
  //               picture:
  //                 'https://firebasestorage.googleapis.com/v0/b/travelshare-97.appspot.com/o/services%2Fcafe2.jpg?alt=media&token=65083f6c-8304-4407-8ba7-6fd054ce265e',
  //               likes: 0,
  //             })
  //             .then(serviceRef => {
  //               console.log(serviceRef.id);
  //             })
  //             .catch(error => {
  //               console.log('Error adding document: ', error);
  //             });
  //         })
  //         .catch(error => {
  //           console.log('Error adding document: ', error);
  //         });
  //     });
  // };

  render() {
    return (
      <View>
        <Text>New Screen</Text>

        <Button onPress={this.insertAirport}>Ajouter Airport</Button>
        <Button onPress={this.insertAirportService}>Ajouter Service</Button>

        <Button
          onPress={async () => {
            await AsyncStorage.clear();
            this.props.navigation.navigate('AuthLoading');
          }}
        >
          Déconnexion
        </Button>
      </View>
    );
  }
}
