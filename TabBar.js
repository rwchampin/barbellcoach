import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import BarbellAvatar from './Screens/Common/BarbellAvatar'

const activeTintColor = '#000000';
const inactiveTintColor = '#929292';
const styles = StyleSheet.create({
  tabBar: {
    height: 49,
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .3)',
    backgroundColor: '#f7f9fc'
  },
  tab: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: ''
    }
    this.renderItem = this.renderItem.bind(this);
    this.renderIcon = this.renderIcon.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      avatar: nextProps.AuthReducer.user.userProfile.avatar
    });
  }
  renderIcon(route, focused) {
    const color = focused ? activeTintColor : inactiveTintColor;
    let active = false;
    if (route === 'Profile' && focused) {
      active = true;
    }
    const icons = {
      'Clients': <Icon name="people" size={35} color={color} />,
      'Programs': <Icon name="list" size={35} color={color} />,
      'Search': <Icon name="search" size={35} color={color} />,
      'Profile': <BarbellAvatar size="small" active={active} source={this.state.avatar} />,
      'Notifications': <Icon name="email" size={35} color={color} />,
      'Landing': <Icon name="people" size={35} color={color} />,
      'Capture': <Icon name="camera" size={35} color={color} />
    };

    return icons[route];
  }

  renderItem(route, index) {
    const {
      navigation,
      jumpToIndex
    } = this.props;

    const isCapture = route.routeName === 'Capture';

    const focused = index === navigation.state.index;

    return (
      <TouchableWithoutFeedback
        key={route.key}
        style={styles.tab}
        onPress={() => isCapture ? navigation.navigate('CaptureModal') : jumpToIndex(index)}
      >
        <View style={styles.tab}>
          { this.renderIcon(route.routeName, focused) }
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {
      navigation,
    } = this.props;

    const {
      routes,
    } = navigation.state;

    return (
      <View style={{ height: 75, backgroundColor: '#f7f9fc' }}>
        <View style={styles.tabBar}>
          {routes && routes.map(this.renderItem)}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(TabBar);
