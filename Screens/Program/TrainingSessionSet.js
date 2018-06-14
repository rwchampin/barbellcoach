import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { updateRepsAndSets } from '../../Redux/Actions';

class TrainingSessionSet extends Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
  }
  click() {
    this.props.updateSetsAndReps(this.props.index);
  }
  render() {
    return (
      <TouchableOpacity onPress={this.click}>
        <View
          style={{ display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          width: 50,
          borderRadius: 25,
          borderWidth: 2,
          borderColor: 'black',
          backgroundColor: this.props.set.fullSetCompleted ? 'green' : 'white'
        }}
        >
          <Text>{this.props.set.completedReps}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  updateRepsAndSets
})(TrainingSessionSet);
