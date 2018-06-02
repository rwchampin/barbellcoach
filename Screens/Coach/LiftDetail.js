import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { addLift, addDetailToLift } from '../../Redux/Actions';
import TabSections from '../Common/TabSections';
import RepsAndSets from './liftDetailTypes/RepsAndSets';

class LiftDetail extends Component {
  static navigationOptions({ navigation }) {
    const params = navigation.state.params || {};
    return ({
      headerTitle: 'Lift Detail',
      headerRight: (
        <TouchableOpacity onPress={() => {
            params.lift.repsAndSets = params.getRepsAndSets();
            params.addDetailToLift(params.programId, params.weekId, params.dayId, params.lift);
            navigation.pop();
            navigation.goBack(null);
          }}
        >
          <Text style={{ marginRight: 20 }}>Save</Text>
        </TouchableOpacity>
      )
    });
  }
  constructor(props) {
    super(props);
    this.getRepsAndSets = this.getRepsAndSets.bind(this);
    this.setRepsAndSets = this.setRepsAndSets.bind(this);
    this.repsAndSets = null;
  }

  componentWillMount() {
    this.props.navigation.setParams({
      addDetailToLift: this.props.addDetailToLift,
      getRepsAndSets: this.getRepsAndSets
    });
  }

  getRepsAndSets() {
    return this.repsAndSets;
  }
  setRepsAndSets(repsAndSets) {
    this.repsAndSets = repsAndSets;
  }
  render() {
    const tabRoutes = [
      { key: '1', title: 'Sets' },
      { key: '2', title: 'Time' },
      { key: '3', title: '%' }
    ];
    const routeMap = {
      '1': () => <RepsAndSets setRepsAndSets={this.setRepsAndSets} />,
      '2': () => <View />,
      '3': () => <View />
    };
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 40, textAlign: 'center', marginTop: 20, marginBottom: 20 }}>{this.props.navigation.state.params.lift.liftType}</Text>
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

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  addLift,
  addDetailToLift
})(LiftDetail);
