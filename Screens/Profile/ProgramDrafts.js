import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View
} from 'react-native';
import firebase from 'react-native-firebase';

class ProgramDrafts extends Component {
  static navigationOptions() {
    const headerTitle = 'Client Program Drafts';
    return ({
      headerTitle: headerTitle
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      drafts: []
    };
  }
  componentDidMount() {
    const drafts = [];
    const ref = firebase.firestore().collection('clientPrograms');
    ref.where('coach.uid', '==', this.props.AuthReducer.user.userProfile.uid).get().then((snapshot) => {
      snapshot.forEach((draft) => {
        drafts.push(draft);
      });
      debugger;
      this.setState({
        drafts: drafts
      });
    });
  }
  render() {
    if (!this.state.drafts.length) {
      return <Text>Loading...</Text>;
    }
    return (
      <View>
        {this.state.drafts.map((draft) => {
          return <Text>draft.client</Text>
        })}
      </View>
    );

  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ProgramDrafts);
