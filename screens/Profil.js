import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text, View } from 'react-native';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class Profil extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View>
        <Text>New Screen</Text>
      </View>
    );
  }
}
