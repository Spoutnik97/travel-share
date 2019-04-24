import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class extends Component {
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
