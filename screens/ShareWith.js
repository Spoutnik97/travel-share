import React, { Component } from 'react';

import firebase from 'firebase';
import '@firebase/firestore';

import {
  AsyncStorage,
  View,
  Picker,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { TextInput, Title } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { CardPeople } from '../components/rn-travel-share';

import colors from '../styles/colors';
import styles from '../styles/styles';

const TEST_DATA = [
  {
    picture: '../assets/test/pp.jpg',
    given_name: 'Florence',
    resume:
      '45 ans - Voyage Aventure En partance pour Hanoï Disponible jusqu’à 22h',
  },
  {
    picture: '../assets/test/pp.jpg',
    given_name: 'Adeline',
    resume:
      '45 ans - Voyage Aventure En partance pour Hanoï Disponible jusqu’à 22h',
  },
  {
    picture: '../assets/test/pp.jpg',
    given_name: 'Clara',
    resume:
      '45 ans - Voyage Aventure En partance pour Hanoï Disponible jusqu’à 22h',
  },
];

export default class ShareWithScreen extends Component {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = ({ navigationOptions }) => ({
    title: 'Partager avec...',
    ...navigationOptions,
  });

  constructor(props) {
    super(props);

    this.state = {
      users: {},
    };
  }

  fetchPeople = () => {
    const db = firebase.firestore();
    const users = {};
    db.collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          const friend = snapshot.data();
          if (friend.id !== this.state.user.id) {
            users[friend.id] = friend;
          }
        });

        this.setState({ users });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    AsyncStorage.getItem('user').then(user => {
      this.setState({ user: JSON.parse(user) }, () => {
        this.fetchPeople();
      });
    });
  }

  render() {
    const { users, user } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          {users &&
            Object.values(users).map(friend => (
              <CardPeople
                key={friend.id}
                picture={friend.picture || ' '}
                header={friend.given_name}
                content={friend.resume}
                onPress={() => {
                  this.props.navigation.navigate('shareWithProfil', {
                    friend: friend,
                    user: user,
                  });
                }}
              />
            ))}
        </ScrollView>
      </View>
    );
  }
}
