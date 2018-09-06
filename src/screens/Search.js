import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import SelectItem from '../components/SelectItem.js';
import Header from '../components/Header.js';

class Search extends React.Component {
  state = {
    headerTitle: '探す',
  }

  onPressAthlete = () => {
    this.props.navigation.navigate({
      routeName: 'PlayerList',
    });
  }

  onPressTeam = () => {
    this.props.navigation.navigate({
      routeName: 'Team',
    });
  }

  onPressMatch = () => {
    this.props.navigation.navigate({
      routeName: 'Schedule',
    });
  }

  onPressUser = () => {
    this.props.navigation.navigate({
      routeName: 'SearchUser',
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
          onPress={this.onPressAthlete}
          title="公式アスリート"
          itemColor="black"
        />
        <SelectItem
          onPress={this.onPressTeam}
          title="Jリーグチーム"
          itemColor="black"
        />
        <SelectItem
          onPress={this.onPressMatch}
          title="公式マッチ"
          itemColor="black"
        />
        <SelectItem
          onPress={this.onPressUser}
          title="ユーザーを探す"
          itemColor="black"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
