import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AsyncStorage, Text, View } from 'react-native';
import {
  Avatar,
  Button,
  Headline,
  Paragraph,
  Subheading,
  Title,
} from 'react-native-paper';

import { ProgressBar } from '../components/rn-travel-share';

import colors from '../styles/colors';
import styles from '../styles/styles';

import firebaseConfig from '../keys/firebase';

export default class Profil extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      readyToRender: false,
    };
  }

  refresh = () => {
    AsyncStorage.getItem('user').then(user => {
      this.setState({ user: JSON.parse(user), readyToRender: true });
    });
  };

  componentDidMount() {
    this.refresh();
  }

  render() {
    const { user, readyToRender } = this.state;
    if (readyToRender) {
      return (
        <View style={styles.container}>
          <View style={styles.center}>
            <Avatar.Image size={128} source={{ uri: user.picture }} />
            <Headline>{`${user.given_name}, ${Date.now().getYear() -
              user.birthdate.getYear()}`}</Headline>
          </View>

          <View style={styles.row}>
            <View style={[styles.column, styles.center]}>
              <Title>Rencontres</Title>
              <Paragraph>{user.meets.length}</Paragraph>
            </View>
            <View style={[styles.column, styles.center]}>
              <Title>Bons plans</Title>
              <Paragraph>{user.good_plans_saved.length}</Paragraph>
            </View>
            <View style={[styles.column, styles.center]}>
              <Title>Points</Title>
              <Paragraph>{user.points}</Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <Subheading>{`Votre profil est complet à `}</Subheading>
            <Subheading style={{ color: colors.primary }}>{'60%'}</Subheading>
          </View>
          <ProgressBar progress={60} />

          <Title>Résumé</Title>
          <Paragraph>{user.resume}</Paragraph>

          <Button
            mode="text"
            icon="create"
            onPress={() => {
              this.props.navigation.navigate('editProfil', {
                onGoBack: () => this.refresh(),
              });
            }}
          >
            Modifier mes informations
          </Button>
          <Button mode="text" icon="setting" onPress={() => {}}>
            Réglages
          </Button>
        </View>
      );
    }
    return <View />;
  }
}
