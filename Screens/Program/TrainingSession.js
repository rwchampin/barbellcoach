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
    const that = this;
    return (
      <View>
        {this.props.navigation.state.params.trainingSession.lifts.map((lift) => {
          return (
            <TrainingSessionLift
              lift={lift}
              programId={that.props.navigation.state.params.programId}
              weekId={that.props.navigation.state.params.weekId}
              dayId={that.props.navigation.state.params.trainingSession.id}
              liftId={lift.id}
            />
          );
        })}
      </View>
    );
  }
}
export default TrainingSession;
