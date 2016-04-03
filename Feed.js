'use strict';

var React = require('react-native');

var {
  Text,
  View,
  ListView,
  Component,
  ActivityIndicatorIOS,
  Image
} = React;

var moment = require('moment');

class Feed extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      dataSource: ds, //ds.cloneWithRows(['A','B','C'])
      showProgress: true
    }
  }

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed() {
    require('./AuthService').getAuthInfo((err, authInfo) => {
      //TO DO error handling
      console.log(err);

      var url = 'https://api.github.com/orgs/'
        + 'github'
        + '/events';
      // var url = 'https://api.github.com/users/'
      //   + authInfo.user.login
      //   + '/received_events';

      fetch(url, {
        headers: authInfo.header
      })
      .then((response)=> response.json())
      .then((responseData) => {
        var feedItems = responseData.filter((ev) => ev.type == 'WatchEvent');
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData), //필터링 된 데이터는 별로 없어서 일단 필터링없는걸로
          showProgress: false
        })
      })
    });
  }

  renderRow(rowData) {
    return (
      <View style={{
          flex: 1,
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
          borderColor: '#D7D7D7',
          borderBottomWidth: 1
      }}>
        <Image
          source={{uri: rowData.actor.avatar_url}}
          style={{
            height: 36,
            width: 36,
            borderRadius: 18
          }}
        />

        <View style={{
          paddingLeft: 20
        }}>
          <Text style={{backgroundColor: '#fff'}}>
            {moment(rowData.created_at).fromNow()}
          </Text>
          <Text style={{backgroundColor: '#fff'}}>
            {rowData.type}
          </Text>
          <Text style={{backgroundColor: '#fff'}}>
            from <Text style={{
              fontWeight: '600'
            }}>{rowData.actor.login}</Text>
          </Text>
          <Text style={{backgroundColor: '#fff'}}>
            at <Text style={{
              fontWeight: '600'
            }}>{rowData.repo.name.replace('github/', '')}</Text>
          </Text>
        </View>
      </View>
    );
  }

  render() {
    if(this.state.showProgress) {
      return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#fff'
        }}>
          <ActivityIndicatorIOS size="large" animating={true} />
        </View>
      );
    }
    return (
      <View style={{
          flex: 1,
          justifyContent: 'flex-start',
          paddingTop:20,
          backgroundColor: '#fff'
      }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }

}

module.exports = Feed;
