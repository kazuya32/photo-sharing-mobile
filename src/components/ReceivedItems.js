import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
} from 'react-native';

import ReceivedRequestTile from './ReceivedRequestTile.js';
import ReceivedGiftTile from './ReceivedGiftTile.js';

class ReceivedRequests extends React.Component {
  state = {}

  componentWillMount() {
    // const { followingObject } = this.props;
  }

  onPressRequest = (request, user, photo) => {
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

  onPressGift = (photo) => {
    this.props.navigation.navigate({
      routeName: 'PhotoDetail',
      params: {
        photo,
      },
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
    // eslint-disable-next-line
    const items = this.props.navigation.state.params && this.props.navigation.state.params.receivedItems;

    if (!(items && items.length)) {
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
          data={this.sortDescUpdatedAt(items)}
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
