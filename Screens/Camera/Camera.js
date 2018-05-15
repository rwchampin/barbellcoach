import React, { Component } from 'react';
import {
  Text,
  CameraRoll,
  ScrollView,
  View,
  Image,
  Dimensions
} from 'react-native';
import { CameraKitCamera, CameraKitGalleryView } from 'react-native-camera-kit';
import CameraRollThumbnail from './CameraRollThumbnail';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selectedImage: '',
      userProfileRef: firebase.firestore().collection('userProfiles')
    };
    this.setSelectedImage = this.setSelectedImage.bind(this);
  }
  componentDidMount() {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All'
    })
      .then(r => this.setState({ photos: r.edges }));
  }

  setSelectedImage(selectedImage) {
    this.setState({
      selectedImage: selectedImage
    });
    this.props.setPostImage(selectedImage);
  }

  render() {
    return (
      <View style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Image
          style={{
            width: Dimensions.get('window').width,
            flex: 1
          }}
          source={{ uri: this.state.selectedImage }}
        />
        <ScrollView>
          <View style={{ display: 'flex', height: '100%', flexWrap: 'wrap', flex: 1, flexDirection: 'row' }}>
            {this.state.photos.map((p, i) => {
              const opacity = this.state.selectedImage === p.node.image.uri ? 0.5 : 1;
              const first = i === 0 ? true : false;
              return (
                <CameraRollThumbnail
                  first={first}
                  key={i}
                  opacity={opacity}
                  source={p.node.image.uri}
                  setSelectedImage={this.setSelectedImage}
                />
              );
            })}
          </View>
      </ScrollView>
    </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Camera);
