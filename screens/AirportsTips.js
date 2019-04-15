import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class extends Component {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = {
    title: 'Conseils',
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <View />;
  }
}
