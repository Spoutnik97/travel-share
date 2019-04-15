import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class extends Component {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = {
    title: 'Services',
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{}}>
        <Card>
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={props => <Avatar.Icon {...props} icon="folder" />}
          />
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}
