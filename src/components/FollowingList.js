import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

import UserTile from '../components/UserTile.js';

class FollowingList extends React.Component {
  state = {
    logInUser: this.props.logInUser,
    followingArray: this.props.followingArray,
  }

  componentWillMount() {
    // const { followingObject } = this.props;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <UserTile
      uid={item}
      logInUser={this.state.logInUser}
      logInUid={this.props.logInUid}
      onPressUser={() => this.props.onPressUser(item)}
      // isFollowing={this.state.logInUser.following[item]}
      // handleFollowButton
    />
  );

  render() {
    console.log('this.props.followingList in list');
    console.log(this.props.followingArray);

    return (
      <View style={[styles.container, this.props.style]}>
        <FlatList
          data={this.state.followingArray}
          // data={this.props.followingArray}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          onEndReachedThreshold={0.2}
          // onEndReached={this.reloadPhotos}
          getItemLayout={(data, index) => (
           { length: 400, offset: 400 * index, index }
          )}
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
});

export default FollowingList;
