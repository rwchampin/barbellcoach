import React, { Component } from 'react';
import {
  View
} from 'react-native';
import firebase from 'react-native-firebase';
import _ from 'lodash';
import TrainingSessionLift from './TrainingSessionLift';

class TrainingDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lifts: []
    };
  }
  componentDidMount() {
    const that = this;
    const { day } = that.props.navigation.state.params;
    const doc = firebase.firestore().collection('programLift').where('dayId', '==', day.id);
    doc.onSnapshot((querySnapshot) => {
      const lifts = [];
      querySnapshot.forEach((snapshot) => {
        lifts.push(snapshot.data());
      });
      const sorted = _.orderBy(lifts, ['created'], ['asc']);
      that.setState({
        lifts: sorted
      });
    });
  }
  render() {
    return (
      <View>
        {this.state.lifts.map((lift, i) => {
          return (
            <TrainingSessionLift
              key={i}
              lift={lift}
            />
          );
        })}
      </View>
    );
  }
}
export default TrainingDay;
