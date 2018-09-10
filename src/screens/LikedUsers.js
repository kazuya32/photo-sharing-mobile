import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
} from 'react-native';
import { Segment } from 'expo';

import Header from '../components/Header.js';
import UserTile from '../components/UserTile.js';


class LikedUsers extends React.Component {
  state = {
    headerTitle: 'Likes',
  }

  componentWillMount() {
    Segment.screen('LikedUsers');
  }

  componentDidMount() {
    this.fetchLikes();
  }

  // eslint-disable-next-line
  fetchLikes = async () => {
    const photo = this.props.navigation.state.params && this.props.navigation.state.params.photo;
    const { likes } = photo.data;
    const likedUsers = this.makeListFromObject(likes);
    const likesSum = likedUsers.length;
    const headerTitle = `${likesSum} Likes`;
    this.setState({ likedUsers, headerTitle });
  }

  // eslint-disable-next-line
  makeListFromObject = (obj) => {
    // const count = 0;
    const array = [];
    Object.keys(obj).forEach((prop) => {
      if (prop !== 'undefined' && obj[prop]) {
        array.push(prop);
      }
    });
    return array;
  };

  onPressUser = (item) => {
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid: item,
      },
      key: 'UserPage' + item,
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <UserTile
      uid={item}
      onPressUser={() => this.onPressUser(item)}
    />
  );

  render() {
    if (this.state.likedUsers && !this.state.likedUsers.length) {
      return (
        <View style={[styles.container, this.props.style]}>
          <Header
            headerTitle={this.state.headerTitle}
            navigation={this.props.navigation}
          />
          <Text style={styles.alert}>
            現在このフォトにLikeしているユーザーは0人です。
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Header
          headerTitle={this.state.headerTitle}
          navigation={this.props.navigation}
        />
        <FlatList
          data={this.state.likedUsers}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          onEndReachedThreshold={0.2}
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
  alert: {
    padding: 16,
  },
});

export default LikedUsers;
