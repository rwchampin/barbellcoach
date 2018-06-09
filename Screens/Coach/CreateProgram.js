import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import _ from 'lodash';
import {
  Button
} from 'react-native-elements';
import {
  addWeek,
  saveProgram,
  createNewProgram,
  updateProgram,
  sendProgramToClient
} from '../../Redux/Actions';
import Week from './Week';

class CreateProgram extends Component {
  static navigationOptions({ navigation }) {
    const params = navigation.state.params || {};
    const headerTitle = params.title || 'Create New Program';

    return ({
      headerTitle: headerTitle,
      headerRight: (
        <TouchableOpacity onPress={() => {
          params.saveProgram(params.programId);
        }}
        >
          <Text style={{ marginRight: 20 }}>Save Draft</Text>
        </TouchableOpacity>
      )
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      program: [],
      modalVisible: false
    };
    this.programId = null;
    this.addWeek = this.addWeek.bind(this);
    this.buildProgram = this.buildProgram.bind(this);
    this.toggleLiftModal = this.toggleLiftModal.bind(this);
    this.sendProgramToClient = this.sendProgramToClient.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({
      saveProgram: this.props.saveProgram
    });
  }

  componentDidMount() {
    if (this.props.navigation.state.params.program) {
      this.programId = this.props.navigation.state.params.program.id;
      this.props.navigation.setParams({
        programId: this.programId
      });
      this.props.updateProgram(this.props.navigation.state.params.program);
      return;
    }
    this.programId = uuid();
    this.props.navigation.setParams({
      programId: this.programId
    });
    this.props.createNewProgram({
      id: this.programId,
      created: Date.now(),
      coach: this.props.AuthReducer.user.userProfile,
      client: this.props.navigation.state.params.client,
      program: [],
      programProgress: 0
    });
  }

  componentWillReceiveProps(nextProps) {
    const program = _.find(nextProps.ProgramReducer.programs, { id: this.programId });
    this.setState({
      program: program.program
    });
  }

  addWeek() {
    const week = {
      id: uuid(),
      days: [],
      type: 'week'
    };
    this.props.addWeek(week, this.programId);
  }

  toggleLiftModal() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  buildProgram() {
    const program = this.state.program.map((week, i) => {
      return (
        <Week
          programId={this.programId}
          key={i}
          weekCount={i}
          weekId={week.id}
          days={week.days}
          toggleLiftModal={this.toggleLiftModal}
          navigation={this.props.navigation}
        />
      );
    });
    return (
      <ScrollView style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
        {program}
        <Button
          title="Send"
          style={{ marginTop: 20 }}
          containerStyle={{ width: '100%' }}
          onPress={this.sendProgramToClient}
        />
      </ScrollView>
    );
  }

  sendProgramToClient() {
    this.props.sendProgramToClient(this.programId);
    this.props.navigation.goBack();
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
      <View style={{ display: 'flex', height: '100%' }}>
        <Button
          title="Add Week"
          style={{ marginTop: 20 }}
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
  addWeek,
  saveProgram,
  updateProgram,
  createNewProgram,
  sendProgramToClient
})(CreateProgram);
