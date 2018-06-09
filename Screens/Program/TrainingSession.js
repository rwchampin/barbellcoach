import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Card
} from 'react-native-elements';
import TrainingSessionLift from './TrainingSessionLift';

class TrainingSession extends Component {
  render() {
    return (
      <View>
        {this.props.navigation.state.params.trainingSession.lifts.map((lift) => {
          return (
            <TrainingSessionLift
              lift={lift}
            />
          );
        })}
      </View>
    );
  }
}
export default TrainingSession;
