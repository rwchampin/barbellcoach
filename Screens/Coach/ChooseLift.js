import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  List, ListItem
} from 'react-native-elements';

class ChooseLift extends Component {
  static navigationOptions() {
    const headerTitle = 'Clients';
    return ({ headerTitle: headerTitle });
  }
  constructor(props) {
    super(props);
    this.state = {
      liftTypes: ['Squat', 'Deadlift', 'Bench', 'OH Press']
    };
  }
  render() {
    const { programId, weekId, dayId, lift } = this.props.navigation.state.params;
    return (
      <View style={{ paddingTop: 50 }}>
        <View>
          <List>
            {this.state.liftTypes.map((liftType, i) => {
              return (
                <ListItem
                  hideChevron
                  key={i}
                  title={liftType}
                  onPress={() => {
                    lift.liftType = liftType;
                    this.props.navigation.navigate('LiftDetail', {
                      programId: programId,
                      weekId: weekId,
                      dayId: dayId,
                      lift: lift
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
