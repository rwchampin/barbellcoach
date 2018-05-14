import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  Button
} from 'react-native-elements';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

class NotificationDetail extends Component {
  constructor(props) {
    super(props);
    this.acceptInvitation = this.acceptInvitation.bind(this);
  }
  acceptInvitation() {

    const invitedUser = this.props.AuthReducer.user;
    const invitedUserType = invitedUser.data().userType;


    firebase.firestore().collection('userProfiles').where('uid', '==', this.props.navigation.state.params.notification.fromUser.uid)
      .get().then((snapshot) => {
        snapshot.forEach((doc) => {
          const invitee = doc;

          if (invitedUserType === 'client') {
            invitedUser.ref.update({ 'coach': this.props.navigation.state.params.notification.fromUser.uid });
            invitee.ref.update({ 'clients': [invitedUser.data().uid, ...invitee.data().clients] });
          } else {
            invitedUser.ref.update({ 'clients': [this.props.navigation.state.params.notification.fromUser.uid, ...invitedUser.data().clients] });
            invitee.ref.update({ 'coach': invitedUser.data().uid });
          }
        })
      })

  }
  render() {
    return (
      <View>
        <Text>From: {this.props.navigation.state.params.notification.fromUser.firstName}</Text>
        <Text>{this.props.navigation.state.params.notification.message}</Text>
        <Button
          title="Accept"
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "rgba(92, 99,216, 1)",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          onPress={this.acceptInvitation}
          containerStyle={{ marginTop: 20 }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(NotificationDetail);
