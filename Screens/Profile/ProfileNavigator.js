import { StackNavigator, createStackNavigator } from 'react-navigation';
import Profile from './Profile';
import PostDetail from '../Post/PostDetail';

export const ProfileNavigator = createStackNavigator(
  {
    Profile: {
      screen: Profile
    },
    ProfilePostDetail: {
      name: 'ProfilePostDetail',
      screen: PostDetail
    }
  }, {
    initialRouteName: 'Profile',
    headerMode: 'none'
  }
);
