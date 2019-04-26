import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Image, Text, View } from 'react-native';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class ServiceDetails extends Component {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = ({ navigation, navigationOptions }) => ({
    title: navigation.getParam('service').name || '',
    headerStyle: {
      backgroundColor: colors.primary,
      height: styles.HEADER_HEIGHT,
      verticalAlign: 'center',
    },
    headerTintColor: '#fff',
    headerMode: 'screen',
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { navigation } = this.props;
    console.log(JSON.stringify(navigation));
    const service = navigation.getParam('service', {});
    return (
      <View>
        <Text>{service.name}</Text>
        <Image
          source={{ uri: service.picture }}
          style={{ width: 250, height: 250 }}
        />
      </View>
    );
  }
}
