import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Image, View } from 'react-native';
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

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { user } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Avatar.Image size={64} source={{ uri: user.picture }} />
          <View style={[styles.column, styles.content]}>
            <Title style={{ color: colors.primary }}>{user.given_name}</Title>
            <Paragraph>{user.resume}</Paragraph>
          </View>
        </View>

        <Button
          onPress={() => {
            this.props.navigation.navigate('conversation', { user });
          }}
        >{`Envoyer un message à ${user.given_name}`}</Button>

        <Subheading>{`A déjà visité ${
          user.countries_visited ? user.countries_visited.length : 0
        } pays`}</Subheading>
        <Subheading>Parle</Subheading>
        {user.languages &&
          user.languages.map(language => {
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
