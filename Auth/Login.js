import React, { Component } from 'react';
import { FormLabel, FormInput } from 'react-native-elements';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { addUser } from '../Redux/Actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'email': null,
      'password': null
    };
    this.login = this.login.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
  }

  setEmail(email) {
    this.setState({
      email: email
    });
  }

  setPassword(password) {
    this.setState({
      password: password
    });
  }

  async login() {
    const user = await firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password);
  }
  goToSignUp() {
    this.props.navigation.navigate('Signup');
  }
  render() {
    return (
      <View style={{
        height: '100%',
        shadowColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'}}
      >
        <Image
          style={{ height: Dimensions.get('window').height / 2.5, resizeMode: 'contain' }}
          source={require('../bg.jpg')}
        />
        <View
          style={{
          width: '90%',
          display: 'flex',
          alignItems: 'center'
        }}
        >
          <FormLabel>Email</FormLabel>
          <FormInput
            onChangeText={this.setEmail}
            inputStyle={{ width: Dimensions.get('window').width * 0.9 }}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            onChangeText={this.setPassword}
            inputStyle={{ width: Dimensions.get('window').width * 0.9 }}
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
              activeOpacity={0.5}
              onPress={this.login}
            >

         <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Login</Text>
         </TouchableOpacity>

           <Text style={{ marginTop: 20, textAlign: 'center' }}>
            <TouchableOpacity
             onPress={this.goToSignUp}
             >
               <Text>Dont have an Account? Sign Up</Text>
             </TouchableOpacity>
          </Text>

         </View>
       </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  addUser
})(Login);
// export default Login;
