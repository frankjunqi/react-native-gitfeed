const React = require('react-native');
const Routes = require('./Routes');
const OnboardComponent = require('./login/OnboardComponent');
const ScrollableTabView = require('react-native-scrollable-tab-view');
const TabBarAndroid = require('./TabBar.android');

const {
  AppRegistry,
  BackAndroid,
  Dimensions,
  DrawerLayoutAndroid,
  StyleSheet,
  ToolbarAndroid,
  View,
} = React;

// 此组件针对android平台：root tab导航的组件

const RootTabComponentAndroid = React.createClass({
  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <ScrollableTabView
          renderTabBar={() => <TabBarAndroid />}
          tabBarPosition={'bottom'}
          >
          {Routes.navigator('feed')}
          {Routes.navigator('explore')}
          {Routes.navigator('trend')}
          {Routes.navigator('me')}
        </ScrollableTabView>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#E9EAED',
    height: 56,
  },
});

module.exports = RootTabComponentAndroid;
