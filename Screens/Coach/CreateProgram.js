import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import uuid from 'uuid/v1';
import {
  Button
} from 'react-native-elements';
import { buildProgram } from '../../Redux/Actions';
import Week from './Week';

class CreateProgram extends Component {
  static navigationOptions() {
    const headerTitle = 'Create New Program';
    return ({
      headerTitle: headerTitle
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      program: [],
      modalVisible: false
    };
    this.addWeek = this.addWeek.bind(this);
    this.addDay = this.addDay.bind(this);
    this.addLift = this.addLift.bind(this);
    this.buildProgram = this.buildProgram.bind(this);
    this.toggleLiftModal = this.toggleLiftModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      program: nextProps.ProgramReducer.program
    });
  }

  addWeek() {
    this.setState({
      program: [
        ...this.state.program,
        {
          id: uuid(),
          days: [],
          type: 'week'
        }
      ]
    });
  }

  addDay(weekId) {
    const weekIndex = _.findIndex(this.state.program, { id: weekId });
    const { program } = this.state;
    program[weekIndex].days.push({
      type: 'day',
      lifts: [],
      id: uuid()
    });
    this.setState({
      program: program
    });
  }

  toggleLiftModal() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  addLift(weekId, dayId, lift) {
    const weekIndex = _.findIndex(this.state.program, { id: weekId });
    const week = _.find(this.state.program, { id: weekId });
    const dayIndex = _.findIndex(week.days, { id: dayId });
    const { program } = this.state;
    program[weekIndex].days[dayIndex].lifts.push({
      type: 'lift',
      lift: lift,
      id: uuid()
    });
    this.setState({
      program: program
    });
  }

  buildProgram() {
    const program = this.state.program.map((week, i) => {
      return (
        <Week
          key={i}
          weekCount={i}
          weekId={week.id}
          addDay={this.addDay}
          days={week.days}
          addLift={this.addLift}
          toggleLiftModal={this.toggleLiftModal}
          navigation={this.props.navigation}
        />
      );
    });
    return program;
  }

  render() {
    const programContent = this.state.program.length ? this.buildProgram() : (
      <View style={{
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'dashed',
        flex: 1,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <Text>Add a week to begin building a program</Text>
      </View>
    );
    return (
      <View style={{ display: 'flex', height: '100%', flexDirection: 'column', width: '100%' }}>
        <Button
          title="Add Week"
          containerStyle={{ width: '100%' }}
          onPress={this.addWeek}
        />
        {programContent}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  buildProgram
})(CreateProgram);
