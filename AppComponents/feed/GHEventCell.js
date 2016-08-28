const React = require('react-native');
const Colors = require('../../commonComponents/Colors');
const CommonComponents = require('../../commonComponents/CommonComponents');
const DXRNUtils = require('../../commonComponents/DXRNUtils');

const {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} = React;

const GHEventCell = React.createClass({
  // GHCell 属性的设置, 并且 属性需要的值是 object
  propTypes: {
    ghEvent: React.PropTypes.object,
  },

  // 定义action 类型 ,仅仅是为了 显示文案
  actionForEvent(ghEvent) {
    let action = 'Started';
    if (ghEvent.type === 'ForkEvent') {
      action = 'Forked';
    } else if (ghEvent.type === 'WatchEvent') {
      action = 'Started';
    } else if (ghEvent.type === 'PushEvent') {
      action = 'Pushed';
    } else if (ghEvent.type === 'IssueCommentEvent') {
      let realActoin = ghEvent.payload.action;
      action = realActoin + ' comment'
    } else if (ghEvent.type === 'PullRequestEvent') {
      let realActoin = ghEvent.payload.action;
      action = realActoin + ' pull request';
    } else if (ghEvent.type === 'MemberEvent') {
      action = ghEvent.payload.action;
    } else if (ghEvent.type === 'IssuesEvent') {
      let realActoin = ghEvent.payload.action;
      action = realActoin + ' issue ' + '"' +  ghEvent.payload.issue.title + '" ';
    } else if (ghEvent.type === 'PullRequestReviewCommentEvent') {
      let realActoin = ghEvent.payload.action;
      action = realActoin + ' pull request' + ' comment on';
    } else if (ghEvent.type === 'DeleteEvent') {
      action = 'Delete';
    } else if (ghEvent.type === 'CreateEvent') {
      action = 'Create';
    }

    return action;
  },

  // 获取 detail component 根据 ghEvnet
  detailComponentForEvent(ghEvent) {
    let detail;

    if (ghEvent.type === 'PushEvent') {
      const payloadCommits = ghEvent.payload.commits;
      let cpCommits = [];
      // 遍历 list 数据
      payloadCommits.forEach((commit) => {
        const sha = commit.sha.slice(0, 6);
        const cp = (
          <Text style={[styles.linkText, {fontSize: 13}]}>
            {sha + ' '}
            <Text style={[styles.commentText, {marginTop: 3}]}>
              {commit.message}
            </Text>
          </Text>
        )
        // 向 list 中插入一条数据
        cpCommits.push(cp);
      })
      const father = (
        <View style={styles.textDesContainer}/>
      );
      // ?? React.cloneElement
      detail = React.cloneElement(father, {}, cpCommits);
    } else if (ghEvent.type === 'IssueCommentEvent') {
      const comment = ghEvent.payload.comment.body;
      detail = (
        <View style={styles.textDesContainer}>
          <Text style={[styles.commentText, {marginTop: 3}]}>
            {comment}
          </Text>
        </View>
      )
    } else if (ghEvent.type === 'PullRequestEvent') {
      const reqDes = ghEvent.payload.pull_request.title;
      detail = (
        <View style={styles.textDesContainer}>
          <Text style={[styles.commentText, {marginTop: 3}]}>
            {reqDes}
          </Text>
        </View>
      )
    } else if (ghEvent.type === 'PullRequestReviewCommentEvent') {
      const comment = ghEvent.payload.comment.body;
      detail = (
        <View style={styles.textDesContainer}>
          <Text style={[styles.commentText, {marginTop: 3}]}>
            {comment}
          </Text>
        </View>
      )
    } else if (ghEvent.type === 'DeleteEvent' || ghEvent.type === 'CreateEvent') {
      const payload = ghEvent.payload;
      const comment = payload.ref_type + ' ' + payload.ref;
      detail = (
        <View style={styles.textDesContainer}>
          <Text style={[styles.commentText, {marginTop: 3}]}>
            {comment}
          </Text>
        </View>
      )
    }

    return detail;
  },

  // 打开 repo 模块
  openTargetRepo() {
    // 获取 GHCell 属性的值 object对象
    const ghEvent = this.props.ghEvent;
    let targetRepo = ghEvent.repo;
    if (targetRepo) {
      targetRepo.html = 'https://github.com/' + targetRepo.name + '/blob/master/README.md';
      targetRepo.title = targetRepo.name;
      // push 到一个新的页面
      this.props.navigator.push({id: 'web', obj: targetRepo});
    }
    //  类似于 跟踪事件
    DXRNUtils.trackClick('clickRepo', {name: '首页open repo'});
  },

  // 打开 Author 模块
  openAuthor() {
    const ghEvent = this.props.ghEvent;
    const user = ghEvent.actor;
    if (user) {
      // push 到 user 模块
      this.props.navigator.push({id: 'user', obj: user});
    }
    DXRNUtils.trackClick('clickUser', {name: '首页open user'});
  },

  // 打开 webview 模块
  openWebEvent() {
    // 获取 GHCell 属性值 object
    const ghEvent = this.props.ghEvent;
    // 具体关于跳转链接url
    let targetRepo = ghEvent.repo;
    switch (ghEvent.type) {
      case 'PushEvent':
        targetRepo.html = 'https://github.com/' + this.props.repo.name + '/blob/master/README.md';
        break;
      case 'IssuesEvent':
      case 'IssueCommentEvent': {
        targetRepo.html = ghEvent.payload.issue.html_url;
        targetRepo.title = ghEvent.payload.issue.title;
      }
        break;
      case 'PullRequestEvent': {
        targetRepo.html = ghEvent.payload.pull_request.html_url;
        targetRepo.title = ghEvent.payload.pull_request.title;
      }
        break;
      default:
        targetRepo.html = 'https://github.com';
    }
    // push 到 webview 页面
    this.props.navigator.push({id: 'web', obj: targetRepo});
    // 类似事件跟踪
    DXRNUtils.trackClick('clickFeedCell', {name: targetRepo.html});
  },

  // 具体 cell action 事件
  cellAction() {
    const ghEvent = this.props.ghEvent;
    switch (ghEvent.type) {
      case 'PushEvent':
        return this.openTargetRepo;
      case 'IssueCommentEvent':
      case 'IssuesEvent':
        return this.openWebEvent;
      case 'PullRequestEvent':
        return this.openWebEvent;
      default:
        return this.openTargetRepo;
    }
  },

  // 处理 发布时间 距离现在当前时刻 的距离 ago
  timesAgo() {
    const ghEvent = this.props.ghEvent;
    const currentDate = new Date();
    const ghDate = new Date(ghEvent.created_at);

    return this.timeDifference(currentDate.getTime(), ghDate.getTime());
  },

  timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;
    var elapsed = Math.max(0, elapsed);

    if (elapsed < msPerMinute) {
      return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
      return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
      return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
      return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
      return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
    }
  },

  // 渲染页面
  render() {
    const ghEvent = this.props.ghEvent;
    // console.log('ghEvent is: ' + JSON.stringify(ghEvent));
    const author = ghEvent.actor;
    const timesAgo = this.timesAgo();
    const targetRepo = ghEvent.repo;

    // MemberEvent 类型下的view
    let textContainer;
    if (ghEvent.type === 'MemberEvent') {
      const to = ' to ';
      textContainer = (
        <View style={styles.textActionContainer}>
          <Text style={styles.linkText} onPress={this.openAuthor}>
            {author.login + ' '}
            <Text style={styles.actionText}>
              {this.actionForEvent(ghEvent) + ' '}
              <Text style={styles.linkText} onPress={this.openTargetUser}>
                {ghEvent.payload.member.login}
                  <Text style={styles.normalText}>
                    {to}
                    <Text style={styles.linkText} onPress={this.openTargetRepo}>
                      {targetRepo.name}
                    </Text>
                  </Text>
              </Text>
            </Text>
          </Text>
        </View>
      )
    } else {
      textContainer = (
        <View style={styles.textActionContainer}>
          <Text style={styles.actionText}>
            {this.actionForEvent(ghEvent) + ' '}
            <Text style={styles.linkText} onPress={this.openTargetRepo}>
              {targetRepo.name}
            </Text>
          </Text>
        </View>
      )
    }
    // MemberEvent 类型下的view or 非MemberEvent 类型下的view
    // detail view CommonComponents view
    // line view
    return (
      <TouchableHighlight underlayColor={'lightGray'} onPress={this.cellAction()}>
        <View style={styles.cellContentView}>
          <View style={styles.cellUp}>
            <TouchableOpacity onPress={this.openAuthor}>
              <Image
                source={{uri: author.avatar_url}}
                style={styles.avatar}
              />
            </TouchableOpacity>
          <Text style={styles.username} onPress={this.openAuthor}>
              {author.login}
            </Text>
            <Text style={styles.createAt}>{timesAgo}</Text>
          </View>

          {textContainer}

          {this.detailComponentForEvent(ghEvent)}

          {CommonComponents.renderSepLine()}
        </View>
      </TouchableHighlight>
    );
  },
});

const styles = StyleSheet.create({
  cellContentView: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'stretch',
  },
  cellUp: {
    margin: 10,
    height: 40,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: Colors.backGray
  },
  username: {
    marginLeft: 10,
    color: '#4078C0',
    fontSize: 15,
  },
  textActionContainer: {
    margin: 10,
    marginTop: 7,
    marginBottom: 10,
    marginLeft: 7,
  },
  textDesContainer: {
    margin: 10,
    marginTop: -5,
    marginBottom: 10,
    marginLeft: 25,
    borderStyle: 'dashed',
  },
  linkText: {
    color: '#4078C0',
    fontSize: 15,
    fontWeight: 'normal',
  },
  actionText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  normalText: {
    color: '#666666',
    fontSize: 15,
    fontWeight: 'normal',
  },
  commentText: {
    color: Colors.textGray,
  },
  createAt: {
    marginLeft: 10,
    marginTop: 2,
    fontSize: 11,
    color: '#BFBFBF',
  },
});

module.exports = GHEventCell;
