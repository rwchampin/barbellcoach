import { createStackNavigator } from 'react-navigation';
import Search from './Search';
import ClientProfile from '../Coach/ClientProfile';

export const SearchNavigator = createStackNavigator(
  {
    Index: {
      screen: Search
    },
    VisitingProfile: {
      name: 'Visiting Profile',
      screen: ClientProfile
    }
  },
  {
    initialRouteName: 'Index',
    headerMode: 'float'
  }
);
