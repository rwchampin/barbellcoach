import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { FormLabel, FormInput, CheckBox } from 'react-native-elements';

import firebase from 'react-native-firebase';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'email': '',
      'password': '',
      'firstName': '',
      'lastName': '',
      'avatar': '',
      'userType': ''
    };
    this.signUp = this.signUp.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setUserType = this.setUserType.bind(this);
    this.setFirstName = this.setFirstName.bind(this);
    this.setLastName = this.setLastName.bind(this);
    this.setAvatar = this.setAvatar.bind(this);
  }

  setEmail(email) {
    this.setState({
      email: email
    });
  }
  setPassword(password) {
    this.setState({
      password: password
    })
  }
  setFirstName(firstName) {
    this.setState({
      firstName: firstName
    });
  }
  setLastName(lastName) {
    this.setState({
      lastName: lastName
    });
  }
  setAvatar(avatar) {
    this.setState({
      avatar: avatar
    });
  }
  setUserType() {
    this.setState({
      userType: !this.state.coach
    });
  }
  async signUp() {
    const dbUserRef = firebase.firestore().collection('userProfiles');
    const res = await firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password);
    if (res._user.uid) {
      const buildUser = {
        'uid': res._user.uid,
        'userType': this.state.userType ? 'coach' : 'client',
        'firstName': this.state.firstName,
        'lastName': this.state.lastName,
        'avatar': this.state.avatar,
        'posts': []
      };
      if (buildUser.userType === 'coach') {
        buildUser.clients = [];
      }
      if (buildUser.userType === 'client') {
        buildUser.coach = '';
      }
      dbUserRef.add(buildUser).error((err) => {
        console.log('ERROR::' + err);
      });
    }
    console.log(res);

  }
  render() {
    return (
      <ScrollView
        contentContainerStyle={{
        height: '100%',
        shadowColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        overflow: 'scroll'}}
      >
        <Image
          style={{ height: 100, resizeMode: 'contain' }}
          source={require('../bg.jpg')}
        />
        <View
          style={{
            width: '90%',
            display: 'flex',
            alignItems: 'center',
            flex: 1
          }}
        >
        <FormLabel>Email</FormLabel>
        <FormInput
          onChangeText={this.setEmail}
          inputStyle={{ width: Dimensions.get('window').width * .9 }}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          onChangeText={this.setPassword}
          inputStyle={{ width: Dimensions.get('window').width * .9 }}
        />
        <FormLabel>First Name</FormLabel>
          <FormInput
          onChangeText={this.setFirstName}
          inputStyle={{ width: Dimensions.get('window').width * .9 }}
        />
        <FormLabel>Last Name</FormLabel>
          <FormInput
            onChangeText={this.setLastName}
          inputStyle={{ width: Dimensions.get('window').width * .9 }}
        />
        <FormLabel>User Type</FormLabel>
          <CheckBox
          center
          onPress={this.setUserType}
          title='Are you a coach?'
          iconRight
          iconType='material'
          checkedIcon='check'
          uncheckedIcon='add'
          checkedColor='green'
          checked={this.state.userType}
          style={{ width: '100%' }}
        />
        <View
          style={{
            width: '100%',
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 5,
            shadowOpacity: .8,
          }}
          >
        <TouchableOpacity
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#5E7592',
              borderRadius: 30,
              padding: 20,
              width: '100%',
              marginTop: 20
            }}
            activeOpacity = { .5 }
            onPress={ this.signUp }
         >

         <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Sign Up</Text>
         </TouchableOpacity>
         </View>
       </View>
       </ScrollView>
    );
  }
}


export default Signup;
