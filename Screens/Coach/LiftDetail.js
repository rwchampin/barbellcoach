import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import uuid from 'uuid/v1';
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
            const liftId = uuid();
            params.getSets(liftId);
            params.liftRef.set({
              id: liftId,
              liftType: params.liftType
            });
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
    this.getSets = this.getSets.bind(this);
    this.setSets = this.setSets.bind(this);
    this.setReps = this.setReps.bind(this);
    this.reps = null;
    this.sets = null;
  }

  componentWillMount() {
    this.props.navigation.setParams({
      addDetailToLift: this.props.addDetailToLift,
      getSets: this.getSets,
      getReps: this.getReps
    });
  }

  getSets(liftId) {
    const that = this;
    this.sets.map((set) => {
      const update = {};
      update[set.id] = set;
      firebase.firestore().collection('programSet').doc(liftId).set(update, {
        merge: true
      });
      that.reps.map((rep) => {
        firebase.firestore().collection('programRep').doc(set.id).set(rep, {
          merge: true
        });
        return true;
      });
      return true;
    });
    return true;
  }

  setSets(sets) {
    this.sets = sets;
  }
  setReps(reps) {
    this.reps = reps;
  }
  render() {
    const tabRoutes = [
      { key: '1', title: 'Sets' },
      { key: '2', title: 'Time' },
      { key: '3', title: '%' }
    ];
    const routeMap = {
      '1': () => <RepsAndSets setReps={this.setReps} setSets={this.setSets} />,
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
