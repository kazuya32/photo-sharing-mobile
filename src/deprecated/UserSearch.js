import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import Header from '../components/Header.js';
import ListItem from '../components/ListItem.js';
// import BackgroundImage from '../../assets/image/background/sample5.jpg';
import BackgroundImage from '../../assets/image/background/sample3.jpg';

class UserSearch extends React.Component {
  state = {
    searchText: '',
    data: [
      { user: 'Athelete 1' },
      { user: 'Athelete 2' },
      { user: 'Athelete 3' },
      { user: 'Athelete 4' },
      { user: 'Athelete 5' },
    ],
  }

  onPressTest = (text) => {
    // Alert.alert('button pressed')
    console.log({ text });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    const text = item.user;

    return (
      <ListItem
        onPress={() => {
          this.props.navigation.navigate({
            routeName: 'Home',
          });
        }}
        text={text}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          logInUser={this.state.logInUser}
          headerTitle="Find Users"
        />
        <Image
          style={styles.bgImage}
          // source={this.state.backgroundImage}
          source={BackgroundImage}
          resizeMode="cover"
        />
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
        <View style={styles.feedArea}>
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={this.keyExtractor}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgImage: {
    opacity: 0.8,
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  feedArea: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  searchBar: {
    backgroundColor: '#EBEBEB',
    borderWidth: 0,
    borderColor: '#fff',
  },
  inputArea: {
    // backgroundColor: '#fff',
  },
});

export default UserSearch;
