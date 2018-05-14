import React, { Component } from 'react';
import {
  View
} from 'react-native';

import { connect } from 'react-redux';
import { addUser } from '../../Redux/Actions';
import ProfileTabSections from '../Profile/ProfileTabSections';
import ProfileHeaderSection from '../Profile/ProfileHeaderSection';

class ClientProfile extends Component {
  static navigationOptions({ navigation }) {
    const headerTitle = navigation.state.params.client.firstName;
    return ({ headerTitle: headerTitle });
  }

  render() {
    return (
      <View>
        <ProfileHeaderSection avatar={this.props.navigation.state.params.client.avatar} />
        <ProfileTabSections gridItems={this.props.navigation.state.params.client.posts.lifts} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  addUser
})(ClientProfile);
