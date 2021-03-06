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
    });
  }
  goToClientDetail() {
    this.props.navigation.navigate('VisitingProfile', {
      client: this.state.client,
      isClient: true
    });
  }
  render() {
    const image = this.state.client.avatar ? { uri: this.state.client.avatar } : require('../../placeholder.jpg');
    return (
      <TouchableOpacity onPress={this.goToClientDetail}>
        <Card title={this.state.client.firstName} containerStyle={{ borderColor: 'black', backgroundColor: '#f7f9fc' }}>
          <View>
            <Image
              style={{ width: 50, height: 50, borderRadius: 25}}
              resizeMode="cover"
              source={image}
            />
            <Text>{this.state.client.firstName}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default ClientCard;
