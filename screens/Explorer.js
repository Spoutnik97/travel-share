import React, { Component } from 'react';
import { View, Picker, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { Button, TextInput, Title } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class Explorer extends Component {
  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = {
    title: 'Bienvenue sur Travel&Share',
    headerStyle: {
      backgroundColor: colors.primary,
      height: 38,
      verticalAlign: 'center',
    },
    headerTintColor: '#fff',
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Title>{'Quelques informations avant de partager'}</Title>
        <View style={styles.row}>
          <Icon
            name="airplanemode-active"
            size={32}
            color={colors.grey_dark}
            style={{ marginRight: 24 }}
          />
          <View style={styles.column}>
            <TextInput
              mode="flat"
              label="Où allez-vous aujourd'hui ?"
              placeholder="New York"
              value={this.state.where}
              style={styles.input}
              onChangeText={value => this.setState({ where: value })}
            />
          </View>
        </View>
        <View style={styles.row}>
          <Icon
            name="alarm"
            size={32}
            color={colors.grey_dark}
            style={{ marginRight: 24 }}
          />
          <View style={styles.column}>
            <TextInput
              mode="flat"
              label="Quand partez-vous ?"
              placeholder="2:30 pm"
              value={this.state.when ? this.state.when.toString() : null}
              style={styles.input}
              onFocus={() => {
                this.setState({ isDateTimePickerVisible: true });
              }}
            />
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              mode="datetime"
              onConfirm={date => {
                this.setState({ when: date });
              }}
              onCancel={() => {
                this.setState({ isDateTimePickerVisible: false });
              }}
            />
          </View>
        </View>
        <View style={styles.row}>
          <Icon
            name="person"
            size={32}
            color={colors.grey_dark}
            style={{ marginRight: 24 }}
          />
          <View style={styles.column}>
            <Picker
              mode="dropdown"
              selectedValue={this.state.travelerType}
              onValueChange={({ itemValue, itemPosition }) => {
                if (itemPosition !== 0)
                  this.setState({ travelerType: itemValue });
              }}
            >
              {[
                'Sélectionner un type de voyageur',
                'BackPacker',
                "Voyageur d'affaire",
                'Famille',
              ].map((item, itemIndex) => (
                <Picker.Item key={item} label={item} value={itemIndex} />
              ))}
            </Picker>
          </View>
        </View>
        <Button
          mode="contained"
          onPress={() => this.props.navigation.navigate('ShareWith')}
        >
          Rencontrer
        </Button>
      </View>
    );
  }
}
