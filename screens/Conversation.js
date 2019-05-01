import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { TextInput, Title } from 'react-native-paper';

import Fire from '../Fire';
import { GiftedChat } from 'react-native-gifted-chat';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class Conversation extends Component {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = ({ navigation, navigationOptions }) => ({
    title: navigation.state.params.name,
    headerStyle: {
      backgroundColor: colors.primary,
      height: styles.HEADER_HEIGHT,
      verticalAlign: 'center',
    },
    headerTintColor: '#fff',
  });

  constructor(props) {
    super(props);

    this.state = { messages: [] };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const conversation = navigation.getParam('conversation', { messages: [] });
    this.setState({ messages: conversation.messages });
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
  render() {
    return (
      <View>
        <GiftedChat
          messages={this.state.messages}
          onSend={Fire.shared.send}
          user={{
            name: 'Guillaume',
            _id: Fire.shared.uid,
          }}
        />
      </View>
    );
  }
}
