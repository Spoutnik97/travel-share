import React, { Component } from 'react';
import { View } from 'react-native';
import { Avatar, Title, Paragraph } from 'react-native-paper';
import PropTypes from 'prop-types';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class CardPeople extends Component {
  static propTypes = {
    picture: PropTypes.string,
    header: PropTypes.string,
    content: PropTypes.string,
  };

  static defaultProps = {
    picture: '',
    header: '',
    content: '',
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={[styles.row, styles.card]}>
        <Avatar.Image
          size={64}
          source={require('../assets/test/florence.jpg')}
        />
        <View style={[styles.column, styles.content]}>
          <Title>{this.props.header}</Title>
          <Paragraph>{this.props.content}</Paragraph>
        </View>
      </View>
    );
  }
}
