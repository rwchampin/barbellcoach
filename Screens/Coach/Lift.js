import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { removeLift } from '../../Redux/Actions';

class Lift extends Component {
  constructor(props) {
    super(props);
    this.removeLift = this.removeLift.bind(this);
  }
  removeLift() {
    firebase.firestore().collection('programLift').doc(this.props.lift.id).delete();
  }
  render() {
    return (
      <ListItem
        title={this.props.lift.liftType}
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
        rightIcon={<Text>{this.props.lift.setsAndReps.length} x {this.props.lift.setsAndReps[0].reps}</Text>}
        subtitle={
          <Text style={{ fontWeight: 'bold' }}>
            <TouchableOpacity onPress={this.removeLift}>
              <Text>Remove</Text>
            </TouchableOpacity>
          </Text>}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  removeLift
})(Lift);
