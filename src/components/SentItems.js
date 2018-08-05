import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

import SentRequestTile from './SentRequestTile.js';
import SentGiftTile from './SentGiftTile.js';

class SentItems extends React.Component {
  state = {}

  componentWillMount() {
    // const { followingObject } = this.props;
  }

  onPress = (photo) => {
    this.props.navigation.navigate({
      routeName: 'PhotoDetail',
      params: {
        photo,
      },
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
    // eslint-disable-next-line
    const items = this.props.navigation.state.params && this.props.navigation.state.params.sentItems;

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
});

export default SentItems;
