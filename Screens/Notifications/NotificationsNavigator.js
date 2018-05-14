import { StackNavigator, createStackNavigator } from 'react-navigation';
import NotificationScreens from './NotificationScreens';
import Notifications from './Notifications/';

export const NotificationsNavigator = createStackNavigator(
  {
    ...NotificationScreens,
    Index: {
      screen: Notifications
    }
  },
  {
    initialRouteName: 'Index',
    headerMode: 'float'
  }
);
