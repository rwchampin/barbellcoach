import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text
} from 'react-native';
import {
  List,
  ListItem
} from 'react-native-elements';
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
    ref.get().then((snapshot) => {
      snapshot.forEach((draft) => {
        drafts.push(draft.data());
      });
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
      <List>
        {this.state.drafts.map((draft, i) => {
          return (
            <ListItem
              key={i}
              title={draft.client.firstName}
              avatar={draft.client.avatar}
              onPress={() => {
                this.props.navigation.navigate('CreateProgram', {
                  program: draft,
                  title: 'Update Program'
                });
              }}
            />
          );
        })}
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ProgramDrafts);
