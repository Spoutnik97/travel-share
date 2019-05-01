import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Image, ScrollView, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import colors from '../styles/colors';
import styles from '../styles/styles';

const TEST_DATA = [
  {
    name: 'Terminal 1',
    map:
      'https://firebasestorage.googleapis.com/v0/b/travelshare-97.appspot.com/o/airports%2Froissy-t1.jpg?alt=media&token=30284f96-525c-4e56-a51a-642594120aa4',
  },
];

export default class extends Component {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = {
    title: 'Plan',
  };

  constructor(props) {
    super(props);

    this.state = {
      maps: TEST_DATA,
    };
  }

  componentDidMount() {}

  render() {
    const { maps } = this.state;
    return (
      <View>
        <ScrollView>
          {maps &&
            maps.length > 0 &&
            maps.map(item => (
              <View key={item.name}>
                <Title style={{ marginLeft: 12 }}>{item.name}</Title>
                <Image
                  source={{ uri: item.map }}
                  style={{ width: '100%', height: 300 }}
                />
              </View>
            ))}
        </ScrollView>
      </View>
    );
  }
}
