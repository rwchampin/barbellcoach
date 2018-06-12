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
import firebase from 'react-native-firebase';
import { removeDay, addLift } from '../../Redux/Actions';
import Lift from './Lift';

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lifts: []
    };
    this.addLift = this.addLift.bind(this);
    this.buildLifts = this.buildLifts.bind(this);
  }

  addLift() {
    this.props.navigation.navigate('ChooseLiftModal', {
      dayId: this.props.dayId,
      buildLifts: this.buildLifts
    });
  }

  buildLifts(lifts) {
    const builtLifts = lifts.map((lift, i) => {
      return (
        <Lift
          key={i}
          lift={lift}
        />
      );
    });
    this.setState({
      lifts: builtLifts
    });
  }

  render() {
    return (
      <View>
        <Card>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>
              {`Day ${this.props.dayNumber + 1}`}
              <TouchableOpacity>
                <Text>Remove</Text>
              </TouchableOpacity>
            </Text>
            <TouchableOpacity onPress={this.addLift}>
              <Text>Add Lift</Text>
            </TouchableOpacity>
          </View>
          <List>
            {this.state.lifts}
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
