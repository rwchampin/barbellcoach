import { createStackNavigator } from 'react-navigation';
import ProgramList from './ProgramList';
import Program from './Program';
import TrainingSession from './TrainingSession';

export const ProgramNavigator = createStackNavigator(
  {
    ProgramList: {
      name: 'ProgramList',
      screen: ProgramList
    },
    Program: {
      name: 'Program',
      screen: Program
    },
    TrainingSession: {
      name: 'TrainingSession',
      screen: TrainingSession
    }
  }, {
    initialRouteName: 'ProgramList',
    headerMode: 'float'
  }
);
