import { StackNavigator, createStackNavigator } from 'react-navigation';
import Search from './Search';

export const SearchNavigator = createStackNavigator(
  {
    Index: {
      screen: Search
    }
  },
  {
    initialRouteName: 'Index',
    headerMode: 'float'
  }
);
