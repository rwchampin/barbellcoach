import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
  Dimensions,
  View
} from 'react-native';
import BarbellVideo from '../Camera/BarbellVideo';

class PostThumbnail extends Component {
  constructor(props) {
    super(props);
    this.renderAsset = this.renderAsset.bind(this);
  }
  renderAsset(post) {
    const style = this.props.first ? {
      height: 225,
      width: Dimensions.get('window').width
    } : {
      height: Dimensions.get('window').width / 4,
      width: Dimensions.get('window').width / 4
    }
    if (post.assetType === 'video') {
      const videoUrl = post.assetUrl;
      return <View style={style}><BarbellVideo video={videoUrl} paused={true} /></View>;
    }

    return (
      <Image
        style={{
          opacity: this.props.opacity,
          width: Dimensions.get('window').width / 4,
          height: Dimensions.get('window').width / 4
        }}
        source={{ uri: post.assetUrl }}
      />
    );
  }
  render() {
    const that = this;
    const asset = this.renderAsset(this.props.post);
    return (
      <TouchableOpacity
        onPress={() => {
          that.props.navigation.navigate(this.props.postDetailDestination, {
            post: this.props.post
          });
        }}
      >
        {asset}
      </TouchableOpacity>
    );
  }
}

export default PostThumbnail;
