import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';
import {
  Card,
  Icon
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
    const that = this;
    return (
      <Animated.ScrollView style={{
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
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{`Week ${this.props.index + 1}`}</Text>
            <TouchableOpacity onPress={this.props.toggleWeekActive}>
              <Icon name="plus" type="entypo" size={30} color={'#000000'} />
            </TouchableOpacity>
          </View>
          <Text>{`Current Training: Day 1 of ${this.props.week.days.length}`}</Text>
        </Animated.View>
        <Animated.View style={{ flex: 4, opacity: this.state.opacity }}>
          {this.props.week.days.map((day, i) => {
            return (
              <TouchableOpacity onPress={() => {
                that.props.navigation.navigate('TrainingSession', {
                  trainingSession: day
                });
              }}
              >
                <Card key={i} style={{ padding: 10 }}>
                  <Text style={{ fontWeight: 'bold' }}>{`Day ${i + 1}`}</Text>
                  {day.lifts.map((lift, x) => {
                    return (
                      <View key={x} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{lift.liftType}</Text>
                        <Text>{`${lift.repsAndSets.length} x ${lift.repsAndSets[0].reps.length}`}</Text>
                      </View>
                    );
                  })}
                </Card>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </Animated.ScrollView>
    );
  }
}

export default ProgramCard;
