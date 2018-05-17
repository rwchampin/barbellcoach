import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import TabSections from '../Common/TabSections';
import ProfileHeaderSection from './ProfileHeaderSection';

class Profile extends Component {
  static async logout() {
    await firebase.auth().signOut();
  }
  static navigationOptions({ navigation }) {
    const params = navigation.state.params || {};
    const title = navigation.state.params ? params.user.firstName + ' ' + params.user.lastName : '';
    return ({ headerTitle: title });
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      posts: []
    };
    this.logout = Profile.logout.bind(this);
  }
  componentWillMount() {
    this.props.navigation.setParams({
      user: this.props.AuthReducer.user.userProfile
    });
  }
  componentDidMount() {
    this.setState({
      loading: true
    });
    const posts = [];
    const ref = firebase.firestore().collection('posts');
    ref.where('user', '==', this.props.AuthReducer.user.userProfile.uid).get()
      .then((snapshot) => {
        snapshot.forEach((post) => {
          posts.push(post.data());
        });
        this.setState({
          loading: false,
          posts: posts
        });
      });
  }

  render() {
    if (this.state.loading) {
      return <Text>Loading...</Text>;
    }
    return (
      <View style={{ display: 'flex', height: '100%' }}>
        {/* <TouchableOpacity onPress={Profile.logout}>
          <Text>LOGOUT</Text>
        </TouchableOpacity> */}
        <ProfileHeaderSection
          avatar={this.props.AuthReducer.user.userProfile.avatar}
        />
        <TabSections
          postDetailDestination="ProfilePostDetail"
          navigation={this.props.navigation}
          gridItems={this.state.posts}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Profile);
