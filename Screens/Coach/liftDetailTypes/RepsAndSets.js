import React, { Component } from 'react';
import {
  View,
  Text,
  Picker
} from 'react-native';

class RepsAndSets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sets: 3,
      reps: 5
    };
  }

  updateState(sets, reps) {
    this.setState({
      sets: sets,
      reps: reps
    });
  }

  render() {
    const that = this;
    this.props.setSetsAndReps(Array(this.state.sets).fill().map(() => {
      return {
        reps: that.state.reps,
        completedReps: 0
      };
    }));
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: 'center' }}>Sets</Text>
          <Picker
            style={{ height: 90 }}
            itemStyle={{ height: 90 }}
            selectedValue={this.state.sets}
            onValueChange={itemValue => this.updateState(itemValue, this.state.reps)}
          >
            {Array(100).fill().map((x, i) => { return <Picker.Item key={i} label={`${i}`} value={i} />; })}
          </Picker>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: 'center' }}>Reps</Text>
          <Picker
            style={{ height: 90 }}
            itemStyle={{ height: 90 }}
            selectedValue={this.state.reps}
            onValueChange={itemValue => this.updateState(this.state.sets, itemValue)}
          >
            {Array(100).fill().map((x, i) => { return <Picker.Item key={i} label={`${i}`} value={i} />; })}
          </Picker>
        </View>
      </View>
    );
  }
}

export default RepsAndSets;
