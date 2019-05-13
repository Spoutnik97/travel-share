import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Avatar, Title, Paragraph } from 'react-native-paper';
import PropTypes from 'prop-types';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class CardPeople extends Component {
  static propTypes = {
    picture: PropTypes.string,
    header: PropTypes.string,
    content: PropTypes.string,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    picture: '',
    header: '',
    content: '',
    onPress: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <TouchableOpacity
        style={[styles.row, styles.CardPeople]}
        onPress={this.props.onPress}
      >
        <Avatar.Image size={64} source={{ uri: this.props.picture }} />
        <View style={[styles.column, styles.content]}>
          <Title>{this.props.header}</Title>
          <Paragraph>{this.props.content}</Paragraph>
        </View>
      </TouchableOpacity>
    );
  }
}
