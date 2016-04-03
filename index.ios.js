import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} from 'react-native';

var Login = require('./Login');
var AuthService = require('./AuthService');
var AppContainer = require('./AppContainer');

class GithubBrowser extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    }
  }

  componentDidMount() {
    AuthService.getAuthInfo((err, authInfo) => {
      console.log(authInfo);
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    });
  }

  render() {
    if(this.state.checkingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS
            animating={true}
            size="large"
            style={styles.loader} />
        </View>
      );
    }

    if(this.state.isLoggedIn){
      return(
        <AppContainer />
      )
    }
    else {
      return (
        <Login onLogin={this.onLogin.bind(this)}/>
      );
    }

  }

  onLogin() {
    this.setState({isLoggedIn: true});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
