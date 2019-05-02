import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AsyncStorage, Text, View } from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';

import DateTimePicker from 'react-native-modal-datetime-picker';

import { CheckBoxModal } from '../components/rn-travel-share';

import colors from '../styles/colors';
import styles from '../styles/styles';

import firebaseConfig from '../keys/firebase';

import labelDictionnary from '../assets/dictionnaries/labels';
import languagesDictionnary from '../assets/dictionnaries/languages';

const userData = [
  'given_name',
  'birthdate',
  'email',
  'resume',
  'languages',
  'countries_visited',
  'countries_dreamed',
];

export default class EditProfil extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      readyToRender: false,
    };
  }

  handleSave = () => {
    let user = {};
    userData.forEach(label => {
      user[label] = this.state[label] || this.state.user[label] || null;
    });

    AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
      this.props.navigation.state.params.onGoBack();
      this.props.navigation.goBack();
    });
  };

  componentDidMount() {
    AsyncStorage.getItem('user').then(user => {
      this.setState({ user: JSON.parse(user), readyToRender: true });
    });
  }

  render() {
    const { user, readyToRender } = this.state;
    if (readyToRender) {
      return (
        <View style={styles.container}>
          <View style={styles.center}>
            <Avatar.Image size={128} source={{ uri: user.picture }} />
          </View>

          {userData.map(label => {
            if (label === 'languages') {
              return (
                <View>
                  <TextInput
                    key={label}
                    mode="flat"
                    multiline={label === 'resume'}
                    label={labelDictionnary[label]}
                    value={this.state[label]}
                    style={styles.input}
                    error={this.state[`${label}_error`]}
                    onFocus={() => {
                      this.setState({ languagesModalVisible: true });
                    }}
                  />
                  <CheckBoxModal
                    visible={this.state.languagesModalVisible}
                    values={['fr', 'en', 'cn']}
                    labels={['fr', 'en', 'cn'].map(
                      code => languagesDictionnary[code].label
                    )}
                    onRequestClose={() => {
                      this.setState({ languagesModalVisible: false });
                    }}
                    onConfirm={list => {
                      this.setState({ languages: list });
                    }}
                  />
                </View>
              );
            }
            return (
              <TextInput
                key={label}
                mode="flat"
                multiline={label === 'resume'}
                label={labelDictionnary[label]}
                value={this.state[label]}
                style={styles.input}
                error={this.state[`${label}_error`]}
                onFocus={
                  label === 'birthdate'
                    ? () => {
                        this.setState({ isDateTimePickerVisible: true });
                      }
                    : () => {}
                }
                onChangeText={value => this.setState({ [label]: value })}
              />
            );
          })}

          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            mode="date"
            onConfirm={date => {
              this.setState({ birthdate: date });
            }}
            onCancel={() => {
              this.setState({ isDateTimePickerVisible: false });
            }}
          />

          <Button
            mode="contained"
            style={{ marginTop: 24 }}
            onPress={this.handleSave}
          >
            Enregistrer
          </Button>
        </View>
      );
    }
    return <View />;
  }
}
