import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AsyncStorage, ScrollView, Text, View } from 'react-native';
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

  static navigationOptions = {
    title: 'Mon profil',
  };

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
        <View style={{ ...styles.container, paddingTop: 0, paddingBottom: 0 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ ...styles.center, marginTop: 24 }}>
              <Avatar.Image size={128} source={{ uri: user.picture }} />
              <Headline>
                {user.birthdate
                  ? `${user.given_name}, ${Date.now().getFullYear() -
                      user.birthdate.getFullYear()}`
                  : user.given_name}
              </Headline>
            </View>

            <View style={styles.row}>
              <View style={[styles.column, styles.center]}>
                <Title>Rencontres</Title>
                <Paragraph>{user.meets ? user.meets.length : 0}</Paragraph>
              </View>
              <View style={[styles.column, styles.center]}>
                <Title>Bons plans</Title>
                <Paragraph>
                  {user.good_plans_saved ? user.good_plans_saved.length : 0}
                </Paragraph>
              </View>
              <View style={[styles.column, styles.center]}>
                <Title>Points</Title>
                <Paragraph>{user.points || 0}</Paragraph>
              </View>
            </View>

            <View style={styles.row}>
              <Subheading>{`Votre profil est complet à `}</Subheading>
              <Subheading style={{ color: colors.primary }}>{'60%'}</Subheading>
            </View>
            <ProgressBar progress={60} />

            <Title>Résumé</Title>
            <Paragraph>
              {user.resume ||
                'Complétez votre résumé pour que les autres voyageurs puissent en connaître un peu plus sur vous avant de vous rencontrer'}
            </Paragraph>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Button
                mode="text"
                icon="create"
                onPress={() => {
                  this.props.navigation.navigate('editProfil', {
                    user,
                    onGoBack: () => this.refresh(),
                  });
                }}
              >
                Modifier mes informations
              </Button>
              <Button mode="text" icon="settings" onPress={() => {}}>
                Réglages
              </Button>
              <Button
                onPress={async () => {
                  await AsyncStorage.clear();
                  this.props.navigation.navigate('AuthLoading');
                }}
              >
                Déconnexion
              </Button>
            </View>
          </ScrollView>
        </View>
      );
    }
    return <View />;
  }
}
