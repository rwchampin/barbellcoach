import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import firebase, { signOut } from 'react-native-firebase';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

class ClientCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: props.client
    };
    this.goToClientDetail = this.goToClientDetail.bind(this);
  }
  componentDidMount() {
    const that = this;
    const doc = firebase.firestore().collection('userProfiles').where('uid', '==', this.props.client.uid);

    doc.onSnapshot((docSnapshot) => {
      that.setState({
        client: docSnapshot._docs[0].data()
      });
    }, (err) => {
      console.log(`Encountered error: ${err}`);
    });
  }
  goToClientDetail() {
    this.props.navigation.navigate('VisitingProfile', {
      client: this.state.client
    });
  }
  render() {
    return (
      <TouchableOpacity onPress={this.goToClientDetail}>
        <Card title={this.state.client.firstName}>
          <View>
            <Image
              style={{width: 50, height: 50, borderRadius: 25}}
              resizeMode="cover"
              source={{ uri: this.state.client.avatar }}
            />
            <Text>{this.state.client.firstName}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default ClientCard;
