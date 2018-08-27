import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  AsyncStorage,
} from 'react-native';
import firebase from 'firebase';

import SentRequestTile from './SentRequestTile.js';
import SentGiftTile from './SentGiftTile.js';

class SentItems extends React.Component {
  state = {
    sentItems: [],
  }

  componentWillMount() {
    this.fetchItems();
  }
  // eslint-disable-next-line
  fetchItems = async () => {
    const uid = await AsyncStorage.getItem('uid');
    this.fetchRequest(uid);
    this.fetchGifts(uid);
  }

  // eslint-disable-next-line
  fetchRequest = (uid) => {
    const db = firebase.firestore();
    const sentRef = db.collection('requests')
      .where('from', '==', uid);
    const { sentItems } = this.state;
    sentRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { userDeleted } = doc.data();
          if (!userDeleted) {
            sentItems.push({
              id: doc.id,
              data: doc.data(),
              type: 'request',
            });
          }
        });
        this.setState({ sentItems });
      });
  }

  fetchGifts = (uid) => {
    const db = firebase.firestore();

    const sentRef = db.collection('gifts')
      .where('from', '==', uid);
    const { sentItems } = this.state;
    sentRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { userDeleted } = doc.data();
          if (!userDeleted) {
            sentItems.push({
              id: doc.id,
              data: doc.data(),
              type: 'gift',
            });
          }
        });
        this.setState({ sentItems });
      });
  }

  onPress = (photo) => {
    this.props.navigation.navigate({
      routeName: 'PhotoDetail',
      params: {
        photo,
      },
      key: 'PhotoDetail' + photo.id,
    });
  }

  keyExtractor = (item, index) => index.toString();

  sortDescUpdatedAt = (array) => {
    array.sort((a, b) => (a.data.updatedAt - b.data.updatedAt));
    array.reverse();
    return array;
  }

  renderItem = ({ item }) => {
    if (item.type === 'gift') {
      return (
        <SentGiftTile
          gift={item}
          onPress={this.onPress}
        />
      );
    }

    return (
      <SentRequestTile
        request={item}
        onPress={this.onPress}
      />
    );
  }

  render() {
    if (!(this.state.sentItems && this.state.sentItems.length)) {
      return (
        <View style={styles.container}>
          <Text style={styles.alert}>
             送信アイテムはありません。
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.sortDescUpdatedAt(this.state.sentItems)}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          onEndReachedThreshold={0.2}
          // onEndReached={this.reloadPhotos}
          // extraData={this.state}
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
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});

export default SentItems;
