import { createStackNavigator } from 'react-navigation';
import ProgramList from './ProgramList';
import Program from './Program';
import TrainingDay from './TrainingDay';

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
    TrainingDay: {
      name: 'TrainingDay',
      screen: TrainingDay
    }
  }, {
    initialRouteName: 'ProgramList',
    headerMode: 'float'
  }
);
