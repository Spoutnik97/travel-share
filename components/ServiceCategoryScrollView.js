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
            <Card key={item.name} style={styles.card}>
              <Card.Cover
                source={item.picture ? { uri: item.picture } : null}
                resizeMode="center"
                style={{
                  width: 175,
                  height: 90,
                  borderTopRightRadius: 12,
                  borderTopLeftRadius: 12,
                }}
              />
              <Card.Content>
                <Title numberOfLines={1} ellipsizeMode="tail">
                  {item.name}
                </Title>
                <Paragraph numberOfLines={2} ellipsizeMode="tail">
                  {item.description}
                </Paragraph>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>
    );
  }
}
