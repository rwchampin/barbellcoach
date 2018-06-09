import { createStackNavigator } from 'react-navigation';
import Profile from './Profile';
import PostDetail from '../Post/PostDetail';
import ProfileUtilities from './ProfileUtilities';
import ProgramDrafts from './ProgramDrafts';
import CreateProgram from '../Coach/CreateProgram';

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
    },
    ProgramDrafts: {
      name: 'ProgramDrafts',
      screen: ProgramDrafts
    },
    CreateProgram: {
      name: 'CreateProgram',
      screen: CreateProgram
    }
  }, {
    initialRouteName: 'Profile',
    headerMode: 'float'
  }
);
