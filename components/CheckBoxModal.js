import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, ScrollView, Text, View } from 'react-native';
import { Button, Checkbox, List, Subheading } from 'react-native-paper';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class CheckBoxModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    values: PropTypes.array.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    labels: PropTypes.array,
  };

  static defaultProps = {
    labels: this.props.values,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  handleConfirm = () => {
    let confirmList = [];
    this.props.values.forEach(value => {
      if (this.state[value]) {
        confirmList.push(value);
      }
    });

    this.props.onConfirm(confirmList);
  };

  componentDidMount() {}

  render() {
    const { visible, values, labels } = this.props;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
          onRequestClose={this.props.onRequestClose}
        >
          <View style={styles.container}>
            <ScrollView>
              {values.map((value, index) => (
                <List.Item
                  key={value}
                  title={labels[index]}
                  onPress={() => {
                    this.setState(prev => ({ [value]: !prev[value] }));
                  }}
                  left={() => (
                    <Checkbox
                      status={this.state[value] ? 'checked' : 'unchecked'}
                    />
                  )}
                />
              ))}
            </ScrollView>
            <Button onPress={this.handleConfirm}>Valider</Button>
          </View>
        </Modal>
      </View>
    );
  }
}
