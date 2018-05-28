import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraRollPicker from './CameraRollPicker';
import BarbellVideo from './BarbellVideo';
import CameraToolbarTop from './CameraToolbarTop';

class Camera extends Component {
  static renderAsset(asset) {
    if (asset.indexOf('mov') > 0) {
      return <BarbellVideo video={asset} />;
    }
    return (
      <Image
        style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
        source={{ uri: asset }}
      />
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      cameraButtonPosition: new Animated.Value(60),
      cameraRollPosition: new Animated.Value(-135),
      cameraTimerOpacity: new Animated.Value(0),
      recording: false,
      recordingTime: 1,
      asset: null,
      assetType: null
    };
    this.recordingTimeout = null;
    this.setAsset = this.setAsset.bind(this);
    this.toggleRecording = this.toggleRecording.bind(this);
    this.toggleCameraButton = this.toggleCameraButton.bind(this);
  }

  setAsset(asset, assetType) {
    this.setState({
      asset: asset,
      assetType: assetType
    });
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
        easing: Easing.bezier(0.55, 0, 0.1, 1),
        duration: 300
      }
    ).start();
  }

  async toggleRecording() {
    this.setState({
      recording: !this.state.recording
    });
    if (!this.state.recording) {
      const video = await this.camera.recordAsync();
      this.setState({
        asset: video.uri,
        assetType: 'video'
      });
    } else {
      this.camera.stopRecording();
    }
  }

  render() {
    const asset = this.state.asset ? Camera.renderAsset(this.state.asset) : (
      <RNCamera
        ref={(ref) => {
          this.camera = ref;
        }}
        style={{ flex: 1, width: '100%' }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      />
    );
    return (
      <View
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column', height: '100%', width: '100%' }}
      >
        <View style={{ paddingLeft: 20, paddingRight: 20, display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', width: '100%', position: 'absolute', top: 50, zIndex: 100 }}>
          <CameraToolbarTop
            navigation={this.props.navigation}
            setAsset={this.setAsset}
            asset={this.state.asset}
            assetType={this.state.assetType}
          />
        </View>
        {asset}
        <Animated.View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: this.state.cameraButtonPosition }}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
            <Animated.View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative', top: -10, opacity: this.state.cameraTimerOpacity }}>
              <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: 'red'}}></View>
              <Text style={{ color: 'white', fontSize: 10, marginLeft: 3 }}>{this.state.recordingTime}</Text>
            </Animated.View>
            <TouchableOpacity onPress={this.toggleRecording}>
              <View style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: 6, borderColor: 'rgba(0,0,0,.2)', height: 70, width: 70, borderRadius: 35, backgroundColor: 'white' }}>
                <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'red' }} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <TouchableOpacity onPress={this.toggleCameraButton}><Icon color="white" name="collections" size={30} /></TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View style={{ position: 'absolute', bottom: this.state.cameraRollPosition }}>
          <TouchableOpacity onPress={this.toggleCameraButton}><Icon name="expand-more" type="material" color="white" size={30} /></TouchableOpacity>
          <CameraRollPicker setAsset={this.setAsset} />
        </Animated.View>
      </View>
    );
  }
}

export default Camera;
