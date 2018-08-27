import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  AsyncStorage,
} from 'react-native';
import firebase from 'firebase';

import ReceivedRequestTile from './ReceivedRequestTile.js';
import ReceivedGiftTile from './ReceivedGiftTile.js';

class ReceivedRequests extends React.Component {
  state = {
    receivedItems: [],
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

  fetchRequest = (uid) => {
    const db = firebase.firestore();
    const receivedRef = db.collection('requests')
      .where('to', '==', uid);

    const { receivedItems } = this.state;
    receivedRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { userDeleted } = doc.data();
          if (!userDeleted) {
            receivedItems.push({
              id: doc.id,
              data: doc.data(),
              type: 'request',
            });
          }
        });
        // this.setState({ receivedItems: [] });
        this.setState({ receivedItems });
      });
  }

  fetchGifts = (uid) => {
    const db = firebase.firestore();
    const receivedRef = db.collection('gifts')
      .where('to', '==', uid);

    const { receivedItems } = this.state;
    receivedRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { userDeleted } = doc.data();
          if (!userDeleted) {
            receivedItems.push({
              id: doc.id,
              data: doc.data(),
              type: 'gift',
            });
          }
        });
        // this.setState({ receivedItems: [] });
        this.setState({ receivedItems });
      });
  }

  onPressRequest = (request, user, photo) => {
    if (request.data.downloadByAthlete) {
      this.props.navigation.navigate({
        routeName: 'PhotoDetail',
        params: {
          photo,
        },
        key: 'PhotoDetail' + photo.id,
      });
    } else {
      this.props.navigation.navigate({
        routeName: 'ViewRequest',
        params: {
          request,
          user,
          photo,
        },
        key: 'ViewRequest' + request.id,
      });
    }
  }

  onPressGift = (photo) => {
    this.props.navigation.navigate({
      routeName: 'PhotoDetail',
      params: {
        photo,
      },
      key: 'PhotoDetail' + photo.id,
    });
  }

  sortDescUpdatedAt = (array) => {
    array.sort((a, b) => (a.data.updatedAt - b.data.updatedAt));
    array.reverse();
    return array;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    if (item.type === 'gift') {
      return (
        <ReceivedGiftTile
          gift={item}
          onPress={this.onPressGift}
        />
      );
    }

    return (
      <ReceivedRequestTile
        request={item}
        onPress={this.onPressRequest}
      />
    );
  }

  render() {
    if (!(this.state.receivedItems && this.state.receivedItems.length)) {
      return (
        <View style={styles.container}>
          <Text style={styles.alert}>
             受信アイテムはありません。
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.sortDescUpdatedAt(this.state.receivedItems)}
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

export default ReceivedRequests;
