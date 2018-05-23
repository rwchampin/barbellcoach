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
    return (
      <View style={{ paddingTop: 50 }}>
        <View>
          <List>
            {this.state.lifts.map((lift, i) => {
              return <ListItem key={i} title={lift} onPress={() => { this.props.navigation.navigate('LiftDetails'); }} />;
            })}
          </List>
        </View>
      </View>
    );
  }
}

export default ChooseLift;
