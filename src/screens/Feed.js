import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import PhotoFeed from '../components/PhotoFeed.js';
import Header from '../components/Header.js';

class Feed extends React.Component {
  state = {}

  onPressPhoto = (item) => {
    this.props.navigation.navigate({
      routeName: 'PhotoDetail',
      params: { photo: item },
    });
  }

  render() {
    let feedType = 'home';
    let itemId;
    // let scheduleId;
    if (this.props.navigation.state.params && this.props.navigation.state.params.feedType) {
      feedType = this.props.navigation.state.params.feedType;
      itemId = this.props.navigation.state.params.itemId;
      // scheduleId = this.props.navigation.state.params.scheduleId;
    }
    return (
      <View style={styles.container}>
        <Header
          onPressLeft={() => { this.props.navigation.navigate({ routeName: 'MyPageFun' }); }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle="FLEGO"
        />
        <PhotoFeed
          feedType={feedType}
          itemId={itemId}
          onPressUser={() => { this.props.navigation.navigate({ routeName: 'MyPageFun' }); }}
          onPressPhoto={this.onPressPhoto}
          // scheduleId={scheduleId}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 70,
  },
});

export default Feed;
