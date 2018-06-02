import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import {
  Card
} from 'react-native-elements';
import Day from './Day';
import { addDay, removeWeek } from '../../Redux/Actions';


class Week extends Component {
  constructor(props) {
    super(props);
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
    this.props.addDay(day, this.props.weekId, this.props.programId);
  }

  removeWeek() {
    this.props.removeWeek(this.props.weekId, this.props.programId);
  }

  buildDays() {
    const days = this.props.days.map((day, i) => {
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
    const days = this.props.days.length ? this.buildDays() : <Text>Add a day</Text>;
    const addDayBtn = this.props.days.length < 7 ? (
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
