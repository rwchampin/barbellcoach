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
      searchString: '',
      user: {
        user: '', // props.screenProps.user,
        userType: '', // props.screenProps.user.data().userType,
        uid: '' // props.screenProps.user.data().uid
      }
    };
    this.updateSearchResults = this.updateSearchResults.bind(this);
  }
  componentDidMount() {
    const dbUserRef = firebase.firestore().collection('userProfiles');
    const notificationsRef = firebase.firestore().collection('notifications');
    const clients = [];
    dbUserRef
      .get().then((snapshot) => {
        snapshot.forEach((doc) => {
          const client = doc.data();
          let invited = false;
          notificationsRef
            .where('fromUser/uid', '==', this.props.AuthReducer.user.userProfile.uid)
            .where('toUserUid', '==', client.uid)
            .get()
            .then((notificationSnapshot) => {
              notificationSnapshot.forEach((notification) => {
                debugger;
                if (notification.data().type === 'coachInvite') {
                  invited = true;
                }
                client.invited = invited;
              });
            });
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
      fromUser: this.props.AuthReducer.user.userProfile,
      opened: false,
      toUserUid: clientUid,
      type: this.state.user.userType === 'coach' ? 'clientInvite' : 'coachInvite',
      message: 'Hey man, I want to be your coach.  Blah blah blah'
    };
    dbUserRef.add(notification);
  }

  updateSearchResults(searchString) {
    this.setState({ searchString });
  }

  render() {
    const that = this;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SearchBar
          round
          darkTheme
          onChangeText={this.updateSearchResults}
        />
        <View>
          {this.state.clients.map((client, i) => {
            if (client.firstName.indexOf(this.state.searchString) < 0) {
              return null;
            }
            const isClient = client.coach === this.props.AuthReducer.user.userProfile.uid;
            const isInvited = client.invited ? 'Invited' : 'Invite';
            const button = isClient ? 'Coaching' : isInvited;
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
                    <View style={{ borderWidth: 1, borderRadius: 6, borderColor: 'black', padding: 6 }}>
                      <Text>{button}</Text>
                    </View>
                  </TouchableOpacity>
                }
                onPress={() => {
                  this.props.navigation.navigate('VisitingProfile', {
                    client: client,
                    isClient: isClient
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
