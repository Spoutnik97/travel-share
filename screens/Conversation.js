import React, { Component } from 'react';

import { db } from '../Firebase';

import { ActivityIndicator, AsyncStorage, Text, View } from 'react-native';
import { TextInput, Title } from 'react-native-paper';

import { GiftedChat } from 'react-native-gifted-chat';

import Reactotron from 'reactotron-react-native';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class Conversation extends Component {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = ({ navigation, navigationOptions }) => ({
    title: navigation.state.params.conversation.name,
    ...navigationOptions,
    headerMode: 'screen',
  });

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      conversation: this.props.navigation.state.params.conversation || null,
      user: this.props.navigation.state.params.user || null,
      status: 'Chargement des données locales...',
    };
  }

  conversationId = function(user1, user2) {
    if (user1 >= user2) {
      return '-' + user2 + '-' + user1;
    }
    return '-' + user1 + '-' + user2;
  };

  dataParser = data => {
    const messages = this.state.messages || [];

    data.forEach(message => {
      const formated = message;
      formated.createdAt = new Date(message.createdAt.seconds * 1000);
      messages.push(formated);
    });

    this.setState({ messages });
  };

  fetchMessages = conversation_id => {
    if (conversation_id) {
      this.unsubscribe = db
        .collection('conversations')
        .doc(conversation_id)
        .collection('messages')
        .orderBy('createdAt', 'asc')
        .onSnapshot(snapshot => {
          var data = [];
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              const message = { ...change.doc.data(), id: change.doc.id };
              Reactotron.log(message);
              data.push(message);
              this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, {
                  ...message,
                  createdAt: new Date(message.createdAt.seconds * 1000),
                }),
              }));
            }
          });

          // this.dataParser(data);
        });
    } else {
      console.error('fetchMessages : Conversation ID null');
    }
  };

  newConversation = (conversation_id, user, friend) => {
    Reactotron.log('newConversation conversation_id : ' + conversation_id);
    Reactotron.log('newConversation user : ' + JSON.stringify(user));
    Reactotron.log('newConversation friend : ' + JSON.stringify(friend));
    return new Promise((resolve, reject) => {
      db.collection('conversations')
        .doc(conversation_id)
        .set({
          id: conversation_id,
          name: `${user.given_name}, ${friend.given_name}`,
          members: [user.id, friend.id],
          created_at: Date.now(),
        })
        .then(() => {
          Reactotron.log('Conversation créée : ' + conversation_id);
          let updated_user = user;
          updated_user = {
            ...updated_user,
            conversations: {
              ...updated_user.conversations,
              [conversation_id]: Date.now(),
            },
          };
          this.setState({ status: 'Enregistrement des données en ligne...' });
          db.collection('users')
            .doc(user.id)
            .update(updated_user)
            .then(() => {
              AsyncStorage.setItem('user', JSON.stringify(updated_user))
                .then(() => {
                  this.setState({
                    user: updated_user,
                    status: 'Enregistrement terminé !',
                  });
                  resolve();
                })
                .catch(err => reject(err));
            });
        })
        .catch(err => reject(err));
    });
  };

  onSend = mess => {
    const message = mess[0];
    Reactotron.log(message);
    const { conversation } = this.state;
    if (conversation.id) {
      db.collection('conversations')
        .doc(conversation.id)
        .collection('messages')
        .add(message)
        .then(() => {})
        .catch(err => console.log(err));
    }
  };

  findFriendId = (user_id, conversation_id) => {
    const ids = conversation_id.split('-').slice(1);
    Reactotron.log(ids);
    for (let i in ids) {
      if (ids[i] !== user_id && ids[i] !== '') {
        Reactotron.log('OK');
        return ids[i];
      }
    }
    // ids.forEach(id => {
    //
    // });
    return null;
  };

  async componentDidMount() {
    const { conversation } = this.state;
    if (conversation.id) {
      let { user } = this.state;
      if (!user) {
        await AsyncStorage.getItem('user').then(value => {
          user = JSON.parse(value);
          this.setState({ user });
        });
      }

      const friend_id = this.findFriendId(user.id, conversation.id);

      if (friend_id) {
        this.setState({ status: 'Chargement de la conversation...' });
        db.collection('conversations')
          .doc(conversation.id)
          .get()
          .then(doc => {
            if (doc.exists) {
              this.setState({ status: 'Chargement des messages...' });
              this.fetchMessages(conversation.id);
              this.setState({ user, status: false });
            } else {
              this.setState({ status: 'Création de la conversation...' });
              this.newConversation(conversation.id, user, {
                given_name: conversation.name,
                id: friend_id,
              })
                .then(() => {
                  this.fetchMessages(conversation.id);
                  this.setState({ user, status: false });
                })
                .catch(err => Reactotron.log(err));
            }
          })
          .catch(err => console.log(err));
      } else {
        this.setState({ status: 'Erreur de chargement :(' });
        console.log("Erreur de chargement de l'id de l'amis");
      }
    } else {
      this.setState({
        status: "Impossible d'obtenir les informations de ce voyageur :(",
      });
    }
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  render() {
    const { user } = this.state;
    if (!user || this.state.status) {
      return (
        <View style={[styles.container, styles.center]}>
          <Text>{this.state.status}</Text>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          name: user.given_name || 'Anonyme',
          _id: user.id,
          avatar: user.picture || '',
        }}
      />
    );
  }
}
