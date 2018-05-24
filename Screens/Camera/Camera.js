import React, { Component } from 'react';
import {
  Text,
  CameraRoll,
  ScrollView,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';
import { CameraKitCamera, CameraKitGalleryView } from 'react-native-camera-kit';
import { Icon } from 'react-native-elements';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraButtonPosition: new Animated.Value(60)
    };
    this.toggleCameraButton = this.toggleCameraButton.bind(this);
  }
  toggleCameraButton() {
    Animated.timing(                  // Animate over time
      this.state.cameraButtonPosition,            // The animated value to drive
      {
        toValue: -100,
        easing: Easing.bezier(.55,0,.1,1),               // Animate to opacity: 1 (opaque)
        duration: 300,              // Make it take a while
      }
    ).start();
  }
  render() {
    return (
      <View
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column', height: '100%', width: '100%' }}>
        <View style={{ paddingLeft: 20, padingRight: 20, display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', width: '100%', position: 'absolute', top: 50, zIndex: 100 }}>
          <TouchableOpacity onPress={() => { this.props.navigation.goBack(null); }}><Icon name="close" type="material" color="white" /></TouchableOpacity>
        </View>
        <CameraKitCamera
          ref={cam => this.camera = cam}
          style={{
            flex: 1,
            margin:0,
            padding: 0,
            width: '100%'
          }}
          cameraOptions={{
            flashMode: 'auto',
            focusMode: 'on',
            zoomMode: 'on'
          }}
        />
        <Animated.View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: this.state.cameraButtonPosition }}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
            <View style={{ borderWidth: 6, borderColor: 'rgba(0,0,0,.2)', height: 70, width: 70, borderRadius: 35, backgroundColor: 'white' }} />
          </View>
          <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <TouchableOpacity onPress={this.toggleCameraButton}><Icon color="white" name="collections" size={30} /></TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    );
  }
}

export default Camera;
