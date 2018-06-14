import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  Card
} from 'react-native-elements';
import _ from 'lodash';
import firebase from 'react-native-firebase';
import {
  addProgramsToRedux
} from '../../Redux/Actions';


class ProgramList extends Component {
  static navigationOptions() {
    return ({
      headerTitle: 'My Programs'
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      programs: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const { email } = nextProps.userProfile;
    const that = this;
    const doc = firebase.firestore().collection('programs').where('client.email', '==', email);
    doc.onSnapshot((querySnapshot) => {
      const programs = [];
      querySnapshot.forEach((snapshot) => {
        programs.push(snapshot.data());
      });
      const sorted = _.orderBy(programs, ['created'], ['asc']);
      that.setState({
        programs: sorted
      });
    });
  }

  render() {
    const { programs } = this.state;
    if (!programs.length) {
      return <Text>Loading...</Text>;
    }
    return (
      <View>
        {programs.map((program, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                this.props.navigation.navigate('Program', {
                  program: program
                });
              }}
              >
                <Card key={i}>
                  <Text>{program.created.toString()}</Text>
                  <Text>{`Week ${program.totalWeeksCompleted}`} of {program.totalWeeks}</Text>
                </Card>
              </TouchableOpacity>
            );
          })}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state.AuthReducer.user;
};

export default connect(mapStateToProps, {
  addProgramsToRedux
})(ProgramList);
