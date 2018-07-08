import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Text,
  AsyncStorage,
} from 'react-native';
import firebase from 'firebase';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import Profile from '../components/Profile.js';
import Header from '../components/Header.js';
import PhotoCollection from '../components/PhotoCollection.js';

class UserPage extends React.Component {
  state = {
    uid: this.props.navigation.state.params && this.props.navigation.state.params.uid,
    isMyPage: null,
    logInUser: this.props.navigation.state.params && this.props.navigation.state.params.logInUser,
    // uid:
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      // this.setState({ myUid: value });
      // const user = this.props.navigation.state.params && this.props.navigation.state.params.user;
      const uid = this.state.uid || value;
      // const userId = user && user.id;
      // const uid = user ? user.id : value;
      const isMyPage = (value === uid);
      this.setState({ uid, isMyPage, myUid: value });

      console.log('value');
      console.log(value);
      console.log('isMyPage');
      console.log(this.state.isMyPage);
      console.log('uid');
      console.log(uid);

      this.fetchUser();
      this.fetchPhotos();

      // if (this.state.isMyPage) {
      //   this.setState({ uid: this.props.navigation.state.params.user.id });
      //   this.fetchUser();
      //   this.fetchPhotos();
      // } else {
      //   this.setState({ uid: value });
      //   this.fetchUser();
      //   this.fetchPhotos();
      // }
    } catch (error) {
    //
    }
  }

  fetchUser = () => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(this.state.uid);
    userRef.onSnapshot((doc) => {
      const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
      console.log(source, ' data: ', doc.data());
      const user = {
        id: doc.id,
        data: doc.data(),
      };
      this.setState({
        user,
        followers: user.data.followers,
        following: user.data.following,
        isFollowing: !this.state.isMyPage && user.data.followers[this.state.myUid],
      });
      // if (this.state.isMyPage) {
      //   this.storeUserPhoto(user.photoURL);
      // }
      // if (!this.state.isMyPage) {
      //   this.checkFollowing();
      // }
    });
  }

  // checkFollowing = () => {
  //   const { followers } = this.state;
  //   const isFollowing = (followers[this.state.myUid]);
  //   console.log('isFollowing');
  //   console.log(isFollowing);
  //   this.setState({ isFollowing });
  // }

  // eslint-disable-next-line
  fetchPhotos = () => {
    const db = firebase.firestore();
    const maxResults = 30;
    // const photosRef = db.collection('photos').where('uid', '==', this.state.uid).orderBy('createdAt', 'desc').limit(maxResults);
    const photosRef = db.collection('photos').where('uid', '==', this.state.uid);

    const photos = [];
    photosRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        photos.push({
          id: doc.id,
          data: doc.data(),
        });
        this.setState({ photos });
      });
    });
  }

  storeUserPhoto = async (photoURL) => {
    try {
      await AsyncStorage.setItem('photoURL', photoURL);
    } catch (error) {
      // Error saving data
    }
  }

  handleFollowButton = (nextValue) => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(this.state.uid);
    userRef.update({
      [`followers.${this.state.myUid}`]: nextValue,
    })
      .then(() => {
        // eslint-disable-next-line
        console.log('Document successfully written!');
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error updating document: ', error);
      });

    const logInUserRef = db.collection('users').doc(this.state.myUid);
    logInUserRef.update({
      [`following.${this.state.myUid}`]: nextValue,
    })
      .then(() => {
        // eslint-disable-next-line
        console.log('Document successfully written!');
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error updating document: ', error);
      });
  }

  navigateToMyPage = () => {
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid: this.state.myUid,
        // user: item,
      },
      key: 'UserPage' + this.state.myUid,
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate({
          routeName: 'PhotoDetail',
          params: {
            photo: item,
            uid: this.state.uid,
          },
        });
      }}
    >
      <Image
        style={styles.photoItem}
        source={{ uri: item.data.downloadURL }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  renderTabBar = () => <ScrollableTabBar style={styles.header} activeTab={styles.activeTab} />;

  render() {
    if (!this.state.user) {
      return (
        <View style={{ flex: 1, padding: 100, alignSelf: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    if (!this.state.photos) {
    // if (this.state.photos && this.state.photos.length === 0) {
      return (
        <View style={styles.container}>
          <Header
            onPressLeft={() => { this.props.navigation.navigate({ routeName: 'MyPageFun' }); }}
            onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
            headerTitle="FLEGO"
          />
          <Profile
            userName={this.state.user.data.name}
            userDesc={this.state.user.data.desc}
            photoURL={this.state.user.data.photoURL}
            isMyPage={this.state.isMyPage}
            isFollowing={this.state.isFollowing}
            handleFollowButton={this.handleFollowButton}
            onPress={() => {
              this.props.navigation.navigate({
                routeName: 'EditProfile',
                params: {
                  user: this.state.user,
                  uid: this.state.uid,
                },
              });
            }}
          />
          <ScrollableTabView
            // renderTabBar={this.renderTabBar}
            style={styles.header}
            tabBarUnderlineStyle={styles.underline}
            tabBarBackgroundColor="#fff"
            tabBarActiveTextColor="#DB4D5E"
            tabBarInactiveTextColor="#DB4D5E"
            tabBarTextStyle={styles.tabBarText}
            tabStyle={{ paddingBottom: 0 }}
          >
            <Text style={styles.alert} tabLabel="Posts" >
               投稿画像はありません.
            </Text>
            <PhotoCollection
              tabLabel="Followers"
              navigation={this.props.navigation}
              photos={this.state.photos}
              // numColumns={3}
              // horizontal={true}
            />
            <PhotoCollection
              tabLabel="Following"
              navigation={this.props.navigation}
              photos={this.state.photos}
              // numColumns={3}
              // horizontal={true}
            />
          </ScrollableTabView>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Header
          // onPressLeft={() => { this.props.navigation.navigate({ routeName: 'UserPage' }); }}
          onPressLeft={this.navigateToMyPage}
          // onPressLeft={() => { this.setState({ uid: this.state.myUid }); }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle="FLEGO"
        />
        <Profile
          userName={this.state.user.data.name}
          userDesc={this.state.user.data.desc}
          photoURL={this.state.user.data.photoURL}
          isMyPage={this.state.isMyPage}
          isFollowing={this.state.isFollowing}
          handleFollowButton={this.handleFollowButton}
          onPress={() => {
            this.props.navigation.navigate({
              routeName: 'EditProfile',
              params: {
                user: this.state.user,
                uid: this.state.uid,
              },
            });
          }}
        />
        <ScrollableTabView
          // renderTabBar={this.renderTabBar}
          style={styles.header}
          tabBarUnderlineStyle={styles.underline}
          tabBarBackgroundColor="#fff"
          tabBarActiveTextColor="#DB4D5E"
          tabBarInactiveTextColor="#DB4D5E"
          tabBarTextStyle={styles.tabBarText}
          tabStyle={{ paddingBottom: 0 }}
        >
          <PhotoCollection
            tabLabel="Posts"
            navigation={this.props.navigation}
            photos={this.state.photos}
            // numColumns={3}
            // horizontal={true}
          />
          <PhotoCollection
            tabLabel="Followers"
            navigation={this.props.navigation}
            photos={this.state.photos}
            // numColumns={3}
            // horizontal={true}
          />
          <PhotoCollection
            tabLabel="Following"
            navigation={this.props.navigation}
            photos={this.state.photos}
            // numColumns={3}
            // horizontal={true}
          />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
  },
  photoItem: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderWidth: 1,
    borderColor: '#fff',
  },
  alert: {
    padding: 16,
    // alignSelf: 'center',
  },
  header: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.5,
    // shadowRadius: 1,
    borderBottomWidth: 0,
    paddingBottom: 0,
    // borderBottomColor: '#272C35',
  },
  underline: {
    backgroundColor: '#fff',
    borderWidth: 0,
    // height: 0,
    // borderBottomColor: '#DB4D5E',
  },
  activeTab: {
    borderColor: '#fff',
    borderWidth: 1,
  },
  tabBarText: {
    // alignSelf: 'center',
    // fontSize: 14,
    // borderWidth: 1,
  },
});

export default UserPage;
