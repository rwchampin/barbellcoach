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
    this.weeks = 0;
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

  async componentDidMount() {
    const newProgram = {
      created: firebase.firestore.FieldValue.serverTimestamp(),
      coach: this.props.AuthReducer.user.userProfile.uid,
      client: this.props.navigation.state.params.client,
      programProgress: 0,
      status: 'draft'
    };
    const programRef = await firebase.firestore().collection('programs').add(newProgram);
    this.programId = programRef.id;

    this.props.navigation.setParams({
      programId: this.programId
    });

    const doc = firebase.firestore().collection('programWeek').where('programId', '==', this.programId);
    doc.onSnapshot((querySnapshot) => {
      const weeks = [];
      querySnapshot.forEach((snapshot) => {
        weeks.push(snapshot.data());
      }, (error) => {
        alert(error)
      });
      this.setState({
        program: weeks
      });
    });
  }

  addWeek() {
    this.weeks = this.weeks + 1;
    const newWeek = {
      programId: this.programId,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      type: 'week',
      count: this.weeks
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
          weekCount={week.count}
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
