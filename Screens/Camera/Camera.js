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
import { CameraKitCamera } from 'react-native-camera-kit';
import CameraRollPicker from './CameraRollPicker';
import { Icon } from 'react-native-elements';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraButtonPosition: new Animated.Value(60),
      cameraRollPosition: new Animated.Value(-135),
      photos: []
    };
    this.toggleCameraButton = this.toggleCameraButton.bind(this);
  }
  toggleCameraButton() {
    Animated.timing(
      this.state.cameraButtonPosition,
      {
        toValue: this.state.cameraButtonPosition._value > 0 ? -100 : 60,
        easing: Easing.bezier(0.55, 0, 0.1, 1),
        duration: 300
      }
    ).start();
    Animated.timing(
      this.state.cameraRollPosition,
      {
        toValue: this.state.cameraRollPosition._value > 0 ? -135 : 40,
        easing: Easing.bezier(0.55, 0, 0.1, 1)
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
        <Animated.View style={{ position: 'absolute', bottom: this.state.cameraRollPosition }}>
          <TouchableOpacity onPress={this.toggleCameraButton}><Icon name="expand-more" type="material" color="white" size={30} /></TouchableOpacity>
          <CameraRollPicker />
        </Animated.View>
      </View>
    );
  }
}

export default Camera;
