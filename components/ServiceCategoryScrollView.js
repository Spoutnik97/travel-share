import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar, Card, Paragraph, Title } from 'react-native-paper';
import PropTypes from 'prop-types';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class ServiceCategoryScrollView extends Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View>
        <Title>{this.props.header}</Title>
        <ScrollView horizontal>
          {this.props.data.map(item => (
            <Card key={item.name}>
              <Card.Content>
                <Title>{item.name}</Title>
                <Paragraph>{item.description}</Paragraph>
              </Card.Content>
              <Card.Cover source={item.picture} />
            </Card>
          ))}
        </ScrollView>
      </View>
    );
  }
}
