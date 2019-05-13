import React, { Component } from 'react';
import PropTypes from 'prop-types';

import firebase from 'firebase';
import { db } from '../Firebase';

import { AsyncStorage, ScrollView, Text, View } from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';

import DateTimePicker from 'react-native-modal-datetime-picker';

import { CheckBoxModal } from '../components/rn-travel-share';

import colors from '../styles/colors';
import styles from '../styles/styles';

import labelDictionnary from '../assets/dictionnaries/labels';
import languagesDictionnary from '../assets/dictionnaries/languages';

export default class EditProfil extends Component {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = {
    title: 'Modifier mon profil',
  };

  constructor(props) {
    super(props);

    const { user } = this.props.navigation.state.params;
    this.state = {
      user: user || {},
      userData: [
        'given_name',
        'birthdate',
        'email',
        'resume',
        'languages',
        'countries_visited',
        'countries_dreamed',
      ],
      readyToRender: false,
    };
  }

  handleSave = () => {
    let user = this.state.user;
    this.state.userData.forEach(label => {
      user[label] = this.state[label] || this.state.user[label] || null;
      if (label === 'email' && user[label] === 'guipiedi@gmail.com') {
        user.admin = true;
      }
    });

    db.collection('users')
      .doc(user.id)
      .update(user)
      .then(docRef => {
        AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
          this.props.navigation.state.params.onGoBack();
          this.props.navigation.goBack();
        });
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  };

  uploadImage = async uri => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref('avatar')
        .child('IMAGE_ID');
      const task = ref.put(blob);
      return new Promise((resolve, reject) => {
        task.on('state_changed', () => {}, reject, () =>
          resolve(task.snapshot.downloadURL)
        );
      });
    } catch (err) {
      console.log('uploadImage error: ' + err.message);
    }
  };

  componentDidMount() {
    // AsyncStorage.getItem('user').then(user => {
    //   this.setState({ user: JSON.parse(user), readyToRender: true });
    // });
  }

  render() {
    const { user } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.center}>
            <Avatar.Image size={128} source={{ uri: user.picture }} />
          </View>

          <View>
            {this.state.userData.map(label => {
              // if (label === 'languages') {
              //   return (
              //     <View key={label}>
              //       <TextInput
              //         mode="flat"
              //         multiline={label === 'resume'}
              //         label={labelDictionnary[label]}
              //         value={this.state[label] || user[label]}
              //         style={styles.input}
              //         error={this.state[`${label}_error`]}
              //         onFocus={() => {
              //           this.setState({ languagesModalVisible: true });
              //         }}
              //       />
              //       <CheckBoxModal
              //         visible={this.state.languagesModalVisible}
              //         values={['fr', 'en', 'cn']}
              //         labels={['fr', 'en', 'cn'].map(
              //           code => languagesDictionnary[code].label
              //         )}
              //         onRequestClose={() => {
              //           this.setState({ languagesModalVisible: false });
              //         }}
              //         onConfirm={list => {
              //           this.setState({ languages: list });
              //         }}
              //       />
              //     </View>
              //   );
              // }
              return (
                <TextInput
                  key={label}
                  mode="flat"
                  multiline={label === 'resume'}
                  label={labelDictionnary[label]}
                  value={this.state[label] || user[label] || ''}
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
          </View>

          <Button
            mode="contained"
            style={{ marginTop: 24 }}
            onPress={this.handleSave}
          >
            Enregistrer
          </Button>
        </ScrollView>
      </View>
    );
  }
}
