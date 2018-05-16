import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  Button
} from 'react-native-elements';

class Programs extends Component {
  render() {
    return (
      <View>
        <Button title="Add Program" />
        <Text>Programs</Text>
      </View>
    );
  }
}

export default Programs;
