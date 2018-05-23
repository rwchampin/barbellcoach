import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {
  Card
} from 'react-native-elements';
import Day from './Day';

class Week extends Component {
  constructor(props) {
    super(props);
    this.buildDays = this.buildDays.bind(this);
  }

  buildDays() {
    const days = this.props.days.map((day, i) => {
      return (
        <Day
          navigation={this.props.navigation}
          key={i}
          dayNumber={i}
          dayId={day.id}
          weekId={this.props.weekId}
          addLift={this.props.addLift}
          lifts={day.lifts}
        />
      );
    });
    return days;
  }

  render() {
    const days = this.props.days.length ? this.buildDays() : <Text>Add a day</Text>;
    return (
      <Card>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold' }}>{`Week ${this.props.weekCount + 1}`}</Text>
          <TouchableOpacity onPress={() => { this.props.addDay(this.props.weekId); }}><Text>Add Day</Text></TouchableOpacity>
        </View>
        {days}
      </Card>
    );
  }
}

export default Week;
