import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  Dimensions
} from 'react-native';
import firebase from 'react-native-firebase';
import { Rating } from 'react-native-elements';

class PostDetail extends Component {
  static navigationOptions({ navigation }) {
    const params = navigation.state.params || {};
    const headerTitle = 'Post Details'
    return ({ headerTitle: headerTitle });
  }
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
  }
  componentDidMount() {
    const ref = firebase.firestore().collection('userProfiles');
    ref.where('uid', '==', this.props.navigation.state.params.post.user).get().then((snapshot) => {
      snapshot.forEach((user) => {
        this.setState({
          user: user.data()
        });
      });
    });
  }
  render() {
    if (!this.state.user) {
      return <Text>Loading...</Text>;
    }
    return (
      <View>
        <View style={{ padding: 10, backgroundColor: 'lightgrey', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Image resizeMode="cover" style={{ height: 25, width: 25, borderRadius: 12.5 }} source={{ uri: this.state.user.avatar }} />
          <Text style={{ marginLeft: 10 }}>{this.state.user.firstName}</Text>
          <Text style={{ marginLeft: 5 }}>{this.state.user.lastName}</Text>
        </View>
        <Image resizeMode="cover" style={{ height: Dimensions.get('window').width, width: Dimensions.get('window').width }} source={{ uri: this.props.navigation.state.params.post.imageUrl }} />
        <Rating
          ratingBackgroundColor="#e6e6e6"
          readonly
          fractions={1}
          ratingCount={10}
          imageSize={35}
          style={{ paddingVertical: 10 }}
        />
        <Text><Text style={{ fontWeight: 'bold'}}>{this.state.user.firstName} {this.state.user.lastName} </Text>{this.props.navigation.state.params.post.liftDescription}</Text>
      </View>
    );
  }
}

export default PostDetail;
