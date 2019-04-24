import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { SocialIcon } from 'react-native-elements';
import { Button, Subheading, TextInput, Title } from 'react-native-paper';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class SignUp extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  handleSignUpEmail = () => {};

  handleSignUpGoogle = () => {};

  handleSignUpFacebook = () => {};

  handleSignUpLinkedIn = () => {};

  render() {
    return (
      <View style={styles.container}>
        <Title>
          {
            "Inscrivez-vous à la plus grande plateforme d'échange entre voyageurs !"
          }
        </Title>
        <View style={styles.center}>
          <SocialIcon
            title={"S'identifier avec Facebook"}
            button
            onPress={this.handleSignUpFacebook}
            type="facebook"
          />
          <SocialIcon
            title={"S'identifier avec Google"}
            button
            onPress={this.handleSignUpGoogle}
            type="google-plus-official"
          />
          <SocialIcon
            title={"S'identifier avec LinkedIn"}
            button
            onPress={this.handleSignUpLinkedIn}
            type="linkedin"
          />
          <View style={[styles.row, styles.center]}>
            <Subheading>___ OU ___</Subheading>
          </View>
          <TextInput
            mode="outlined"
            label="Votre email"
            placeholder=""
            value={this.state.email}
            onChangeText={value => this.setState({ email: value })}
          />
          <TextInput
            mode="outlined"
            label="Mot de passe"
            placeholder="********"
            value={this.state.password}
            onChangeText={value => this.setState({ password: value })}
          />

          <Button mode="contained" onPress={this.handleSignUpEmail}>
            {'Suivant'}
          </Button>
        </View>
      </View>
    );
  }
}
