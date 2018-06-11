import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { updateRepsAndSets } from '../../Redux/Actions';

class TrainingSessionSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completedReps: 0,
      reps: props.reps,
      completedSet: false
    };
    this.reps = props.reps;
    this.increaseReps = this.increaseReps.bind(this);
  }
  componentDidMount() {
    const completedReps = this.state.reps.filter(rep => rep.completed);
    const state = {
      completedReps: completedReps.length
    };
    if (completedReps.length === this.state.reps.length) {
      state.completedSet = true;
    }
    this.setState(state);
  }
  increaseReps() {
    const { programId, weekId, dayId, liftId, setId } = this.props;
    if (this.state.completedReps === this.state.reps.length) {
      // RESET EVERYTHING -- this isnt working
      this.setState({
        completedReps: 0,
        reps: this.reps,
        completedSet: false
      });
      this.props.updateRepsAndSets(programId, weekId, dayId, liftId, setId, this.reps);
      return;
    }
    const completedReps = this.state.completedReps + 1;
    const { reps } = this;
    reps[completedReps - 1].completed = true;
    const state = {
      completedReps: completedReps,
      reps: reps
    };
    if (completedReps === this.state.reps.length) {
      state.completedSet = true;
    }

    this.props.updateRepsAndSets(programId, weekId, dayId, liftId, setId, reps);
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
          <Text>{this.state.completedReps}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  updateRepsAndSets
})(TrainingSessionSet);
