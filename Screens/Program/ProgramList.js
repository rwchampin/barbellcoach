import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import {
  Card
} from 'react-native-elements';

class ProgramList extends Component {
  render() {
    return (
      <View>
      {this.props.AuthReducer.user.userProfile.programs.map((program) => {
        return <Card />;
      })

      }

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ProgramList);
