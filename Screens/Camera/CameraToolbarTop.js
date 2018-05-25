import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements';

class CameraToolbarTop extends Component {
  render() {
    const closeOrGoBack = this.props.asset ? (
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <TouchableOpacity onPress={() => { this.props.setAsset(null); }}><Icon name="chevron-left" type="material" color="white" size={30} /></TouchableOpacity>
        <TouchableOpacity onPress={() => { this.props.setAsset(null); }}>
          <View style={{ display: 'flex', flexDirection: 'row', height: 30, width: 80, borderRadius: 18, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold' }}>NEXT</Text>
          </View>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'flex-start' }}>
        <TouchableOpacity onPress={() => { this.props.navigation.goBack(null); }}><Icon name="close" type="material" color="white" /></TouchableOpacity>
      </View>
    );
    return (
      <View style={{ width: '100%' }}>
      { closeOrGoBack }
      </View>
    );
  }
}
export default CameraToolbarTop;
