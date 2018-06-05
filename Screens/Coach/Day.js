import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import {
  Card,
  List
} from 'react-native-elements';
import uuid from 'uuid/v1';
import { removeDay, addLift } from '../../Redux/Actions';
import Lift from './Lift';

class Day extends Component {
  constructor(props) {
    super(props);
    this.removeDay = this.removeDay.bind(this);
    this.addLift = this.addLift.bind(this);
    this.buildLifts = this.buildLifts.bind(this);
  }

  removeDay() {
    this.props.removeDay(this.props.programId, this.props.dayId, this.props.weekId);
  }

  addLift() {
    const lift = {
      id: uuid()
    };
    this.props.addLift(this.props.weekId, this.props.dayId, lift, this.props.programId);
    this.props.navigation.navigate('ChooseLiftModal', {
      programId: this.props.programId,
      weekId: this.props.weekId,
      dayId: this.props.dayId,
      lift: lift
    });
  }

  buildLifts() {
    const lifts = this.props.lifts.map((lift, i) => {
      return (
        <Lift
          programId={this.props.programId}
          key={i}
          lift={lift}
          weekId={this.props.weekId}
          dayId={this.props.dayId}
        />
      );
    });
    return lifts;
  }

  render() {
    const lifts = this.buildLifts();
    return (
      <View>
        <Card>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>
              {`Day ${this.props.dayNumber + 1}`}
              <TouchableOpacity onPress={this.removeDay}>
                <Text>Remove</Text>
              </TouchableOpacity>
            </Text>
            <TouchableOpacity onPress={this.addLift}>
              <Text>Add Lift</Text>
            </TouchableOpacity>
          </View>
          <List>
            {lifts}
          </List>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  removeDay,
  addLift
})(Day);
