import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Reactotron from 'reactotron-react-native';

import { AsyncStorage, Image, View } from 'react-native';
import {
  Avatar,
  Button,
  Paragraph,
  Subheading,
  Title,
} from 'react-native-paper';

import colors from '../styles/colors';
import styles from '../styles/styles';

import languagesDictionnary from '../assets/dictionnaries/languages';

export default class ShareWithProfil extends Component {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = {
    title: 'Rencontrer...',
  };

  constructor(props) {
    super(props);

    this.state = {
      user: this.props.navigation.state.params.user || null,
      friend: this.props.navigation.state.params.friend || null,
    };
  }

  conversationId = function(user1, user2) {
    if (user1 >= user2) {
      return '-' + user2 + '-' + user1;
    }
    return '-' + user1 + '-' + user2;
  };

  componentDidMount() {
    Reactotron.log(this.state.user);
    if (this.state.friend) {
      if (!this.state.user) {
        AsyncStorage.getItem('user').then(value => {
          const user = JSON.parse(value);
          const conversation_id = this.conversationId(
            user.id,
            this.state.friend.id
          );

          this.setState({ user: user, conversation_id });
        });
      } else {
        const conversation_id = this.conversationId(
          this.state.user.id,
          this.state.friend.id
        );
        Reactotron.log(conversation_id);
        this.setState({ conversation_id });
      }
    } else {
      console.log("Erreur : le profil friend n'a pas été transmis");
      this.props.navigation.navigate.goBack();
    }
  }

  render() {
    const { friend, conversation_id, user } = this.state;
    Reactotron.log('Render conv id');
    Reactotron.log(conversation_id);
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Avatar.Image size={64} source={{ uri: friend.picture }} />
          <View style={[styles.column, styles.content]}>
            <Title style={{ color: colors.primary }}>{friend.given_name}</Title>
            <Paragraph>{friend.resume}</Paragraph>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={() => {
            this.props.navigation.navigate('newConversation', {
              conversation: {
                id: conversation_id,
                name: friend.given_name,
                picture: friend.picture,
              },
              user,
            });
          }}
        >{`Envoyer un message à ${friend.given_name}`}</Button>

        <Subheading>{`A déjà visité ${
          friend.countries_visited ? friend.countries_visited.length : 0
        } pays`}</Subheading>
        <Subheading>Parle</Subheading>
        {friend.languages &&
          friend.languages.map(language => {
            <View style={styles.row}>
              <Image
                source={{ uri: languagesDictionnary[language].flag }}
                style={{ width: 40, height: 20 }}
              />
              <Paragraph>{languagesDictionnary[language].label}</Paragraph>
            </View>;
          })}
      </View>
    );
  }
}
