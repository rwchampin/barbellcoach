import React, { Component } from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';
import { Button } from 'react-native-elements';

class ProfileHeaderSection extends Component {
  render() {
    return (
      <View style={{ display: 'flex', padding: 10, flexDirection: 'column' }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
            resizeMode="cover"
            source={{ uri: this.props.avatar }}
          />
          <View style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ marginLeft: 20 }}>405</Text>
              <Text>405</Text>
              <Text style={{ marginRight: 20 }}>405</Text>
            </View>
            <View>
              <Button
                title="Edit Profile"
                buttonStyle={{ height: 20, padding: 0, marginTop: 5 }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default ProfileHeaderSection;
