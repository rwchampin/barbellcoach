import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { removeLift } from '../../Redux/Actions';

class Lift extends Component {
  constructor(props) {
    super(props);
    this.removeLift = this.removeLift.bind(this);
  }

  removeLift() {
    this.props.removeLift(
      this.props.programId,
      this.props.weekId,
      this.props.dayId,
      this.props.lift.id
    );
  }

  render() {
    if (!this.props.lift.repsAndSets) {
      return <View />;
    }
    const repsAndSets = <Text style={{ fontWeight: 'bold' }}>{this.props.lift.repsAndSets.length} x {this.props.lift.repsAndSets[0].reps.length}</Text>;
    return (
      <ListItem
        title={this.props.lift.liftType}
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
        rightIcon={<Text>{repsAndSets}</Text>}
      >
        <Text style={{ fontWeight: 'bold' }}>
          <TouchableOpacity onPress={this.removeLift}>
            <Text>Remove</Text>
          </TouchableOpacity>
        </Text>

      </ListItem>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  removeLift
})(Lift);
