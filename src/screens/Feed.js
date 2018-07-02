import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { Constants } from 'expo';

import PhotoFeed from '../components/PhotoFeed.js';
import Header from '../components/Header.js';

class Feed extends React.Component {
  state = {
    headerTitle: 'FLEGO',
    feedType: 'home',
  }

  // componentWillMount() {
  //   if (this.props.navigation.state.params && this.props.navigation.state.params.feedType) {
  //     const { feedType, itemId } = this.props.navigation.state.params;
  //     this.setState({ feedType, itemId });
  //   }
  // }

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
    //   itemId: item.data.matchId,
    // });
    this.props.navigation.navigate({
      routeName: 'MatchFeed',
      params: {
        feedType: 'match',
        itemId: item.data.matchId,
        matchPath: item.data.matchPath,
      },
    });
  }

  onPressTeam = (item) => {
    // this.setState({
    //   feedType: 'TeamFeed',
    //   itemId: item.data.teamId,
    // });
    this.props.navigation.navigate({
      routeName: 'TeamFeed',
      params: {
        feedType: 'team',
        itemId: item.data.teamId,
      },
    });
  }

  render() {
    console.log(Constants.statusBarHeight);
    
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
          navigation={this.props.navigation}
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
