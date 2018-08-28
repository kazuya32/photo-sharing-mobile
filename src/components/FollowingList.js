import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
} from 'react-native';

import UserTile from '../components/UserTile.js';

class FollowingList extends React.Component {
  state = {
    followingArray: this.props.followingArray,
  }

  componentWillMount() {
    // const { followingObject } = this.props;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <UserTile
      uid={item}
      onPressUser={() => this.props.onPressUser(item)}
    />
  );

  render() {
    if (!this.state.followingArray.length) {
      return (
        <View style={[styles.container, this.props.style]}>
          <Text style={styles.alert}>
            {this.props.emptyAlertText}
          </Text>
        </View>
      );
    }

    return (
      <View style={[styles.container, this.props.style]}>
        <FlatList
          data={this.state.followingArray}
          // data={this.props.followingArray}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          onEndReachedThreshold={0.2}
          // onEndReached={this.reloadPhotos}
          // getItemLayout={(data, index) => (
          extraData={this.state}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  alert: {
    padding: 16,
  },
});

export default FollowingList;
