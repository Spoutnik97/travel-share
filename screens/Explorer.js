import React, { Component } from 'react';

import firebase from 'firebase';
import '@firebase/firestore';

import {
  AsyncStorage,
  Picker,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Constants, Location, Permissions } from 'expo';

import { Icon } from 'react-native-elements';
import { Button, TextInput, Title } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';

import colors from '../styles/colors';
import styles from '../styles/styles';

const db = firebase.firestore();

export default class Explorer extends Component {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = ({ navigationOptions }) => ({
    title: 'Bienvenue sur Travel&Share',
    ...navigationOptions,
  });

  constructor(props) {
    super(props);

    this.state = {};
  }

  saveLocation = location => {
    const user = { ...this.state.user, location: location };
    db.collection('users')
      .doc(this.state.user.id)
      .update(user)
      .then(() => {
        console.log('Location updated : ' + JSON.stringify(location));
        AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
          this.setState({ user, location });
        });
      })
      .catch(err => console.log(err));
  };

  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.saveLocation(location);
  };

  componentDidMount() {
    AsyncStorage.getItem('user').then(user => {
      this.setState({ user: JSON.parse(user) }, () => {
        this.getLocation();
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Title>{'Quelques informations avant de partager'}</Title>
        <View style={styles.row}>
          <Icon
            name="airplanemode-active"
            size={32}
            color={colors.grey_dark}
            style={{ marginRight: 24 }}
          />
          <View style={styles.column}>
            <TextInput
              mode="flat"
              label="Où allez-vous aujourd'hui ?"
              placeholder="New York"
              value={this.state.where}
              style={styles.input}
              onChangeText={value => this.setState({ where: value })}
            />
          </View>
        </View>
        <View style={styles.row}>
          <Icon
            name="alarm"
            size={32}
            color={colors.grey_dark}
            style={{ marginRight: 24 }}
          />
          <View style={styles.column}>
            <TextInput
              mode="flat"
              label="Quand partez-vous ?"
              placeholder="2:30 pm"
              value={this.state.when ? this.state.when.toString() : null}
              style={styles.input}
              onFocus={() => {
                this.setState({ isDateTimePickerVisible: true });
              }}
            />
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              mode="datetime"
              onConfirm={date => {
                this.setState({ when: date });
              }}
              onCancel={() => {
                this.setState({ isDateTimePickerVisible: false });
              }}
            />
          </View>
        </View>
        <View style={styles.row}>
          <Icon
            name="person"
            size={32}
            color={colors.grey_dark}
            style={{ marginRight: 24 }}
          />
          <View style={styles.column}>
            <Picker
              mode="dropdown"
              onValueChange={({ itemValue, itemPosition }) => {
                if (itemPosition !== 0)
                  this.setState({ travelerType: itemValue });
              }}
            >
              {[
                'Sélectionner un type de voyageur',
                'BackPacker',
                "Voyageur d'affaire",
                'Famille',
              ].map((item, itemIndex) => (
                <Picker.Item key={item} label={item} value={itemIndex} />
              ))}
            </Picker>
          </View>
        </View>
        <Button
          mode="contained"
          onPress={() => this.props.navigation.navigate('shareWith')}
        >
          Rencontrer
        </Button>
      </View>
    );
  }
}
