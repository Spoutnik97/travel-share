import React, { Component } from 'react';
import PropTypes from 'prop-types';

import firebase from 'firebase';
// import '@firebase/firestore';

import { ActivityIndicator, ScrollView, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import { ServiceCategoryScrollView } from '../components/rn-travel-share';

import colors from '../styles/colors';
import styles from '../styles/styles';

const SERVICES_TYPES = ['restaurant', 'atm', 'chill'];
const SERVICES_LABELS = {
  restaurant: 'Restaurants',
  chill: 'Espaces détente',
  atm: 'Distributeurs',
};

const services_test = [
  {
    name: 'Le Spoutnik',
    description: 'Un petit restaurant de charme...',
    type: 'restaurant',
    picture:
      'https://firebasestorage.googleapis.com/v0/b/travelshare-97.appspot.com/o/services%2Fcafe1.jpg?alt=media&token=fe64daf5-ed4e-463c-8911-c4b44826fd46',
    likes: 0,
  },
  {
    name: 'Hello Cafe',
    description: 'Un petit cafe sympa',
    type: 'restaurant',
    picture:
      'https://firebasestorage.googleapis.com/v0/b/travelshare-97.appspot.com/o/services%2Fcafe2.jpg?alt=media&token=65083f6c-8304-4407-8ba7-6fd054ce265e',
    likes: 0,
  },
  {
    name: 'AirRia',
    description: 'Espace de repos AirFrance pour les business traveller',
    type: 'chill',
    picture:
      'https://firebasestorage.googleapis.com/v0/b/travelshare-97.appspot.com/o/services%2Fcafe2.jpg?alt=media&token=65083f6c-8304-4407-8ba7-6fd054ce265e',
    likes: 0,
  },
];

export default class AirportsServices extends Component {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = {
    title: 'Services',
  };

  constructor(props) {
    super(props);

    this.state = {
      services: services_test,
      filteredServices: [],
    };
  }

  getServices = () => {
    return new Promise((resolve, reject) => {
      const db = firebase.database();
      let services = [];
      db.ref('airports')
        .once('value')
        .then(airports => {
          console.log(`typeof airports.val() : ${typeof airports.val()}`);

          console.log(
            `JSON.stringify(airports) : ${JSON.stringify(airports.val())}`
          );

          Object.values(airports.val()).forEach(airport => {
            console.log(`JSON.stringify(airport) : ${JSON.stringify(airport)}`);

            console.log(
              `airport.services : ${JSON.stringify(airport.services)}`
            );
            Object.values(airport.services).forEach(service => {
              services.push(service);
            });
          });

          resolve(services);
        });
    });
  };
  // getServicesFirestore = () => {
  //   return new Promise((resolve, reject) => {
  //     const db = firebase.firestore();
  //     let services = [];
  //     db.collection('airports')
  //       .where('location.latitude', '<=', 49)
  //       .where('location.latitude', '>=', 47)
  //       .get()
  //       .then(querySnapshot => {
  //         querySnapshot.forEach(doc => {
  //           db.collection('airports')
  //             .doc(doc.id)
  //             .collection('services')
  //             .get()
  //             .then(querySnapshotServices => {
  //               querySnapshotServices.forEach(service => {
  //                 services.push(service.data());
  //                 console.log(`${doc.id} => ${doc.data()}`);
  //               });
  //               resolve(services);
  //             });
  //         });
  //       });
  //   });
  // };

  orderServices = services => {
    console.log('IN orderServices');
    console.log(`typeof services : ${typeof services}`);

    console.log(`services in orderservices : ${JSON.stringify(services)}`);

    const filteredServices = [];
    let servicesByType = [];
    SERVICES_TYPES.forEach(type => {
      servicesByType = [];
      services.forEach(service => {
        console.log(`type : ${type}`);
        console.log(`service.type : ${service.type}`);

        if (service.type === type) {
          servicesByType.push(service);
        }
      });
      filteredServices.push({
        header: type,
        services: servicesByType,
      });
    });
    console.log(
      `JSON.stringify(filteredServices) : ${JSON.stringify(filteredServices)}`
    );

    this.setState({ filteredServices: filteredServices });
  };

  componentDidMount() {
    this.getServices().then(services => {
      console.log(services);
      this.orderServices(services);
    });
  }

  render() {
    const { filteredServices } = this.state;

    return (
      <ScrollView>
        {filteredServices && filteredServices.length > 0 ? (
          filteredServices.map(type => (
            <ServiceCategoryScrollView
              key={type.header}
              header={SERVICES_LABELS[type.header]}
              data={type.services}
            />
          ))
        ) : (
          <ActivityIndicator size="large" color={colors.primary} />
        )}
      </ScrollView>
    );
  }
}
