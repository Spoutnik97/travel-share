import React, { Component } from 'react';

import { db } from '../Firebase';

import { AsyncStorage, ScrollView } from 'react-native';
import { Avatar, List, TextInput, Title } from 'react-native-paper';

import colors from '../styles/colors';
import styles from '../styles/styles';

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
      messages: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then(value => {
      const user = JSON.parse(value);

      const messages = [];

      Promise.all(
        Object.keys(user.conversations).map(
          conv_id =>
            new Promise(function(resolve, reject) {
              console.log(`conv_id : ${conv_id}`);

              db.collection('conversations')
                .doc(conv_id)
                .get()
                .then(doc => {
                  const conversation = doc.data();
                  console.log(`conversation : ${JSON.stringify(conversation)}`);

                  messages.push(conversation);
                  resolve();
                })
                .catch(err => console.log(err));
            })
        )
      ).then(values => {
        this.setState({ user, messages });
      });
    });
  }

  render() {
    const { messages, user } = this.state;
    return (
      <ScrollView style={{ padding: 12 }}>
        {messages &&
          messages.map(conv => (
            <List.Item
              key={conv.id}
              title={conv.name}
              description={conv.last_message}
              onPress={() =>
                this.props.navigation.navigate('conversation', {
                  conversation: conv,
                  user,
                })
              }
              left={props => (
                <Avatar.Image size={64} source={{ uri: conv.picture }} />
              )}
            />
          ))}
      </ScrollView>
    );
  }
}
