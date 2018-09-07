import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Platform,
} from 'react-native';
import firebase from 'firebase';
import { SearchBar } from 'react-native-elements';

import Header from '../components/Header.js';
import UserSectionItem from '../components/UserSectionItem.js';


class SearchUser extends React.Component {
  state = {
    searchText: '',
  }

  componentDidMount() {
  }

  // eslint-disable-next-line
  searchUser = async (searchText) => {
    if (searchText) {
      const db = firebase.firestore();
      const ref = db.collection('users').where('name', '==', searchText);
      const users = [];
      ref.get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            users.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          this.setState({ users });
        });
    } else {
      this.setState({ users: null });
    }
  }

  onPressUser = (item) => {
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid: item.id,
        logInUser: this.state.logInUser,
        // user: item,
      },
      key: 'UserPage' + item.id,
    });
  }

  // clearUsers = () => {
  //   this.setState({ users: [] });
  // }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <UserSectionItem
      user={item}
      onPress={() => {
        if (this.props.navigation.state.params && this.props.navigation.state.params.onPress) {
          this.props.navigation.state.params.onPress(item);
        } else {
          this.onPressUser(item);
        }
      }}
    />
  );


  render() {
    return (
      <View style={styles.container}>
        <Header
          headerTitle="ユーザー検索"
          navigation={this.props.navigation}
        />
        <SearchBar
          lightTheme
          clearIcon
          onChangeText={(searchText) => {
            if (Platform.OS === 'android') { this.setState({ searchText }); }
            this.searchUser(searchText);
          }}
          onClear={searchText => this.onPressTest({ searchText })}
          // onClear={this.clearUsers}
          placeholder="名前が一致したユーザーを一覧表示します"
          value={this.state.searchText}
          // onBlur={(searchText) => { this.setState({ searchText }); }}
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.input}
          inputStyle={styles.inputText}
        />
        <FlatList
          data={this.state.users}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          extraData={this.state}
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
  searchBar: {
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
  },
  inputText: {
    backgroundColor: '#fff',
  },
});

export default SearchUser;
