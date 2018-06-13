import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  Card
} from 'react-native-elements';
import _ from 'lodash';
import firebase from 'react-native-firebase';

class DayCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lifts: []
    };
  }
  componentDidMount() {
    const that = this;
    const doc = firebase.firestore().collection('programLift').where('dayId', '==', this.props.day.id);
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
      <TouchableOpacity
        onPress={() => {
        this.props.navigation.navigate('TrainingDay', {
          day: this.props.day
        });
      }}
      >
        <Card style={{ padding: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>{`Day ${this.props.dayCount + 1}`}</Text>
          {this.state.lifts.map((lift, x) => {
            return (
              <View key={x} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{lift.liftType}</Text>
                <Text>{`${lift.setsAndReps.length} x ${lift.setsAndReps[0].reps}`}</Text>
              </View>
            );
          })}
        </Card>
      </TouchableOpacity>
    );
  }
}

export default DayCard;
