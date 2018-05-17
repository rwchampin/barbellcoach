import React, { Component } from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';

class ProfileHeaderSection extends Component {
  render() {
    return (
      <View style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{ height: 110, width: 110, borderRadius: 55 }}
          resizeMode="cover"
          source={{ uri: this.props.user.avatar }}
        />
          <View style={{ margin: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>{`${this.props.user.firstName} ${this.props.user.lastName}`}</Text>
            <Text style={{ fontSize: 12, width: 250, textAlign: 'center', color: 'darkgrey' }}>This is a short bio.  Info about me and my lifting goes here</Text>
          </View>
        {/* <View style={{ display: 'flex', flexDirection: 'row' }}>
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
        </View> */}
      </View>
    );
  }
}

export default ProfileHeaderSection;
