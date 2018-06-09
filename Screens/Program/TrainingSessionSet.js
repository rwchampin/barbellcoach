import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  Card,
  Divider
} from 'react-native-elements';

class TrainingSessionSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repCount: 0,
      maxRepCount: props.reps.length,
      completedSet: false
    };
    this.increaseReps = this.increaseReps.bind(this);
  }
  increaseReps() {
    if (this.state.repCount === this.state.maxRepCount) {
      return;
    }
    const reps = this.state.repCount + 1;
    const state = {
      repCount: reps
    };
    if (reps === this.state.maxRepCount) {
      state.completedSet = true;
    }
    this.setState(state);
  }
  render() {
    return (
      <TouchableOpacity onPress={this.increaseReps}>
        <View
          style={{ display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          width: 50,
          borderRadius: 25,
          borderWidth: 2,
          borderColor: 'black',
          backgroundColor: this.state.completedSet ? 'green' : 'white'
        }}
        >
          <Text>{this.state.repCount}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default TrainingSessionSet;
