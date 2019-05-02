import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text, View } from 'react-native';

import colors from '../styles/colors';
import styles from '../styles/styles';

export default class ProgressBar extends Component {
  static propTypes = {
    progress: PropTypes.number.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { progress } = this.props;
    return (
      <View style={styles.row}>
        {[20, 40, 60, 80, 100].map(percentage => {
          <View
            style={[
              styles.progressBarDiv,
              {
                backgroundColor:
                  progress >= percentage ? colors.primary : colors.grey_light,
              },
            ]}
          />;
        })}
      </View>
    );
  }
}
