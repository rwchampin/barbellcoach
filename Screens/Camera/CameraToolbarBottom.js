import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Animated
} from 'react-native';
import { Icon } from 'react-native-elements';

class CameraToolbarBottom extends Component {
  render() {
    return (
      <Animated.View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: this.props.cameraButtonPosition }}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={this.props.toggleRecording}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: 6, borderColor: 'rgba(0,0,0,.2)', height: 70, width: 70, borderRadius: 35, backgroundColor: 'white' }}>
              <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'red' }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <TouchableOpacity onPress={this.props.toggleCameraButton}><Icon color="white" name="collections" size={30} /></TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}
export default CameraToolbarBottom;
