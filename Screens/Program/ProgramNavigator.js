import { createStackNavigator } from 'react-navigation';
import ProgramList from './ProgramList';
import Program from './Program';

export const ProgramNavigator = createStackNavigator(
  {
    ProgramList: {
      name: 'ProgramList',
      screen: ProgramList
    },
    Program: {
      name: 'Program',
      screen: Program
    }
  }, {
    initialRouteName: 'ProgramList',
    headerMode: 'float'
  }
);
