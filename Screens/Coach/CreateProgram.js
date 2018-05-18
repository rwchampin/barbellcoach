import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-vector-icons';
import {
  Button,
  Card
} from 'react-native-elements';
import Week from './Week';

class CreateProgram extends Component {
  static uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  static navigationOptions() {
    const headerTitle = 'Create New Program';
    return ({
      headerTitle: headerTitle
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      program: []
    };
    this.addWeek = this.addWeek.bind(this);
    this.addDay = this.addDay.bind(this);
    this.buildProgram = this.buildProgram.bind(this);
  }

  addDay() {
    this.setState({

    })
  }

  addWeek() {
    this.setState({
      program: [
        <Week weekNumber={this.state.program.length} />,
        ...this.state.program
      ]
    });
  }

  buildProgram() {
    const program = this.state.program.map((week, i) => {
      return (
        week
      );
    });
    return program;
  }

  render() {
    const programContent = this.state.program.length ? this.buildProgram() : <Text>Add a week to begin building a program</Text>;
    return (
      <View style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <Button
        title='Add Week'
        onPress={this.addWeek}
      />
      <View style={{
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'dashed',
        flex: 1,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        {programContent}
      </View>

      </View>
    );
  }
}
export default CreateProgram;
