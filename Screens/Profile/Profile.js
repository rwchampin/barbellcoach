import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import TabSections from '../Common/TabSections';
import ProfileHeaderSection from './ProfileHeaderSection';
import { Icon } from 'react-native-elements';
import PostGrid from '../Post/PostGrid';
import Programs from '../Profile/Programs';

class Profile extends Component {
  static async logout() {
    await firebase.auth().signOut();
  }
  static navigationOptions({ navigation }) {
    const params = navigation.state.params || {};
    const title = navigation.state.params ? params.user.firstName + ' ' + params.user.lastName : '';
    return ({
      headerTitle: title,
      headerRight: <View style={{ marginRight: 10 }}><TouchableOpacity onPress={() => {navigation.navigate('ProfileUtilities');}}><Icon name="dots-three-horizontal" type="entypo" size={20} color={'#000000'} style={{ marginRight: 10 }} /></TouchableOpacity></View>
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

    const doc = firebase.firestore().collection('posts').where('user', '==', this.props.AuthReducer.user.userProfile.uid);
    const that = this;
    doc.onSnapshot((snapshot) => {
      const posts = [];
      snapshot.forEach((post) => {
        posts.push(post.data());
      });
      that.setState({
        loading: false,
        posts: posts
      });
    });
  }

  render() {
    const tabRoutes = [
      { key: '1', title: 'Lifts' },
      { key: '2', title: 'Feed' }
    ];
    const routeMap = {
      '1': () => <PostGrid postDetailDestination="ProfilePostDetail" navigation={this.props.navigation} gridItems={this.state.posts} />,
      '2': () => <Programs />
    };
    if (this.state.loading) {
      return <Text>Loading...</Text>;
    }
    return (
      <ScrollView style={{ display: 'flex', height: '100%', backgroundColor: 'white' }}>
        <ProfileHeaderSection
          user={this.props.AuthReducer.user.userProfile}
        />
        <TabSections
          routeKeys={tabRoutes}
          routeMap={routeMap}
          postDetailDestination="ProfilePostDetail"
          navigation={this.props.navigation}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Profile);
