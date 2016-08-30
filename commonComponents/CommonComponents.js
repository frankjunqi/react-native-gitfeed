const React = require('react-native');
const Colors = require('./Colors');
const CommonStyles = require('./CommonStyles');
const Platform = require('Platform');

const {
  StyleSheet,
  View,
  ActivityIndicatorIOS,
  Text,
  ProgressBarAndroid,
} = React;

// 工具类
// static 静态方法，直接类名＋方法名直接调用功能
class CommonComponents {

  // 渲染loadingview
  static renderLoadingView() {
    if (Platform.OS === 'android') {
      return (
        <View style={CommonStyles.container}>
          <ProgressBarAndroid styleAttr="Inverse"/>
        </View>
      )
    } else if (Platform.OS === 'ios') {
      return (
        <View style={CommonStyles.container}>
          <ActivityIndicatorIOS size="small" />
        </View>
      );
    }
  }

  // 返回一个 空view
  static renderPlaceholder(text, image, onPress) {
    return (
      <View>
      </View>
    )
  }

  // 返回line view
  static renderSepLine() {
    return (
      <View style={CommonStyles.sepLine}>
      </View>
    )
  }
}

module.exports = CommonComponents;
