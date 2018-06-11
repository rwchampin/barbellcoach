import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const usersProgramsRef = firebase.firestore().collection('programs').doc(email);
    usersProgramsRef.get().then((doc) => {
      const programs = _.values(doc.data());
      that.props.addProgramsToRedux(programs);
      that.setState({
        programs: programs
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
                <Card key={i} title={program.id} />
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
