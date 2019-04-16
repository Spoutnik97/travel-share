import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { ServiceCategoryScrollView } from '../components/rn-travel-share';

import colors from '../styles/colors';
import styles from '../styles/styles';

const SERVICES_TYPES = ['restaurants', 'atm'];

export default class AirportsServices extends Component {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = {
    title: 'Services',
  };

  constructor(props) {
    super(props);

    this.state = {};
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

    SERVICES_TYPES.forEach(type => {
      filteredServices.push({
        header: type,
        services: this.filterObject(this.state.services, 'type', type),
      });
    });

    this.setState({ filteredServices: filteredServices });
  }

  render() {
    return (
      <ScrollView>
        {this.state.filteredServices.map(type => (
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
