import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Camera from './Camera/Camera';

class CreatePost extends Component {
  static navigationOptions({ navigation }) {
    const params = navigation.state.params || {};
    const headerTitle = 'Post Details'
    return ({ headerTitle: headerTitle, headerRight: <TouchableOpacity onPress={params.goToNext}><Text style={{ marginRight: 20 }}>Next</Text></TouchableOpacity> });
  }
  constructor(props) {
    super(props);
    this.state = {
      postImage: null
    }
    this.setPostImage = this.setPostImage.bind(this);
  }
  componentWillMount() {
    this.props.navigation.setParams({ goToNext: () => {
      this.props.navigation.navigate('AddPostContent', {
        postImage: this.state.postImage
      })
    }});
  }
  setPostImage(image) {
    this.setState({
      postImage: image
    });
  }
  render() {
    return (
      <View>
        <Camera setPostImage={this.setPostImage} />
      </View>
    );
  }
}

export default CreatePost;
