import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import firebase from 'firebase';

import PhotoFeed from '../components/PhotoFeed.js';
import Header from '../components/Header.js';

class Feed extends React.Component {
  state = {
    headerTitle: 'FLEGO',
  }

  componentWillMount() {
    if (this.props.navigation.state.params && this.props.navigation.state.params.feedType) {
      const { feedType, itemId, matchPath } = this.props.navigation.state.params;
      this.setState({ feedType, itemId });
      this.getMatch(matchPath);
    }
  }

  getMatch = (matchPath) => {
    const db = firebase.firestore();
    const Ref = db.doc(matchPath);
    Ref.get().then((doc) => {
      const match = { id: doc.id, data: doc.data() };
      this.setState({ match });
      this.setState({ headerTitle: `${match.data.home.teamName} vs ${match.data.away.teamName}` });
    });
  }

  onPressPhoto = (item) => {
    this.props.navigation.navigate({
      routeName: 'PhotoDetail',
      params: {
        photo: item,
      },
    });
  }

  onPressUser = () => {
    Alert.alert('Pressed');
  }

  onPressMatch = (item) => {
    // this.setState({
    //   feedType: 'match',
    //   itemId: item.id,
    // });
    this.props.navigation.navigate({
      routeName: 'Feed',
      params: {
        feedType: 'match',
        itemId: item.id,
      },
    });
  }

  onPressTeam = (item) => {
    this.setState({
      feedType: 'team',
      itemId: item.id,
    });
    // this.props.navigation.navigate({
    //   routeName: 'TeamFeed',
    //   params: {
    //     feedType: 'team',
    //     itemId: item.id,
    //   },
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          onPressLeft={() => { this.props.navigation.navigate({ routeName: 'MyPageFun' }); }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle={this.state.headerTitle}
        />
        <PhotoFeed
          feedType={this.state.feedType}
          itemId={this.state.itemId}
          onPressUser={() => { this.props.navigation.navigate({ routeName: 'MyPageFun' }); }}
          onPressPhoto={this.onPressPhoto}
          onPressMatch={this.onPressMatch}
          onPressTeam={this.onPressTeam}
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
