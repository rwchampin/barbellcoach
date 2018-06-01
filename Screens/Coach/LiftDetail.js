import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import TabSections from '../Common/TabSections';
import {
  Card
} from 'react-native-elements';
import RepsAndSets from './liftDetailTypes/RepsAndSets';

class LiftDetail extends Component {
  static navigationOptions({ navigation }) {
    return ({
      headerTitle: 'Lift Details'
    });
  }
  render() {debugger;
    const tabRoutes = [
      { key: '1', title: 'Sets' },
      { key: '2', title: 'Time' },
      { key: '3', title: '%' }
    ];
    const routeMap = {
      '1': () => <RepsAndSets />,
      '2': () => <View />,
      '3': () => <View />
    };
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 40, textAlign: 'center', marginTop: 20, marginBottom: 20 }}>{this.props.navigation.state.params.lift}</Text>
        <TabSections
          routeKeys={tabRoutes}
          routeMap={routeMap}
          postDetailDestination="ProfilePostDetail"
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

export default LiftDetail;
