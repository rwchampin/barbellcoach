import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Card
} from 'react-native-elements';
import firebase from 'react-native-firebase';
import TrainingSessionSet from './TrainingSessionSet';

class TrainingSessionLift extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setsAndReps: props.lift.setsAndReps
    };
    this.updateSetsAndReps = this.updateSetsAndReps.bind(this);
  }
  updateSetsAndReps(index) {
    const setsAndReps = this.state.setsAndReps.map((set, i) => {
      if (i !== index) {
        return set;
      }
      const completedReps = set.completedReps + 1 > set.reps ? 0 : set.completedReps + 1;
      return {
        completedReps: completedReps,
        reps: set.reps
      };
    });
    firebase.firestore().collection('programLift').doc(this.props.lift.id).update({
      setsAndReps: setsAndReps
    });
    this.setState({
      setsAndReps: setsAndReps
    });
  }
  render() {
    return (
      <Card title={this.props.lift.liftType}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {this.state.setsAndReps.map((set, i) => {
            return (
              <TrainingSessionSet
                set={set}
                index={i}
                updateSetsAndReps={this.updateSetsAndReps}
              />
            );
          })}
        </View>
      </Card>
    );
  }
}
export default TrainingSessionLift;
