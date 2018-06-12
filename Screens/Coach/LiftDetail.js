import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import firebase from 'react-native-firebase';
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
            params.buildLift();
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
    this.setAndReps = {};
    this.buildLift = this.buildLift.bind(this);
    this.setSetsAndReps = this.setSetsAndReps.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({
      buildLift: this.buildLift
    });
  }

  setSetsAndReps(setsAndReps) {
    this.setsAndReps = setsAndReps;
  }

  buildLift() {
    const that = this;
    const newLift = {
      created: firebase.firestore.FieldValue.serverTimestamp(),
      dayId: this.props.navigation.state.params.dayId,
      liftType: this.props.navigation.state.params.liftType,
      type: 'lift'
    };
    const liftRef = firebase.firestore().collection('programLift').doc();
    newLift.id = liftRef.id;
    liftRef.set(newLift);

    const doc = firebase.firestore().collection('programLift').where('dayId', '==', this.props.navigation.state.params.dayId).orderBy('created', 'asc');
    doc.onSnapshot((querySnapshot) => {
      const lifts = [];
      querySnapshot.forEach((snapshot) => {
        lifts.push(snapshot.data());
      });
      that.props.navigation.state.params.buildLifts(lifts);
    });
  }

  render() {
    const tabRoutes = [
      { key: '1', title: 'Sets' },
      { key: '2', title: 'Time' },
      { key: '3', title: '%' }
    ];
    const routeMap = {
      '1': () => <RepsAndSets setSetsAndReps={this.setSetsAndReps} />,
      '2': () => <View />,
      '3': () => <View />
    };
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 40, textAlign: 'center', marginTop: 20, marginBottom: 20 }}>{this.props.navigation.state.params.liftType}</Text>
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
