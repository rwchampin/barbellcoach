import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { removeLift } from '../../Redux/Actions';

class Lift extends Component {
  constructor(props) {
    super(props);
    this.removeLift = this.removeLift.bind(this);
  }

  removeLift() {
    this.props.removeLift(this.props.programId, this.props.weekId, this.props.dayId, this.props.lift.id);
  }

  render() {
    if (!this.props.lift.repsAndSets) {
      return <View />;
    }
    const repsAndSets = <Text style={{ fontWeight: 'bold' }}>{this.props.lift.repsAndSets.sets} x {this.props.lift.repsAndSets.reps}</Text>;
    return (
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: 'bold' }}>
          {this.props.lift.liftType}
          <TouchableOpacity onPress={this.removeLift}>
            <Text>Remove</Text>
          </TouchableOpacity>
        </Text>
        {repsAndSets}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  removeLift
})(Lift);
