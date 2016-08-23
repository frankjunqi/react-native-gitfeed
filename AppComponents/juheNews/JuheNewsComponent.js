const React = require('react-native');
const Colors = require('../../commonComponents/Colors');
const JuheNewsService = require('../../networkService/juheNews/JuheNewsService');
const GHRefreshListView = require('../GHRefreshListView');
const Platform = require('Platform');
const CommonComponents = require('../../commonComponents/CommonComponents');

const {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} = React;

const JuheNewsComponent = React.createClass({

    handleReloadData(response){
      const body = response._bodyInit;
      const jsonResult = JSON.parse(body);
      return jsonResult.result.data;
    },

    reloadPath(){
      return JuheNewsService.getJuheNewsUrl("junshi");
    },

    cellAction(){
      console.log("cell Action");
    },

    // 渲染listview的rowcellview
    renderRow(rowData, sectionID, rowID, highlightRow){
      return(
        <TouchableHighlight underlayColor = {'lightGray'} onPress = {this.cellAction()}>
          <View style={styles.cellContentView}>
            <View style={styles.cellUp}>
              <TouchableOpacity>
                <Image
                  source={{uri: rowData.thumbnail_pic_s}}
                  style={styles.avatar}
                />
              </TouchableOpacity>
              <Text numberOfLines = {2} style={styles.newsTitle}>{rowData.title}</Text>
              <Text style={styles.subDesc}>{rowData.type}{rowData.realtype}{'. '}{rowData.author_name}</Text>
              <Text style={styles.subDesc}>{rowData.date}</Text>
            </View>
            {CommonComponents.renderSepLine()}
          </View>
        </TouchableHighlight>
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
          maxPage = {10}
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
  // Row Cell ContentView
  cellContentView:{
    flexDirection: 'column',
    flex: 1,
    alignItems: 'stretch',
  },

  cellUp: {
    margin: 10,
    height: 80,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 1,
  },

  avatar: {
    width: 70,
    height: 70,
    backgroundColor: Colors.backGray
  },

  newsTitle: {
    marginLeft: 10,
    marginRight: 70,
    color: '#4078C0',
    fontSize: 14,
  },

  subDesc: {
    marginLeft: 10,
    marginTop: 2,
    fontSize: 11,
    color: '#BFBFBF',
  },

  cellText: {
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
