import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import PostGrid from '../Post/PostGrid';
import Programs from '../Profile/Programs';

export default class TabSections extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: props.routeKeys
    };

    this.renderScene = SceneMap(this.props.routeMap);

    this.handleIndexChange = this.handleIndexChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.renderScene = SceneMap(nextProps.routeMap);
  }

  handleIndexChange(index) {
    this.setState({ index });
  }

  renderHeader(props) {
    return (
      <TabBar
        {...props}
        renderLabel={this.renderLabel}
        style={{ marginBottom: 10, backgroundColor: 'white', margin:0, padding:0, height: 30 }}
        labelStyle={{ color: 'black', margin:0 }}
        indicatorStyle={{ height: 1, backgroundColor: 'black' }}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderHeader={this.renderHeader}
          onIndexChange={this.handleIndexChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
