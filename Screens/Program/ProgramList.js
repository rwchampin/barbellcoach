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
    this.setState({
      programs: nextProps.AuthReducer.user.userProfile.programs
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
  return state;
};

export default connect(mapStateToProps)(ProgramList);
