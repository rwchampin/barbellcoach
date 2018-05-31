import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import {
  View
} from 'react-native';
import {
  SearchBar,
  ListItem
} from 'react-native-elements';

class Notifications extends Component {
  static navigationOptions() {
    const headerTitle = 'Notifications';
    return ({ headerTitle: headerTitle });
  }

  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    };
    this.ref = firebase.firestore().collection('notifications').where('toUserUid', '==', props.AuthReducer.user.userProfile.uid);
    this.onCollectionUpdate = this.onCollectionUpdate.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate(querySnapshot) {
    const notifications = [];
    querySnapshot.forEach((doc) => {
      const { opened, fromUser, message } = doc.data();
      notifications.push({
        key: doc.id,
        doc, // DocumentSnapshot
        opened,
        fromUser,
        message
      });
    });
    this.setState({
      notifications
    });
  }

  render() {
    return (
      <View>
        <SearchBar light round />
        {this.state.notifications.map((notification, i) => {
          const leftIcon = notification.opened ? <View style={{ height: 10, width: 10, borderRadius: 5, marginRight: 15, backgroundColor: 'grey' }} /> : <View style={{ height: 10, width: 10, borderRadius: 5, marginRight: 15, backgroundColor: 'green' }} />;
          const type = notification.type === 'clientInvite' ? 'Client' : 'Coaching';
          return (
            <ListItem
              key={i}
              leftIcon={leftIcon}
              title={` ${notification.fromUser.firstName} has sent you a ${type} invite!`}
              opened={notification.opened}
              onPress={() => {
                notification.doc.ref.update({ 'opened': true });
                this.props.navigation.navigate('NotificationDetail', {
                  notification: notification
                });
              }}
            />
          );
        })}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Notifications);
