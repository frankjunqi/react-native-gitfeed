const React = require('react-native');
const GHRefreshListView = require('../GHRefreshListView');
const UserCell = require('./UserCell');
const Platform = require('Platform');

const UserListComponent = React.createClass({
  // UsetList组件属性
  PropTypes: {
    userListURL: React.PropTypes.string,
  },

  handleReloadData(response) {
    const body = response._bodyInit;
    const jsonResult = JSON.parse(body);
    return jsonResult;
  },

  reloadPath() {
    return this.props.userListURL;
  },

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <UserCell key={rowID} user={rowData} navigator={this.props.navigator}/>
    )
  },

  render() {
    let marginTop = 44;
    if (Platform.OS === 'ios') {
      marginTop = 0;
    }

    return (
      <GHRefreshListView
        style={{flex: 1, marginTop: marginTop}}
        enablePullToRefresh={true}
        renderRow={this.renderRow}
        reloadPromisePath={this.reloadPath}
        handleReloadData={this.handleReloadData}
        navigator={this.props.navigator}
        contentInset={{top: 64, left: 0, bottom: 49, right: 0}}
        contentOffset={{x:0, y: -64}}
        >
      </GHRefreshListView>
    );
  },
});

module.exports = UserListComponent;
