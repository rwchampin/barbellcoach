import React from 'react';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Camera from './Screens/Camera/Camera';
import { CoachNavigator } from './Screens/Coach/CoachNavigator';
import { NotificationsNavigator } from './Screens/Notifications/NotificationsNavigator';
import { SearchNavigator } from './Screens/Search/SearchNavigator';
import { ProfileNavigator } from './Screens/Profile/ProfileNavigator';
import { ClientNavigator } from './Screens/Coach/ClientNavigator';
import { PostNavigator } from './Screens/Post/PostNavigator';

const AuthNavigator = () => {
  const SignUpNavigator = createStackNavigator({
    Signup: {
      screen: Signup,
      navigationOptions: {
        title: 'Sign Up'
      }
    }
  }, {
    mode: 'modal'
  });

  const AuthStackNavigator = createStackNavigator({
    Login: {
      screen: Login,
      navigationOptions: {
        title: 'Log In'
      }
    },
    Signup: {
      screen: SignUpNavigator
    }
  }, {
    gesturesEnabled: false,
    mode: 'modal',
    initialRouteName: 'Login'
  });

  return (
    <AuthStackNavigator />
  );
};

const CameraNavigator = createStackNavigator({
  Camera: {
    screen: Camera
  }
})

const AppNavigator = (user) => {
  const landing = user.user.data().userType === 'client' ? (
    {
      screen: ClientNavigator,
      navigationOptions: {
        tabBarLabel: 'Trainin',
        tabBarIcon: ({ tintColor }) => <Icon name="people" size={35} color={tintColor} />
      }
    }
  ) : (
    {
      screen: CoachNavigator,
      navigationOptions: {
        tabBarLabel: 'Clients',
        tabBarIcon: ({ tintColor }) => <Icon name="people" size={35} color={tintColor} />
      }
    }
  );

  const Tabs = createBottomTabNavigator({
    LandingPage: landing,
    Search: {
      screen: SearchNavigator,
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor }) => <Icon name="search" size={35} color={tintColor} />
      }
    },
    Camera: {
      screen: PostNavigator,
      navigationOptions: {
        tabBarLabel: 'New Post',
        tabBarIcon: ({ tintColor }) => <Icon name="camera" size={35} color={tintColor} />
      }
    },
    Notifications: {
      screen: NotificationsNavigator,
      navigationOptions: {
        tabBarLabel: 'Notifications',
        tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
      }
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => <Image resizeMode="cover" style={{ height: 25, width: 25, borderRadius: 12.5 }} source={{ uri: user.user.data().avatar }} />
      }
    }
  });
  return <Tabs screenProps={user} />;
};

export { AuthNavigator, AppNavigator };
