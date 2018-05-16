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
      routes: props.tabs
    };
    this.FirstRoute = () => <PostGrid postDetailDestination={this.props.postDetailDestination} navigation={this.props.navigation} gridItems={this.props.gridItems} />;
    this.SecondRoute = () => <Programs />;
    this.renderScene = SceneMap({
      '1': this.FirstRoute,
      '2': this.SecondRoute,
    });
    this.handleIndexChange = this.handleIndexChange.bind(this);
  }

  handleIndexChange(index) {
    this.setState({ index });
  }

  renderHeader(props) {
    return <TabBar {...props} />;
  }

  render() {
    return (
      <View style={{ height: '100%' }}>
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
