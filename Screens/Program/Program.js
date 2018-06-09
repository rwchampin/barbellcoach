import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import ProgramCard from './ProgramCard';

class Program extends Component {
  static navigationOptions() {
    return ({
      headerTitle: 'Program'
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      fullScreenSlide: false,
      slideWidth: new Animated.Value(Dimensions.get('window').width - 20),
      slideMargin: new Animated.Value(10),
      slideRadius: new Animated.Value(10),
      topHeight: new Animated.Value(1),
      programSectionHeight: new Animated.Value(0),
      ryan: new Animated.Value(300)
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
          duration: 250
        }
      ),
      Animated.timing(
        this.state.slideWidth,
        {
          toValue: this.state.fullScreenSlide ? Dimensions.get('window').width - 20 : Dimensions.get('window').width,
          easing: Easing.bezier(0.55, 0, 0.1, 1),
          duration: 250
        }
      ),
      Animated.timing(
        this.state.slideMargin,
        {
          toValue: this.state.fullScreenSlide ? 10 : 0,
          easing: Easing.bezier(0.55, 0, 0.1, 1),
          duration: 250
        }
      ),
      Animated.timing(
        this.state.slideRadius,
        {
          toValue: this.state.fullScreenSlide ? 10 : 0,
          easing: Easing.bezier(0.55, 0, 0.1, 1),
          duration: 250
        }
      ),
      Animated.timing(
        this.state.ryan,
        {
          toValue: this.state.fullScreenSlide ? 300 : 0,
          easing: Easing.bezier(0.55, 0, 0.1, 1),
          duration: 250
        }
      ),
      Animated.timing(
        this.state.programSectionHeight,
        {
          toValue: this.state.fullScreenSlide ? 0 : 1,
          easing: Easing.bezier(0.55, 0, 0.1, 1),
          duration: 250
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
    return program.map((week, i) => {
      return (
        <ProgramCard
          key={i}
          slideWidth={that.state.slideWidth}
          slideMargin={that.state.slideMargin}
          slideHeight={that.state.slideHeight}
          slideRadius={that.state.slideRadius}
          fullScreenSlide={!this.state.fullScreenSlide}
          index={i}
          week={week}
          toggleWeekActive={that.toggleWeekActive}
          navigation={this.props.navigation}
        />
      );
    });
  }

  render() {
    const weeks = this.renderItems();
    return (
      <View style={{ position: 'relative', height: '100%', backgroundColor: 'red', display: 'flex', flexDirection: 'column' }}>
        <Animated.View style={{ flex: this.state.topHeight }}>
          <Text>Program Details</Text>
        </Animated.View>
        <Animated.ScrollView
          style={{ position: 'absolute', bottom: 0, top: this.state.ryan }}
          contentContainerStyle={{ backgroundColor: 'black', display: 'flex' }}
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
