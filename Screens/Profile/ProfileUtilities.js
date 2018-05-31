import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  View
} from 'react-native';
import {
  ListItem
} from 'react-native-elements';

class ProfileUtilities extends Component {
  render() {
    return (
      <View>
        <ListItem title={'Log Out'} onPress={() => {firebase.auth().signOut()}} />
      </View>
    );
  }
}

export default ProfileUtilities;
