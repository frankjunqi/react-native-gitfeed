const React = require('react-native');
const JuheNewsService = require('../../networkService/juheNews/JuheNewsService');
const GHRefreshListView = require('../GHRefreshListView');
const Platform = require('Platform');
const Colors = require('../../commonComponents/Colors');

const {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} = React;

const JuheNewsComponent = React.createClass({

    handleReloadData(response){
      const body = response._bodyInit;
      const jsonResult = JSON.parse(body);
      return jsonResult;
    },

    reloadPath(){
      return JuheNewsService.requestJuheNewsDateFromNetwork("top");
    },

    // 渲染listview的rowcellview
    renderRow(rowData, sectionID, rowID, highlightRow){
      return(
        <Text style={styles.cellText}>
          {rowID}
        </Text>
      )
    },

    // 处理错误页面errorview
    renderErrorPlaceholder(){
      const errorMessage = " error message! ";
      return (
        <Text style={styles.errorCellText}>
          {errorMessage}
        </Text>
      );
    },

    // 渲染juhenews的页面主视图
    render(){
      let marginTop = 44;
      if (Platform.OS === 'ios') {
        marginTop = 0;
      }
      return (
        <GHRefreshListView
          style = {{flex:1, marginTop: marginTop}}
          enablePullToRefresh = {true}
          renderRow = {this.renderRow}
          reloadPromisePath = {this.reloadPath}
          handleReloadData = {this.handleReloadData}
          navigator = {this.props.navigator}
          maxPage = {5}
          contentInset = {{top: 64, left: 0, bottom: 49, right: 0}}
          contentOffset = {{x: 0, y: -64}}
          renderErrorPlaceholder = {this.renderErrorPlaceholder}
        >
        </GHRefreshListView>
      );
    },


  }
);

var styles = StyleSheet.create({
  cellText: {
    borderColor: 'lightGray',
    borderWidth: 1,
    borderRadius: 3,
    marginTop: 20,
    padding: 2,
  },
  errorCellText: {
    borderColor: 'lightGray',
    borderWidth: 1,
    borderRadius: 3,
    marginTop: 20,
    padding: 2,
    backgroundColor: Colors.green,
  }
}
);

module.exports = JuheNewsComponent;
