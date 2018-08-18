import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import firebase from 'firebase';
import { SearchBar } from 'react-native-elements';

import SearchItem from '../components/SearchItem.js';

class SearchTag extends React.Component {
  state = {}

  componentDidMount() {
    this.fetchTeams();
  }

  fetchTeams = () => {
    const { tagType } = this.props.navigation.state.params;
    const db = firebase.firestore();
    let ref;

    switch (tagType) {
      case 'teams':
        ref = db.collection('teams');
        break;
      case 'matchSchedules':
        ref = db.collection('matchSchedules');
        break;
      case 'matches':
        ref = db.collection(`matchSchedules/${this.props.navigation.state.params.scheduleId}/matches`);
        break;

      default:
        ref = db.collection(tagType);
        break;
    }

    const array = [];
    ref.get().then((querySnapshot) => {
      // console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().name);
        array.push({ id: doc.id, data: doc.data() });
      });
      this.setState({ array });
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    const itemWithParent = item;
    const { tagType, onPress } = this.props.navigation.state.params;
    // 親のidを付加しないと後にfull pathを参照できなくなる
    itemWithParent.data.scheduleId = this.props.navigation.state.params.scheduleId;
    const title = `${item.data.home.teamName} vs ${item.data.away.teamName}`;

    return (
      <SearchItem
        onPress={() => onPress(tagType, itemWithParent)}
        title={title}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme
          onChangeText={searchText => this.setState({ searchText })}
          onClear={searchText => this.onPressTest({ searchText })}
          placeholder="Search"
          value={this.state.searchText}
          showLoading
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.inputArea}
        />
        <FlatList
          data={this.state.array}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
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

export default SearchTag;
