import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import _ from 'lodash';
import {
  Card
} from 'react-native-elements';
import firebase from 'react-native-firebase';
import Day from './Day';
import { addDay, removeWeek } from '../../Redux/Actions';

class Week extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'days': []
    };
    this.addDay = this.addDay.bind(this);
    this.removeWeek = this.removeWeek.bind(this);
    this.buildDays = this.buildDays.bind(this);
  }

  addDay() {
    const day = {
      type: 'day',
      lifts: [],
      id: uuid()
    };
    const dayObj = {};
    dayObj[day.id] = day;
    firebase.firestore().collection('programDay').doc(this.props.weekId).set(dayObj, {
      merge: true
    });

    const weekDays = {};
    const dayUpdate = {};
    dayUpdate[`${day.id}`] = true;
    weekDays[`${this.props.weekId}.days.${day.id}`] = dayUpdate;
    firebase.firestore().collection('programWeek').doc(this.props.programId).update(weekDays);

    const doc = firebase.firestore().collection('programDay').doc(this.props.weekId);
    doc.onSnapshot((snapshot) => {
      this.setState({
        days: _.values(snapshot.data())
      });
    });
  }

  removeWeek() {
    this.props.removeWeek(this.props.weekId, this.props.programId);
  }

  buildDays() {
    const days = this.state.days.map((day, i) => {
      return (
        <Day
          programId={this.props.programId}
          navigation={this.props.navigation}
          key={i}
          dayNumber={i}
          dayId={day.id}
          weekId={this.props.weekId}
          lifts={day.lifts}
        />
      );
    });
    return days;
  }

  render() {
    const days = this.state.days.length ? this.buildDays() : <View style={{
      borderColor: 'black',
      borderWidth: 1,
      borderStyle: 'dashed',
      flex: 1,
      margin: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }}
    ><Text>Add a day</Text></View>;
    const addDayBtn = this.state.days.length < 7 ? (
      <TouchableOpacity onPress={this.addDay}><Text>Add Day</Text></TouchableOpacity>
    ) : null;
    return (
      <Card>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold' }}>
            {`Week ${this.props.weekCount + 1}`}
            <TouchableOpacity onPress={this.removeWeek}>
              <Text>Remove</Text>
            </TouchableOpacity>
          </Text>
          {addDayBtn}
        </View>
        {days}
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  addDay,
  removeWeek
})(Week);
