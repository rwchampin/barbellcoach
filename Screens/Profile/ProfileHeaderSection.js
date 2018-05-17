import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Dimensions
} from 'react-native';
// import { Button } from 'react-native-elements';

class ProfileHeaderSection extends Component {
  render() {
    return (
      <View style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Image
          style={{ display: 'flex', flex: 3}}
          resizeMode="cover"
          source={{ uri: this.props.avatar }}
        />
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5, flex: 1 }}>
          <View style={{ margin: 10, flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontStyle: 'italic', fontWeight: 'bold' }}>Ryan</Text>
            <Text style={{ fontSize: 25, fontStyle: 'italic', fontWeight: 'bold' }}>Champin</Text>
          </View>
          <View style={{ flex: 1, margin: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text>This is my bio.  I lift Shit.This is my bio.  I lift Shit.This is my bio.  I lift Shit.</Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>405</Text>
                <Text style={{ fontSize: 12 }}>Videos</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>405</Text>
                <Text style={{ fontSize: 12 }}>Videos</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>405</Text>
                <Text style={{ fontSize: 12 }}>Videos</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default ProfileHeaderSection;
