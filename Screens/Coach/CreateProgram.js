import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
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
          params.sendProgram();
        }}
        >
          <Text style={{ marginRight: 20 }}>Send</Text>
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
    this.weeks = 0;
    this.programId = null;
    this.addWeek = this.addWeek.bind(this);
    this.sendProgram = this.sendProgram.bind(this);
    this.buildProgram = this.buildProgram.bind(this);
    this.deleteProgram = this.deleteProgram.bind(this);
    this.toggleLiftModal = this.toggleLiftModal.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({
      sendProgram: this.sendProgram
    });
  }

  async componentDidMount() {
    const newProgram = {
      created: firebase.firestore.FieldValue.serverTimestamp(),
      coach: this.props.AuthReducer.user.userProfile.uid,
      client: this.props.navigation.state.params.client,
      programProgress: 0,
      totalSets: 0,
      totalSetsCompleted: 0,
      totalDays: 0,
      currentDay: 1,
      totalWeeks: 0,
      currentWeek: 1,
      status: 'draft'
    };
    const programRef = await firebase.firestore().collection('programs').doc();
    this.programId = programRef.id;
    newProgram.id = programRef.id;
    programRef.set(newProgram);
    const doc = firebase.firestore().collection('programWeek').where('programId', '==', this.programId);
    doc.onSnapshot((querySnapshot) => {
      const weeks = [];
      querySnapshot.forEach((snapshot) => {
        weeks.push(snapshot.data());
      });
      this.setState({
        program: _.orderBy(weeks, ['created'], ['asc'])
      });
    });
  }

  addWeek() {
    this.weeks = this.weeks + 1;
    const newWeek = {
      programId: this.programId,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      type: 'week',
      weekNum: this.weeks
    };
    // Create week reference so we can get the ID and add that to the actual object
    const weekRef = firebase.firestore().collection('programWeek').doc();
    newWeek.id = weekRef.id;
    weekRef.set(newWeek);
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
          weekCount={week.weekNum}
          id={week.id}
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

  sendProgram() {
    firebase.firestore().collection('programs').doc(this.programId).update({
      status: 'sent'
    });
    this.props.navigation.goBack();

    // TODO: SEND NOTIFICATION TO CLIENT WHEN SENT
  }

  deleteProgram() {
    firebase.firestore().collection('programs').doc(this.programId).delete();
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
        <Button
          title="Delete Draft"
          backgroundColor="red"
          style={{ marginTop: 20 }}
          containerStyle={{ width: '100%' }}
          onPress={this.deleteProgram}
        />
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
