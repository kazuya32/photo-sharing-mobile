import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
} from 'react-native';
import { Constants } from 'expo';

import PhotoFeed from '../components/PhotoFeed.js';
import Header from '../components/Header.js';
import UploadButton from '../elements/UploadButton.js';

class Home extends React.Component {
  state = {
    headerTitle: 'FLEGO',
    // feedType: 'home',
    // logInUser: null,
  }

  // componentWillMount() {
  //   if (this.props.navigation.state.params && this.props.navigation.state.params.feedType) {
  //     const { feedType, itemId } = this.props.navigation.state.params;
  //     this.setState({ feedType, itemId });
  //   }
  // }
  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      this.setState({ uid: value });
      this.fetchLogInUser();

    } catch (error) {
    //
    }
  }

  fetchLogInUser = () => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(this.state.uid);
    userRef.onSnapshot((doc) => {
      const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
      console.log(source, ' data: ', doc.data());
      const logInUser = {
        id: doc.id,
        data: doc.data(),
      };
      this.setState({ logInUser });
      // if (this.state.isMyPage) {
      //   this.storeUserPhoto(user.photoURL);
      // }
    });
  }

  storeUserPhoto = async (photoURL) => {
    try {
      await AsyncStorage.setItem('photoURL', photoURL);
    } catch (error) {
      // Error saving data
    }
  }

  onPressPhoto = (item) => {
    this.props.navigation.navigate({
      routeName: 'PhotoDetail',
      params: {
        photo: item,
      },
    });
  }

  onPressUser = (item) => {
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid: item,
        logInUser: this.state.logInUser,
        // user: item,
      },
      key: 'UserPage' + item,
    });
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

    // if (!this.state.logInUser) {
    //   return (
    //     <Text style={{ flex: 1, padding: 20, alignSelf: 'center' }}>
    //       ログイン中・・・
    //     </Text>
    //   );
    // }

    return (
      <View style={styles.container}>
        <Header
          onPressLeft={() => {
            this.props.navigation.navigate({
              routeName: 'UserPage',
              params: {
                logInUser: this.state.logInUser,
                // user: item,
              },
              key: 'UserPage' + this.state.uid,
            });
          }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle={this.state.headerTitle}
        />
        <PhotoFeed
          feedType="home"
          // feedType={this.state.feedType}
          itemId={this.state.itemId}
          onPressUser={this.onPressUser}
          onPressPhoto={this.onPressPhoto}
          onPressMatch={this.onPressMatch}
          onPressTeam={this.onPressTeam}
          navigation={this.props.navigation}
          // scheduleId={scheduleId}
        />
        <UploadButton
          onPress={() => { this.props.navigation.navigate({ routeName: 'PhotoPicker' }); }}
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

export default Home;
