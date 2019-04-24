import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { TextInput, Title } from 'react-native-paper';

import Fire from '../Fire';
import { GiftedChat } from 'react-native-gifted-chat';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  omponentDidMount() {
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
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={{
          name: 'Guillaume',
          _id: Fire.shared.uid,
        }}
      />
    );
  }
}
