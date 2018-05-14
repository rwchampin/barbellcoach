import { StackNavigator, createStackNavigator } from 'react-navigation';
import Profile from './Profile';

export const ProfileNavigator = createStackNavigator(
  {
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: 'Profile',
    headerMode: 'float'
  }
);
