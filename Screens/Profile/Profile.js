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
import { Icon } from 'react-native-elements';

class Profile extends Component {
  static async logout() {
    await firebase.auth().signOut();
  }
  static navigationOptions({ navigation }) {
    const params = navigation.state.params || {};
    const title = navigation.state.params ? params.user.firstName + ' ' + params.user.lastName : '';
    return ({
      headerTitle: title,
      headerRight: <View style={{ marginRight: 10 }}><Icon name="dots-three-horizontal" type="entypo" size={20} color={'#000000'} style={{ marginRight: 10 }} /></View>
    });
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
      <View style={{ display: 'flex', height: '100%', backgroundColor: 'white' }}>
        {/* <TouchableOpacity onPress={Profile.logout}>
          <Text>LOGOUT</Text>
        </TouchableOpacity> */}
        <ProfileHeaderSection
          user={this.props.AuthReducer.user.userProfile}
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
