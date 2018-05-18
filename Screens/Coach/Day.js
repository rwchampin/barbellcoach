import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {
  Card
} from 'react-native-elements';

class Day extends Component {
  render() {
    return (
      <Card title={`Day ${this.props.dayNumber}`} />
    );
  }
}
export default Day;
