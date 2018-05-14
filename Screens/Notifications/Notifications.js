import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  Text,
  View,
} from 'react-native';
import {
  SearchBar,
  ListItem
} from 'react-native-elements';

class Notifications extends Component {
  static navigationOptions({ navigation }) {
    const headerTitle = 'Notifications'
    return ({ headerTitle: headerTitle });
  }

  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    };
    this.ref = firebase.firestore().collection('notifications');
    this.onCollectionUpdate = this.onCollectionUpdate.bind(this);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const notifications = [];
    querySnapshot.forEach((doc) => {
      const { opened, type, fromUser, message } = doc.data();
      notifications.push({
        key: doc.id,
        doc, // DocumentSnapshot
        opened,
        fromUser,
        message
      });
    });
    this.setState({
      notifications,
      loading: false,
   });
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

    const userUid = firebase.auth().currentUser.uid;
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
                notification.doc.ref.update({'opened': true});
                this.props.navigation.navigate('NotificationDetail', {
                  notification: notification
                })
              }}
            />
          );
        })}
      </View>
    );
  }
}


export default Notifications;
