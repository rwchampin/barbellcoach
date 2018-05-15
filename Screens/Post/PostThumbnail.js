import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';


class PostThumbnail extends Component {
  render() {
    const that = this;
    return (
      <TouchableOpacity
        onPress={() => {
          that.props.navigation.navigate('PostDetail', {
            post: this.props.post
          });
        }}
      >
        <Image
          style={{
            opacity: this.props.opacity,
            width: Dimensions.get('window').width / 4,
            height: Dimensions.get('window').width / 4
          }}
          source={{ uri: this.props.post.imageUrl }}
        />
      </TouchableOpacity>
    );
  }
}

export default PostThumbnail;
