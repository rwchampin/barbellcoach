import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {
  SearchBar,
  ListItem
} from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

class Search extends Component {
  static navigationOptions() {
    const title = 'Search';
    return ({ headerTitle: title });
  }
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      user: {
        user: '', // props.screenProps.user,
        userType: '', // props.screenProps.user.data().userType,
        uid: '' // props.screenProps.user.data().uid
      }
    };
  }
  componentDidMount() {
    const dbUserRef = firebase.firestore().collection('userProfiles');
    const clients = [];
    // const opposite = this.state.user.userType === 'client' ? 'coach' : 'client';
    dbUserRef
      // .where('userType', '==', opposite)
      .get().then((snapshot) => {
        snapshot.forEach((doc) => {
          const client = doc.data();
          clients.push(client);
        });
        this.setState({
          clients: clients
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }

  async inviteClient(clientUid) {
    const dbUserRef = firebase.firestore().collection('notifications');
    const notification = {
      fromUser: this.state.user.uid,
      opened: false,
      toUserUid: clientUid,
      type: this.state.user.userType === 'coach' ? 'clientInvite' : 'coachInvite',
      message: "Hey man, I want to be your coach.  Blah blah blah"
    };
    dbUserRef.add(notification);
  }

  render() {
    const that = this;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SearchBar
          round
          darkTheme
        />
        <View>
          {this.state.clients.map((client, i) => {
            return (
              <ListItem
                title={client.firstName}
                key={i}
                subtitle="test"
                roundAvatar
                avatar={{ uri: client.avatar }}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => {
                      that.inviteClient(client.uid);
                    }}
                  >
                    <View style={{ borderWidth: 1, borderRadius: 6, borderColor: 'black', padding: 6}}>
                      <Text>Invite</Text>
                    </View>
                  </TouchableOpacity>
                }
                onPress={() => {
                  this.props.navigation.navigate('VisitingProfile', {
                    client: client
                  });
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Search);
