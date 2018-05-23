import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {
  Card
} from 'react-native-elements';

class Day extends Component {
  constructor(props) {
    super(props);
    this.buildLifts = this.buildLifts.bind(this);
  }

  buildLifts() {
    const lifts = this.props.lifts.map((lift, i) => {
      return <Text style={{ fontWeight: 'bold' }} key={i}>{lift.lift}</Text>;
    });
    return lifts;
  }

  render() {
    const lifts = this.buildLifts();
    return (
      <View>
        <Card>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{`Day ${this.props.dayNumber + 1}`}</Text>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('ChooseLiftModal', {
                addLift: this.props.addLift,
                weekId: this.props.weekId,
                dayId: this.props.dayId
              });
            }}
            >
              <Text>Add Lift</Text>
            </TouchableOpacity>
          </View>
          <View>
            {lifts}
          </View>
        </Card>
      </View>
    );
  }
}

export default Day;
