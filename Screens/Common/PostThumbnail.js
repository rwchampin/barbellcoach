import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';


class PostThumbnail extends Component {
  componentDidMount() {
    if (this.props.first) {
      this.props.setSelectedImage(this.props.source);
    }
  }
  render() {
    const that = this;
    return (
      <TouchableOpacity
        onPress={() => {
          if(this.props.setSelectedImage) {
            that.props.setSelectedImage(this.props.source);
          } else {
            that.props.navigation.navigate('PostDetail');
          }
        }}
      >
        <Image
          style={{
            opacity: this.props.opacity,
            width: Dimensions.get('window').width / 4,
            height: Dimensions.get('window').width / 4
          }}
          source={{ uri: this.props.source }}
        />
      </TouchableOpacity>
    );
  }
}

export default PostThumbnail;
