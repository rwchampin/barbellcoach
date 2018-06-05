import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { addUser } from '../../Redux/Actions';
import TabSections from '../Common/TabSections';
import ProfileHeaderSection from '../Profile/ProfileHeaderSection';
import { Icon } from 'react-native-elements';
import PostGrid from '../Post/PostGrid';
import ProgramList from '../Program/ProgramList';

class ClientProfile extends Component {
  static navigationOptions({ navigation }) {
    const params = navigation.state.params || {};
    const headerTitle = params.client.firstName;

    const header = {
      headerTitle: headerTitle
    };
    if (params.isClient) {
      header.headerRight = (
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity onPress={params.goToCreatePrograms}>
            <Icon name="plus" type="entypo" size={30} color={'#000000'} style={{ marginRight: 10 }} />
          </TouchableOpacity>
        </View>
      );
    }
    return header;
  }

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.goToCreatePrograms = this.goToCreatePrograms.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({
      user: this.props.AuthReducer.user.userProfile.uid,
      goToCreatePrograms: this.goToCreatePrograms
    });
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

  goToCreatePrograms() {
    this.props.navigation.navigate('CreateProgram', {
      client: this.props.navigation.state.params.client
    });
  }

  render() {
    const tabRoutes = [
      { key: '1', title: 'Lifts' },
      { key: '2', title: 'Feed' }
    ];
    const routeMap = {
      '1': () => <PostGrid postDetailDestination={this.props.postDetailDestination} navigation={this.props.navigation} gridItems={this.state.posts} />,
      '2': () => <ProgramList />
    };
    if (this.state.loading) {
      return <Text>Loading...</Text>;
    }
    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        <ProfileHeaderSection user={this.props.navigation.state.params.client} />
        <TabSections routeMap={routeMap} routeKeys={tabRoutes} tabs={this.tabs} postDetailDestination="VisitingProfilePostDetail" navigation={this.props.navigation} gridItems={this.state.posts} />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  addUser
})(ClientProfile);
