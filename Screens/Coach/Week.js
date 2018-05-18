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
  static uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      days: []
    };
    this.addDay = this.addDay.bind(this);
  }

  addDay() {
    this.setState({
      days: [
        ...this.state.days,
        <Day dayNumber={this.state.days.length + 1} />
      ]
    });
  }

  buildDays() {
    const days = this.state.map((day) => {
      return day
    });
    return days;
  }

  render() {
    const days = this.state.days.length ? this.state.days : <Text>Add a day</Text>;
    return (
      <Card>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold' }}>{`Week ${this.props.weekNumber + 1}`}</Text>
          <TouchableOpacity onPress={this.addDay}><Text>Add Day</Text></TouchableOpacity>
        </View>
        {days}
      </Card>
    );
  }
}
export default Week;
