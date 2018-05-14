import { StackNavigator, createStackNavigator } from 'react-navigation';
import CreatePost from './CreatePost';
import PostScreens from './PostScreens';

export const PostNavigator = createStackNavigator(
  {
    ...PostScreens,
    Index: {
      screen: CreatePost
    }
  },
  {
    initialRouteName: 'Index',
    headerMode: 'float'
  }
);
