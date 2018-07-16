import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

import SentRequestTile from './SentRequestTile.js';

class ReceivedRequests extends React.Component {
  state = {
    logInUser: this.props.navigation.state.params && this.props.navigation.state.params.logInUser,
  }

  componentWillMount() {
    // const { followingObject } = this.props;
  }

  // eslint-disable-next-line
  navigateToMyPage = () => {
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid: this.state.logInUser.id,
        // logInUser: this.state.logInUser,
      },
      key: 'UserPage' + this.state.logInUser.id,
    });
  }

  onPress = (photo) => {
    this.props.navigation.navigate({
      routeName: 'PhotoDetail',
      params: {
        photo,
        logInUser: this.state.logInUser,
      },
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <SentRequestTile
      request={item}
      onPress={this.onPress}
    />
  );

  render() {
    // eslint-disable-next-line
    const requests = this.props.navigation.state.params && this.props.navigation.state.params.sentRequests;

    return (
      <View style={styles.container}>
        <FlatList
          data={requests}
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

export default ReceivedRequests;
