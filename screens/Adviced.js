import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { Avatar, List, TextInput, Title } from 'react-native-paper';

import colors from '../styles/colors';
import styles from '../styles/styles';

const TEST_DATA = [
  {
    id: 'a',
    name: 'Bun restaurant',
    description: 'Super restaurant',
    type: 'restaurant',
    picture:
      'https://firebasestorage.googleapis.com/v0/b/travelshare-97.appspot.com/o/services%2Fbun.jpg?alt=media&token=c4ae4f0a-0fc5-4c50-a400-d477c9a137f2',
    likes: 0,
  },
  {
    id: 'b',
    name: 'Sushi Bar Yasuda',
    description: 'Restaurant de sushi',
    type: 'restaurant',
    picture:
      'https://firebasestorage.googleapis.com/v0/b/travelshare-97.appspot.com/o/services%2Fsushi.jpg?alt=media&token=34b30300-ca39-433a-a897-e649de16bd9d',
    likes: 0,
  },
];

export default class Adviced extends Component {
  static navigationOptions = {
    title: 'Recommandations',
  };

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      favorites: TEST_DATA,
    };
  }

  componentDidMount() {}

  render() {
    const { favorites } = this.state;
    return (
      <View style={{ margin: 12 }}>
        {favorites &&
          favorites.map(item => (
            <List.Item
              key={item.id}
              title={item.name}
              description={item.description}
              onPress={() =>
                this.props.navigation.navigate('serviceDetails', {
                  service: item,
                })
              }
              left={props => (
                <Image
                  source={{ uri: item.picture }}
                  style={{ width: 75, height: 75 }}
                />
              )}
            />
          ))}
      </View>
    );
  }
}
