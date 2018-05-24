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
import { Icon } from 'react-native-elements';

class Camera extends Component {
  render() {
    return (
      <View
        style={{ paddingBottom: 30, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column', height: '100%' }}>
        <CameraKitCamera
          ref={cam => this.camera = cam}
          style={{
            flex: 1,
            backgroundColor: 'white'
          }}
          cameraOptions={{
            flashMode: 'auto',             // on/off/auto(default)
            focusMode: 'on',               // off/on(default)
            zoomMode: 'on',                // off/on(default)
            ratioOverlay:'1:1',            // optional, ratio overlay on the camera and crop the image seamlessly
            ratioOverlayColor: '#00000077' // optional
          }}
        />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
            <View style={{ borderWidth: 6, borderColor: 'rgba(0,0,0,.2)', height: 70, width: 70, borderRadius: 35, backgroundColor: 'white' }} />
          </View>
          <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Icon color="white" name="collections" size={30} />
          </View>
        </View>
      </View>
    );
  }
}

export default Camera;
