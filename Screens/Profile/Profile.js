import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView
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
    const tabRoutes = [
      { key: '1', title: 'Lifts' },
      { key: '2', title: 'Feed' }
    ];
    const routeMap = {
      '1': () => <PostGrid postDetailDestination={this.props.postDetailDestination} navigation={this.props.navigation} gridItems={this.state.posts} />,
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
