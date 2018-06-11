import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Card
} from 'react-native-elements';
import TrainingSessionSet from './TrainingSessionSet';

class TrainingSessionLift extends Component {
  render() {
    const that = this;
    return (
      <Card title={this.props.lift.liftType}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {this.props.lift.repsAndSets.map((set) => {
            return (
              <TrainingSessionSet
                reps={set.reps}
                programId={that.props.programId}
                weekId={that.props.weekId}
                dayId={that.props.dayId}
                liftId={that.props.liftId}
                setId={set.id}
              />
            );
          })}
        </View>
      </Card>
    );
  }
}
export default TrainingSessionLift;
