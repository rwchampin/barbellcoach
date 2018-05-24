import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

const activeTintColor = '#3478f6';
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
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      avatar: nextProps.AuthReducer.user.userProfile.avatar
    });
  }
  renderItem(route, index) {
    const icons = {
      'Search': <Icon name="search" size={35} color={'#000000'} />,
      'Profile': this.state.avatar ? <Image style={{ height: 30, width: 30, borderRadius:15 }} source={{ uri: this.state.avatar }} /> : <View style={{ height:30, width: 30, borderRadius: 15, backgroundColor: 'grey' }} />,
      'Notifications': <Icon name="list" size={35} color={'#000000'} />,
      'Landing': <Icon name="people" size={35} color={'#000000'} />,
      'Capture': <Icon name="camera" size={35} color={'#000000'} />
    }

    const {
      navigation,
      jumpToIndex
    } = this.props;

    const isCapture = route.routeName === 'Capture';

    const focused = index === navigation.state.index;
    const color = focused ? activeTintColor : inactiveTintColor;

    return (
      <TouchableWithoutFeedback
        key={route.key}
        style={styles.tab}
        onPress={() => isCapture ? navigation.navigate('CaptureModal') : jumpToIndex(index)}
      >
        <View style={styles.tab}>
          {icons[route.routeName]}
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
