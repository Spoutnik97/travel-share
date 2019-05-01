import React, { Component } from 'react';
import {
  View,
  Picker,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { TextInput, Title } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { CardPeople } from '../components/rn-travel-share';

import colors from '../styles/colors';
import styles from '../styles/styles';

const TEST_DATA = [
  {
    picture: '../assets/test/pp.jpg',
    given_name: 'Florence',
    description:
      '45 ans - Voyage Aventure En partance pour Hanoï Disponible jusqu’à 22h',
  },
  {
    picture: '../assets/test/pp.jpg',
    given_name: 'Adeline',
    description:
      '45 ans - Voyage Aventure En partance pour Hanoï Disponible jusqu’à 22h',
  },
  {
    picture: '../assets/test/pp.jpg',
    given_name: 'Clara',
    description:
      '45 ans - Voyage Aventure En partance pour Hanoï Disponible jusqu’à 22h',
  },
];

export default class ShareWithScreen extends Component {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = {
    title: 'Partager avec ...',
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {TEST_DATA.map(item => (
            <CardPeople
              key={item.given_name}
              picture={item.picture}
              header={item.given_name}
              content={item.description}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
