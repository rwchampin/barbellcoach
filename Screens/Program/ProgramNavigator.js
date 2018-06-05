import { createStackNavigator } from 'react-navigation';
import ProgramList from './ProgramList';

export const ProgramNavigator = createStackNavigator(
  {
    ProgramList: {
      name: 'ProgramList',
      screen: ProgramList
    }
  }, {
    initialRouteName: 'ProgramList',
    headerMode: 'float'
  }
);
