import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { TextInput, Title } from 'react-native-paper';

import Fire from '../Fire';
import { GiftedChat } from 'react-native-gifted-chat';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class Contacts extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <View />;
  }
}
