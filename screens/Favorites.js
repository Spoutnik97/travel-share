import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class Favorites extends Component {
  static navigationOptions = {
    title: 'Mes bons plans',
  };

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <View />;
  }
}
