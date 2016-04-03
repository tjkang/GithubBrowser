'use strict';

var React = require('react-native');

var {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Component,
  StyleSheet,
} = React;

var SearchResults = require('./SearchResults');

class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={(text) => this.setState({
            searchQuery: text
          })}
          style={styles.input}
          placeholder="Search Query" />
        <TouchableHighlight
          onPress={this.onSearchPressed.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>
      </View>
    );
  }

  onSearchPressed() {
    this.props.navigator.push({
      component: SearchResults,
      title: 'Results',
      passProps: {
        searchQuery: this.state.searchQuery
      }
    });
  }

}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    padding: 10
  },
  heading: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: "red",
    paddingTop: 10
  }

})

module.exports = Search;
