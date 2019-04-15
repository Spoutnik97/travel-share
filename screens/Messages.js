import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { TextInput, Title } from 'react-native-paper';

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
      <View style={{}}>
        <TextInput
          label="Où allez-vous aujourd'hui ?"
          placeholder="New York"
          value={this.state.where}
          onChangeText={value => this.setState({ where: value })}
        />
      </View>
    );
  }
}
