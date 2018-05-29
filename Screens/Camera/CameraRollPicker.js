import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import {
  CameraRoll,
  ScrollView,
  View
} from 'react-native';
import CameraRollThumbnail from './CameraRollThumbnail';

class CameraRollPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selectedImage: ''
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
    this.props.setAsset(selectedImage, 'image');
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ height: 115 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ display: 'flex', height: 115, width: '100%', flexDirection: 'row' }}>
          {this.state.photos.map((p, i) => {
            return (
              <CameraRollThumbnail
                key={i}
                source={p.node.image.uri}
                setSelectedImage={this.setSelectedImage}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(CameraRollPicker);
