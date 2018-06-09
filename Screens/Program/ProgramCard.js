import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from 'react-native';
import {
  Card
} from 'react-native-elements';

class ProgramCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0)
    };
  }
  componentWillReceiveProps(nextProps) {
    Animated.timing(
      this.state.opacity,
      {
        toValue: nextProps.fullScreenSlide ? 0 : 1,
        easing: Easing.bezier(0.55, 0, 0.1, 1),
        duration: 250
      }
    ).start();
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.toggleWeekActive}>
        <Animated.View style={{
          backgroundColor: 'blue',
          width: this.props.slideWidth,
          margin: this.props.slideMargin,
          flex: 1,
          borderRadius: this.props.slideRadius,
          padding: 10,
          display: 'flex'
        }}
        >
          <Animated.View style={{ flex: 1 }}>
            <Text>{`Week ${this.props.index + 1}`}</Text>
            <Text>{`Current Training: Day 1 of ${this.props.week.days.length}`}</Text>
          </Animated.View>
          <Animated.View style={{ flex: 4, opacity: this.state.opacity }}>
            {this.props.week.days.map((day, i) => {
              return (
                <Card key={i} style={{ padding: 10 }}>
                  <Text>{day.id}</Text>
                  {day.lifts.map((lift, x) => {
                    return (
                      <View key={x} style={{ paddingLeft: 10, paddingRight: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{lift.liftType}</Text>
                        <Text>{`${lift.repsAndSets.sets} x ${lift.repsAndSets.reps}`}</Text>
                      </View>
                    );
                  })}
                </Card>
              );
            })}
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ProgramCard;
