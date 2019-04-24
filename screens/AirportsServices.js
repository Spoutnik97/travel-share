import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { ServiceCategoryScrollView } from '../components/rn-travel-share';

import colors from '../styles/colors';
import styles from '../styles/styles';

const SERVICES_TYPES = ['restaurant', 'atm', 'chill'];

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
    name: 'Lounge Air France',
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
      filteredServices: true,
    };
  }

  filterObject = (obj, filter, filterValue) => {
    Object.keys(obj).reduce((acc, val) =>
      obj[val][filter] === filterValue
        ? {
            ...acc,
            [val]: obj[val],
          }
        : acc
    );
  };

  componentDidMount() {
    const filteredServices = [];
    let servicesByType = [];
    SERVICES_TYPES.forEach(type => {
      servicesByType = [];
      this.state.services.forEach(service => {
        if (service.type === type) {
          servicesByType.push(service);
        }
      });
      filteredServices.push({
        header: type,
        services: servicesByType,
      });
    });

    this.setState({ filteredServices: filteredServices });
  }

  render() {
    const { filteredServices } = this.state;
    return (
      <ScrollView>
        {filteredServices &&
          filteredServices.length > 0 &&
          filteredServices.map(type => (
            <ServiceCategoryScrollView
              key={type.header}
              header={type.header}
              data={type.services}
            />
          ))}
      </ScrollView>
    );
  }
}
