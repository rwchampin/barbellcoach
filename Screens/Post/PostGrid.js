import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  View
} from 'react-native';
import PostThumbnail from './PostThumbnail';

class PostGrid extends Component {
  render() {
    const that = this;
    if (!this.props.gridItems.length) {
      return <Text>No Posts Yet</Text>
    }
    return (
      <ScrollView>
        <View style={{ display: 'flex', height: '100%', flexWrap: 'wrap', flex: 1, flexDirection: 'row' }}>
          {this.props.gridItems.map((post, i) => {
            const first = i === 0 ? true : false;
            return (
              <PostThumbnail
                first={first}
                postDetailDestination={this.props.postDetailDestination}
                navigation={that.props.navigation}
                key={i}
                post={post}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

export default PostGrid;
