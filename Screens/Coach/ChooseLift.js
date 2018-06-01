import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  List, ListItem
} from 'react-native-elements';

class ChooseLift extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lifts: ["Squat", "Deadlift", "Bench", "OH Press"]
    };
  }
  render() {
    const that = this;
    return (
      <View style={{ paddingTop: 50 }}>
        <View>
          <List>
            {this.state.lifts.map((lift, i) => {
              const { addLift, weekId, dayId } = this.props.navigation.state.params;
              return (
                <ListItem
                  hideChevron
                  key={i}
                  title={lift}
                  onPress={() => {
                    this.props.navigation.navigate('LiftDetail', {
                      lift: lift,
                      addLift: () => {
                        addLift(weekId, dayId, lift);
                        that.props.navigation.goBack(null);
                      }
                    });
                  }}
                />
              );
            })}
          </List>
        </View>
      </View>
    );
  }
}

export default ChooseLift;
