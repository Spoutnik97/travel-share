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
    resume:
      '45 ans - Voyage Aventure En partance pour Hanoï Disponible jusqu’à 22h',
  },
  {
    picture: '../assets/test/pp.jpg',
    given_name: 'Adeline',
    resume:
      '45 ans - Voyage Aventure En partance pour Hanoï Disponible jusqu’à 22h',
  },
  {
    picture: '../assets/test/pp.jpg',
    given_name: 'Clara',
    resume:
      '45 ans - Voyage Aventure En partance pour Hanoï Disponible jusqu’à 22h',
  },
];

export default class ShareWithScreen extends Component {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = ({ navigationOptions }) => ({
    title: 'Partager avec...',
    ...navigationOptions,
  });

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
              content={item.resume}
              onPress={() => {
                this.props.navigation.navigate('shareWithProfil', {
                  user: item,
                });
              }}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
