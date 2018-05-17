import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { addUser } from '../../Redux/Actions';
import TabSections from '../Common/TabSections';
import ProfileHeaderSection from '../Profile/ProfileHeaderSection';

class ClientProfile extends Component {
  static navigationOptions({ navigation }) {
    const headerTitle = navigation.state.params.client.firstName;
    return ({ headerTitle: headerTitle });
  }

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const posts = [];
    const that = this;
    const ref = firebase.firestore().collection('posts');
    ref.where('user', '==', this.props.navigation.state.params.client.uid).get()
      .then((snapshot) => {
        snapshot.forEach((post) => {
          posts.push(post.data());
        });
        that.setState({ loading: false, posts: posts });
      });
  }

  render() {
    if (this.state.loading) {
      return <Text>Loading...</Text>;
    }
    return (
      <View>
        <ProfileHeaderSection avatar={this.props.navigation.state.params.client.avatar} />
        <TabSections tabs={this.tabs} postDetailDestination="VisitingProfilePostDetail" navigation={this.props.navigation} gridItems={this.state.posts} />
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
