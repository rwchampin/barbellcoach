import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import TabSections from '../Common/TabSections';

class LiftDetails extends Component {
  render() {
    const tabRoutes = [
      { key: '1', title: 'Set/Rep' },
      { key: '2', title: 'Time' },
      { key: '3', title: 'Amrap' },
      { key: '4', title: '%' }
    ];
    const routeMap = {
      '1': () => <View />,
      '2': () => <View />,
      '3': () => <View />,
      '4': () => <View />
    };
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>{this.props.navigation.state.params.lift}</Text>
        <TabSections
          routeKeys={tabRoutes}
          routeMap={routeMap}
        />
      </View>
    );
  }
}

export default LiftDetails;
