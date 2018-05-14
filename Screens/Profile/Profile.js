import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { addUser } from '../../Redux/Actions';
import ProfileTabSections from './ProfileTabSections';
import ProfileHeaderSection from './ProfileHeaderSection';

class Profile extends Component {
  static async logout() {
    await firebase.auth().signOut();
  }
  // static navigationOptions({ navigation }) {
  //   const headerTitle = navigation.state.params.client.firstName;
  //   return ({ headerTitle: headerTitle });
  // }
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.logout = Profile.logout.bind(this);
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={Profile.logout}><Text>LOGOUT</Text></TouchableOpacity>
        <ProfileHeaderSection avatar={this.props.AuthReducer.user.data().avatar} />
        <ProfileTabSections navigation={this.props.navigation} gridItems={this.props.AuthReducer.user.data().posts.lifts} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Profile);
