import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

class CameraRollThumbnail extends Component {
  componentDidMount() {
    if (this.props.first) {
      this.props.setSelectedImage(this.props.source);
    }
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.setSelectedImage(this.props.source);
        }}
      >
        <Image
          style={{
            opacity: this.props.opacity,
            width: 75,
            height: 100,
            borderRadius: 8,
            marginLeft: 3,
            marginRight: 3
          }}
          source={{ uri: this.props.source }}
        />
      </TouchableOpacity>
    );
  }
}

export default CameraRollThumbnail;
