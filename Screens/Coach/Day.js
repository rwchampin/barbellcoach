import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {
  Card,
  Overlay
} from 'react-native-elements';

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addLiftModalOpen: false
    };
    this.addLift = this.addLift.bind(this);
  }
  addLift() {
    this.setState({
      addLiftModalOpen: true
    });
  }
  render() {
    return (
      <View>
        <Card>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{`Day ${this.props.dayNumber}`}</Text>
            <TouchableOpacity onPress={this.addLift}>
              <Text>Add Lift</Text>
            </TouchableOpacity>
          </View>
        </Card>
        <Overlay
          isVisible={false}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="red"
          width="auto"
          height="auto"
        >
          <Text>Hello from Overlay!</Text>
        </Overlay>
      </View>
    );
  }
}
export default Day;
