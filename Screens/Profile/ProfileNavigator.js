import { createStackNavigator } from 'react-navigation';
import Profile from './Profile';
import PostDetail from '../Post/PostDetail';
import ProfileUtilities from './ProfileUtilities';

export const ProfileNavigator = createStackNavigator(
  {
    Profile: {
      screen: Profile
    },
    ProfilePostDetail: {
      name: 'ProfilePostDetail',
      screen: PostDetail
    },
    ProfileUtilities: {
      name: 'ProfileUtilities',
      screen: ProfileUtilities
    }
  }, {
    initialRouteName: 'Profile',
    headerMode: 'float'
  }
);
