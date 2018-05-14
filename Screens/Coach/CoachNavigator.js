import { StackNavigator } from 'react-navigation';
import CoachScreens from './CoachScreens';
import Clients from './Clients';

export const CoachNavigator = StackNavigator(
  {
    ...CoachScreens,
    Index: {
      screen: Clients
    }
  },
  {
    initialRouteName: 'Index',
    headerMode: 'float'
  }
);
