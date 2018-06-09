import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import {
  Card,
  Divider
} from 'react-native-elements';
import TrainingSessionSet from './TrainingSessionSet';

class TrainingSessionLift extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card title={this.props.lift.liftType}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {this.state.sets.map((set) => {
            return (
              <TrainingSessionSet reps={this.state.reps} />
            );
          })}
        </View>
      </Card>
    );
  }
}
export default TrainingSessionLift;
