import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import firebase from 'react-native-firebase';
import { Rating } from 'react-native-elements';
import BarbellVideo from '../Camera/BarbellVideo';

class PostDetail extends Component {
  static navigationOptions({ navigation }) {
    const params = navigation.state.params || {};
    const headerTitle = 'Post Details'
    return ({ headerTitle: headerTitle });
  }
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      mute: true
    };
    this.toggleMute = this.toggleMute.bind(this);
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
  toggleMute() {
    this.setState({
      mute: !this.state.mute
    });
  }
  render() {
    if (!this.state.user) {
      return <Text>Loading...</Text>;
    }
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={{ padding: 10, backgroundColor: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Image resizeMode="cover" style={{ height: 35, width: 35, borderRadius: 17.5 }} source={{ uri: this.state.user.avatar }} />
          <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>{this.state.user.firstName}</Text>
          <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>{this.state.user.lastName}</Text>
        </View>
        <View style={{ height: Dimensions.get('window').width, width: Dimensions.get('window').width }}>
          <TouchableWithoutFeedback onPress={this.toggleMute}>
            <BarbellVideo video={this.props.navigation.state.params.post.assetUrl} mute={this.state.mute} />
          </TouchableWithoutFeedback>
        </View>
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
