import React, { Component } from 'react';
import {
  View,
  Text,
  Picker
} from 'react-native';
import uuid from 'uuid/v1';

class RepsAndSets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sets: 3,
      reps: 5
    };
    this.buildRepsAndSets = this.buildRepsAndSets.bind(this);
  }

  buildRepsAndSets() {
    const reps = [...Array(this.state.reps).keys()].map(() => {
      return {
        completed: false,
        id: uuid()
      };
    });

    const sets = [...Array(this.state.sets).keys()].map(() => {
      return {
        completed: false,
        reps: reps,
        rpe: 5,
        id: uuid()
      };
    });
    this.props.setRepsAndSets(sets);
  }

  render() {
    this.buildRepsAndSets();
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: 'center' }}>Sets</Text>
          <Picker
            style={{ height: 90 }}
            itemStyle={{ height: 90 }}
            selectedValue={this.state.sets}
            onValueChange={itemValue => this.setState({ sets: itemValue })}
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
            onValueChange={itemValue => this.setState({ reps: itemValue })}
          >
            {Array(100).fill().map((x, i) => { return <Picker.Item key={i} label={`${i}`} value={i} />; })}
          </Picker>
        </View>
      </View>
    );
  }
}

export default RepsAndSets;
