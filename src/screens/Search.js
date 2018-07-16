import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import SelectItem from '../components/SelectItem.js';
import Header from '../components/Header.js';

class Search extends React.Component {
  state = {
    logInUser: this.props.navigation.state.params && this.props.navigation.state.params.logInUser,
    headerTitle: 'FLEGO',
  }

  onPressPlayer = () => {
    this.props.navigation.navigate({
      routeName: 'PlayerList',
      params: {
        logInUser: this.state.logInUser,
      },
    });
  }

  onPressTeam = () => {
    console.log(this.props.navigation.state.params && this.props.navigation.state.params.logInUser);
    this.props.navigation.navigate({
      routeName: 'Team',
      params: {
        logInUser: this.state.logInUser,
      },
    });
  }

  onPressMatch = () => {
    this.props.navigation.navigate({
      routeName: 'Schedule',
      params: {
        logInUser: this.state.logInUser,
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          headerTitle={this.state.headerTitle}
          navigation={this.props.navigation}
          logInUser={this.state.logInUser}
        />
        <SelectItem
          onPress={this.onPressPlayer}
          title="公式アスリートから探す"
          itemColor="black"
        />
        <SelectItem
          onPress={this.onPressTeam}
          title="チームから探す"
          itemColor="black"
        />
        <SelectItem
          onPress={this.onPressMatch}
          title="公式試合から探す"
          itemColor="black"
        />
      </View>
    );
  }
}

// <SearchBar
//   lightTheme
//   onChangeText={searchText => this.setState({ searchText })}
//   onClear={searchText => this.onPressTest({ searchText })}
//   placeholder="Search"
//   value={this.state.searchText}
//   showLoading
//   containerStyle={styles.searchBar}
//   inputContainerStyle={styles.inputArea}
// />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  item: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  itemTitle: {
    fontSize: 18,
  },
});

export default Search;
