import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';
import firebase from 'react-native-firebase';
import _ from 'lodash';
import {
  Icon
} from 'react-native-elements';
import DayCard from './DayCard';

class ProgramCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      opacity: new Animated.Value(0)
    };
  }

  componentDidMount() {
    const that = this;
    const doc = firebase.firestore().collection('programDay').where('weekId', '==', this.props.week.id);
    doc.onSnapshot((querySnapshot) => {
      const days = [];
      querySnapshot.forEach((snapshot) => {
        days.push(snapshot.data());
      });
      const sorted = _.orderBy(days, ['created'], ['asc']);
      that.setState({
        days: sorted
      });
    });
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
          <Text>{`Current Training: Day 1 of ${this.state.days.length}`}</Text>
        </Animated.View>
        <Animated.View style={{ flex: 4, opacity: this.state.opacity }}>
          {this.state.days.map((day, i) => {
            return (
              <DayCard
                key={i}
                navigation={this.props.navigation}
                day={day}
                dayCount={i}
              />
            );
          })}
        </Animated.View>
      </Animated.ScrollView>
    );
  }
}

export default ProgramCard;
