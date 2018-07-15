import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

import ReceivedRequestTile from './ReceivedRequestTile.js';

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
        logInUser: this.state.logInUser,
      },
      key: 'UserPage' + this.state.logInUser.id,
    });
  }

  onPress = (request, user, photo) => {
    this.props.navigation.navigate({
      routeName: 'ViewRequest',
      params: {
        request,
        user,
        photo,
        logInUser: this.state.logInUser,
        // user: item,
      },
      key: 'ViewRequest' + request.id,
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <ReceivedRequestTile
      request={item}
      onPress={this.onPress}
    />
  );

  render() {
    // eslint-disable-next-line
    const requests = this.props.navigation.state.params && this.props.navigation.state.params.receivedRequests;

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
