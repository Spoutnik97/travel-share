import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { Avatar, List, TextInput, Title } from 'react-native-paper';

import Fire from '../Fire';
import { GiftedChat } from 'react-native-gifted-chat';

import colors from '../styles/colors';
import styles from '../styles/styles';

const TEST_DATA = [
  {
    id: 'a',
    members: ['Guillaume'],
    last_message: 'Salut, comment ça va ?',
    messages: [],
  },
  {
    id: 'b',
    members: ['Martin'],
    last_message: 'Hello, comment ça va ?',
    messages: [],
  },
  {
    id: 'c',
    members: ['Florence', 'Grégoire'],
    last_message: 'Hola, comment ça va ?',
    messages: [],
  },
];

export default class Contacts extends Component {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = {
    title: 'Messages',
    headerStyle: {
      backgroundColor: colors.primary,
      height: styles.HEADER_HEIGHT,
    },
    headerTintColor: '#fff',
  };

  constructor(props) {
    super(props);

    this.state = {
      messages: TEST_DATA,
    };
  }

  render() {
    const { messages } = this.state;
    return (
      <View style={{ margin: 12 }}>
        {messages &&
          messages.map(conv => (
            <List.Item
              key={conv.id}
              title={conv.members.join(', ')}
              description={conv.last_message}
              onPress={() =>
                this.props.navigation.navigate('conversation', {
                  conversation: conv,
                })
              }
              left={props => (
                <Avatar.Image
                  size={64}
                  source={require('../assets/test/florence.jpg')}
                />
              )}
            />
          ))}
      </View>
    );
  }
}
