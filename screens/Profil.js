import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AsyncStorage, Text, View } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';

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
        <Button
          onPress={async () => {
            await AsyncStorage.clear();
            this.props.navigation.navigate('AuthLoading');
          }}
        >
          Déconnexion
        </Button>
      </View>
    );
  }
}
