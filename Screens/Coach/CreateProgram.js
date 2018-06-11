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
import firebase from 'react-native-firebase';
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
    this.programId = uuid();
    this.props.navigation.setParams({
      programId: this.programId
    });
    const { email } = this.props.AuthReducer.user.userProfile;
    const program = {
      id: this.programId,
      created: Date.now(),
      coach: this.props.AuthReducer.user.userProfile.uid,
      client: this.props.navigation.state.params.client,
      program: [],
      programProgress: 0,
      status: 'draft'
    };
    const updates = {};
    updates[this.programId] = program;
    firebase.firestore().collection('programs').doc(email).set(updates, {
      merge: true
    });
  }

  addWeek() {
    const weekId = uuid();
    const week = {
      id: weekId,
      days: [],
      type: 'week'
    };
    const { email } = this.props.AuthReducer.user.userProfile;
    const updates = {};
    updates[weekId] = week;
    firebase.firestore().collection('programWeek').doc(this.programId).set(updates, {
      merge: true
    });
    const programWeeks = {};
    const weekObj = {};
    weekObj[`${weekId}`] = true;
    programWeeks[`${this.programId}.program.${weekId}`] = weekObj;
    firebase.firestore().collection('programs').doc(email).update(programWeeks);

    const doc = firebase.firestore().collection('programWeek').doc(this.programId);
    doc.onSnapshot((snapshot) => {
      this.setState({
        program: _.values(snapshot.data())
      });
    });
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
