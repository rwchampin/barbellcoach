import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
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
    this.days = 0;
    this.addDay = this.addDay.bind(this);
    this.removeWeek = this.removeWeek.bind(this);
    this.buildDays = this.buildDays.bind(this);
  }

  componentDidMount() {
    const doc = firebase.firestore().collection('programDay').where('weekId', '==', this.props.id);
    doc.onSnapshot((querySnapshot) => {
      const days = [];
      querySnapshot.forEach((snapshot) => {
        days.push(snapshot.data());
      });
      this.setState({
        days: _.orderBy(days, ['created'], ['asc'])
      });
    });
  }

  addDay() {
    this.days = this.days + 1;
    const newDay = {
      created: firebase.firestore.FieldValue.serverTimestamp(),
      weekId: this.props.id,
      type: 'day',
      count: this.days
    };

    const dayRef = firebase.firestore().collection('programDay').doc();
    newDay.id = dayRef.id;
    dayRef.set(newDay);
  }

  removeWeek() {
    firebase.firestore().collection('programWeek').doc(this.props.id).delete();
  }

  buildDays() {
    const days = this.state.days.map((day, i) => {
      return (
        <Day
          dayId={day.id}
          navigation={this.props.navigation}
          key={i}
          dayNumber={i}
          count={day.count}
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
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>\
          <Text>{this.props.weekId}</Text>
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
