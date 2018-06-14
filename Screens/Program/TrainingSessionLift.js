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
    this.isLiftCompleted = this.isLiftCompleted.bind(this);
    this.updateSetsAndReps = this.updateSetsAndReps.bind(this);
  }
  updateSetsAndReps(index) {
    const setsAndReps = this.state.setsAndReps.map((set, i) => {
      const completedReps = set.completedReps + 1 > set.reps ? 0 : set.completedReps + 1;
      const fullSetCompleted = set.completedReps + 1 === set.reps;
      if (i !== index) {
        return set;
      }
      return {
        completedReps: completedReps,
        reps: set.reps,
        fullSetCompleted: fullSetCompleted
      };
    });

    firebase.firestore().collection('programLift').doc(this.props.lift.id).update({
      setsAndReps: setsAndReps
    });
    this.setState({
      setsAndReps: setsAndReps
    });
  }
  isLiftCompleted() {
    let completedSets = 0;
    this.state.setsAndReps.map((set) => {
      if (set.completedReps > 0) {
        completedSets += 1;
      }
      return true;
    });
    const liftCompleted = completedSets === this.props.lift.setsAndReps.length;
    firebase.firestore().collection('programLift').doc(this.props.lift.id).update({
      liftCompleted: liftCompleted
    });
    return liftCompleted;
  }
  render() {
    const completedLift = this.isLiftCompleted() ? ' - completed' : '';
    return (
      <Card title={`${this.props.lift.liftType}${completedLift}`}>
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
