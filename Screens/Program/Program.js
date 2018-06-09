import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
  StyleSheet
} from 'react-native';
import Carousel from 'react-native-snap-carousel';


class Program extends Component {
  static navigationOptions() {
    return ({
      headerTitle: 'Program'
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      activeWeek: 0,
      fullScreenSlide: false,
      slideHeight: new Animated.Value(300),
      slideWidth: new Animated.Value(Dimensions.get('window').width - 20),
      slideMargin: new Animated.Value(10),
      slideRadius: new Animated.Value(10),
      topHeight: new Animated.Value(1)
    };
    this.renderItems = this.renderItems.bind(this);
    this.toggleWeekActive = this.toggleWeekActive.bind(this);
  }

  toggleWeekActive() {
    Animated.parallel([
      Animated.timing(
        this.state.topHeight,
        {
          toValue: !this.state.fullScreenSlide ? 0 : 1,
          easing: Easing.bezier(0.55, 0, 0.1, 1),
          duration: 300
        }
      ),
      Animated.timing(
        this.state.slideHeight,
        {
          toValue: this.state.fullScreenSlide ? 300 : Dimensions.get('window').height,
          easing: Easing.bezier(0.55, 0, 0.1, 1),
          duration: 300
        }
      ),
      Animated.timing(
        this.state.slideWidth,
        {
          toValue: this.state.fullScreenSlide ? Dimensions.get('window').width - 20 : Dimensions.get('window').width,
          easing: Easing.bezier(0.55, 0, 0.1, 1),
          duration: 300
        }
      ),
      Animated.timing(
        this.state.slideMargin,
        {
          toValue: this.state.fullScreenSlide ? 10 : 0,
          easing: Easing.bezier(0.55, 0, 0.1, 1),
          duration: 300
        }
      ),
      Animated.timing(
        this.state.slideRadius,
        {
          toValue: this.state.fullScreenSlide ? 10 : 0,
          easing: Easing.bezier(0.55, 0, 0.1, 1),
          duration: 300
        }
      )
    ]).start();
    this.setState({
      fullScreenSlide: !this.state.fullScreenSlide
    });
  }

  renderItems() {
    const that = this;
    const { program } = this.props.navigation.state.params.program;
    return program.map((week) => {
      return (
        <TouchableWithoutFeedback onPress={this.toggleWeekActive}>
          <Animated.View style={{
            backgroundColor: 'blue',
            width: that.state.slideWidth,
            margin: this.state.slideMargin,
            height: that.state.slideHeight,
            borderRadius: this.state.slideRadius
          }}
          >
            <Text>{ week.id }</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    });
  }

  render() {
    const weeks = this.renderItems();
    return (
      <View style={{ backgroundColor: 'red', display: 'flex', height: '100%', flexDirection: 'column' }}>
        <Animated.View style={{ backgroundColor: 'orange', flex: this.state.topHeight }} />
        <Animated.ScrollView
          ref={(scrollView) => { this.scrollView = scrollView; }}
          horizontal
          scrollEnabled={!this.state.fullScreenSlide}
          decelerationRate={0}
          snapToInterval={Dimensions.get('window').width}
          snapToAlignment={'center'}
        >
          {weeks}
        </Animated.ScrollView>
      </View>
    );
  }
}

export default Program;
