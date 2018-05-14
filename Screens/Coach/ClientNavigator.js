import { StackNavigator, createStackNavigator } from 'react-navigation';
import Programs from '../Programs';

export const ClientNavigator = createStackNavigator(
  {
    Index: {
      screen: Programs
    }
  },
  {
    initialRouteName: 'Index',
    headerMode: 'float'
  }
);
