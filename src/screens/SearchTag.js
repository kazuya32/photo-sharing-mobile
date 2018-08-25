import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import firebase from 'firebase';
import { SearchBar } from 'react-native-elements';

import Header from '../components/Header.js';
import TeamTabView from '../components/TeamTabView.js';
import ScheduleTabView from '../components/ScheduleTabView.js';
import SearchItem from '../components/SearchItem.js';

class SearchTag extends React.Component {
  state = {}

  componentDidMount() {
    const { tagType } = this.props.navigation.state.params;
    if (!(tagType === 'teams' || tagType === 'matches')) {
      this.fetchData();
    }
  }

  // eslint-disable-next-line
  fetchData = () => {
    const { tagType } = this.props.navigation.state.params;
    const db = firebase.firestore();
    let ref;

    switch (tagType) {
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

  onPress = (item) => {
    const { tagType, onPress } = this.props.navigation.state.params;
    onPress(tagType, item);
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    const { tagType, onPress } = this.props.navigation.state.params;
    let title;

    if (tagType === 'matchSchedules') {
      title = item.data.date.toDateString();
      // onPress = this.nav;
      // onPress = {() => { this.props.navigation.goBack(); }}
    } else {
      title = item.data.name;
      // onPress = this.props.navigation.state.params.onPress;
    }

    return (
      <SearchItem
        onPress={() => onPress(tagType, item)}
        title={title}
      />
    );
  }


  render() {
    const { tagType } = this.props.navigation.state.params;
    if (tagType === 'teams') {
      return (
        <View style={{ flex: 1, paddingTop: 80, backgroundColor: '#fff' }}>
          <Header
            navigation={this.props.navigation}
            headerTitle="チームタグをつける"
          />
          <TeamTabView
            onPressTeam={this.onPress}
          />
        </View>
      );
    }

    if (tagType === 'matches') {
      return (
        <View style={{ flex: 1, paddingTop: 80, backgroundColor: '#fff' }}>
          <Header
            navigation={this.props.navigation}
            headerTitle="試合タグをつける"
          />
          <ScheduleTabView
            onPressMatch={this.onPress}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SearchBar
          style={{ display: 'none' }}
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
