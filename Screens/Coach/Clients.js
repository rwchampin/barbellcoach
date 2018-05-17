import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { addUser } from '../../Redux/Actions';
import ClientCard from './ClientCard';


class Clients extends Component {
  static navigationOptions() {
    const headerTitle = 'Clients';
    return ({ headerTitle: headerTitle });
  }
  constructor(props) {
    super(props);
    this.state = {
      clients: []
    };
  }
  componentWillReceiveProps(nextProps) {
    const dbUserRef = firebase.firestore().collection('userProfiles');
    const clients = [];
    const that = this;
    dbUserRef
      .where('coach', '==', nextProps.AuthReducer.user.userProfile.uid).get().then((snapshot) => {
        snapshot.forEach((doc) => {
          const client = doc.data();
          clients.push(client);
        });
        that.setState({
          clients: clients
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }

  render() {
    if (!this.state.clients.length) {
      return <Text>Loading...</Text>;
    }
    return (
      <View>
        {this.state.clients.map((client, i) => {
          return <ClientCard key={i} client={client} navigation={this.props.navigation} />
        })}
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  addUser
})(Clients);
