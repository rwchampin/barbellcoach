import React from 'react';
import { View, Button } from 'react-native';
import { TabNavigator, createStackNavigator } from 'react-navigation';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Camera from './Screens/Camera/Camera';
import { CoachNavigator } from './Screens/Coach/CoachNavigator';
import { NotificationsNavigator } from './Screens/Notifications/NotificationsNavigator';
import { SearchNavigator } from './Screens/Search/SearchNavigator';
import { ProfileNavigator } from './Screens/Profile/ProfileNavigator';
import ChooseLift from './Screens/Coach/ChooseLift';
import TabBar from './TabBar';
import LiftDetail from './Screens/Coach/LiftDetail';
import { ProgramNavigator } from './Screens/Program/ProgramNavigator';

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

const CaptureStack = createStackNavigator({
  Capture: {
    screen: props => <Camera title="Capture" {...props} />,
    navigationOptions: () => ({
      header: null
    })
  },
  AddPostContent: {
    name: 'AddPostContent',
    screen: LiftDetail
  }
});

const ChooseLiftStack = createStackNavigator({
  ChooseLift: {
    screen: props => <ChooseLift {...props} />,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Choose a Lift',
      headerLeft: (
        <Button
          title="Cancel"
          // Note that since we're going back to a different navigator (CaptureStack -> RootStack)
          // we need to pass `null` as an argument to goBack.
          onPress={() => navigation.goBack(null)}
        />
      )
    })
  },
  LiftDetail: {
    screen: LiftDetail
  }
});


const createTabNavigator = (user) => {
  const tabList = {};
  if (user.user.data().userType === 'client') {
    tabList.Programs = {
      screen: ProgramNavigator
    };
  } else {
    tabList.Clients = {
      screen: CoachNavigator
    };
  }
  tabList.Search = {
    screen: SearchNavigator
  };
  tabList.Capture = {
    screen: View
  };
  tabList.Notifications = {
    screen: NotificationsNavigator
  };
  tabList.Profile = {
    screen: ProfileNavigator
  };

  const Tabs = TabNavigator(tabList, {
    // Instagram has the tabbar on the bottom on iOS and Android
    tabBarPosition: 'bottom',
    // Specify our custom navbar
    tabBarComponent: TabBar
  });

  return Tabs;
};


const CreateRootStackNavigator = (user) => {
  const RootStack = createStackNavigator({
    Tabs: {
      screen: createTabNavigator(user)
    },
    CaptureModal: {
      screen: CaptureStack,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ChooseLiftModal: {
      screen: ChooseLiftStack,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  }, {
    headerMode: 'none',
    mode: 'modal'
  });

  return <RootStack />;
};

export { AuthNavigator, CreateRootStackNavigator };
