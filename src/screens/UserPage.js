import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import firebase from 'firebase';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import Profile from '../components/Profile.js';
import Header from '../components/Header.js';
import PhotoCollection from '../components/PhotoCollection.js';
import PhotoCollectionTagged from '../components/PhotoCollectionTagged.js';
import FollowingList from '../components/FollowingList.js';
import PhotoGivingButton from '../elements/PhotoGivingButton.js';

class UserPage extends React.Component {
  state = {
    uid: this.props.navigation.state.params && this.props.navigation.state.params.uid,
    logInUser: this.props.navigation.state.params && this.props.navigation.state.params.logInUser,
    initialized: false,
    // uid:
  }

  componentWillMount() {
    this.fetchData();
  }

  // eslint-disable-next-line
  fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      const uid = this.state.uid || value;
      const isMyPage = (value === uid);
      // const isMyPage = (this.state.uid === this.state.logInUser.id);
      this.setState({
        uid,
        isMyPage,
        logInUid: value,
      });

      this.fetchUser();
      // this.fetchPhotos();

      if (isMyPage) {
        this.fetchRequest();
      }
    } catch (error) {
    //
    }
  }

  fetchUser = () => {
    this.setState({
      followersArray: [],
      followingArray: [],
    });
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(this.state.uid);
    userRef.onSnapshot((doc) => {
      const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
      console.log(source, ' data: ', doc.data());
      const user = {
        id: doc.id,
        data: doc.data(),
      };

      const followersArray = this.makeListFromObject(user.data.followers);
      const followingArray = this.makeListFromObject(user.data.following);

      if (this.state.initialized) {
        if (this.state.isMyPage) {
          this.setState({ user });
        }
      } else {
        this.setState({
          user,
          followersArray,
          followingArray,
          isFollowing: !this.state.isMyPage && user.data.followers[this.state.logInUid],
          // initialized: true,
        });
      }

      if (this.state.isMyPage) {
        this.storeLogInUser(user);
      }
    });
  }

  storeLogInUser = async (logInUser) => {
    try {
      // await AsyncStorage.setItem('uid', logInUser.id);
      await AsyncStorage.setItem('photoURL', logInUser.data.photoURL);
      await AsyncStorage.setItem('name', logInUser.data.name);
      await AsyncStorage.setItem('desc', logInUser.data.desc);
      await AsyncStorage.setItem('isAthlete', logInUser.data.isAthlete.toString());
    } catch (error) {
      // Error saving data
    }
  }

  fetchRequest = () => {
    const db = firebase.firestore();
    const receivedRef = db.collection('requests')
      .where('to', '==', this.state.uid);
      // .orderBy('updatedAt', 'desc');

    const receivedRequests = [];
    receivedRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          receivedRequests.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({ receivedRequests });
      });

    const sentRef = db.collection('requests')
      .where('from', '==', this.state.uid);
    const sentRequests = [];
    sentRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          sentRequests.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({ sentRequests });
      });
    // if (!receivedRequests.length) {
    //   this.setState({ receivedRequests });
    // }
  }

  // eslint-disable-next-line
  makeListFromObject = (obj) => {
    // const count = 0;
    const array = [];
    Object.keys(obj).forEach((prop) => {
      if (obj[prop]) {
        array.push(prop);
      }
    });
    return array;
  };

  storeUserPhoto = async (photoURL) => {
    try {
      await AsyncStorage.setItem('photoURL', photoURL);
    } catch (error) {
      // Error saving data
    }
  }

  onPressUser = (uid) => {
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid,
        // logInUser: this.state.logInUser
        // user: item,
      },
      key: 'UserPage' + uid,
    });
  }

  onPressRequest = () => {
    console.log(this.state.requests);
    this.props.navigation.navigate({
      routeName: 'RequestList',
      params: {
        // uid,
        // logInUser: this.state.logInUser,
        receivedRequests: this.state.receivedRequests,
        sentRequests: this.state.sentRequests,
      },
      // key: 'ViewRequest' + uid,
    });
  }


  handleFollowButton = (nextValue) => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(this.state.uid);
    userRef.update({
      [`followers.${this.state.logInUid}`]: nextValue,
    })
      .then(() => {
        // eslint-disable-next-line
        console.log('Document successfully written!');
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error updating document: ', error);
      });

    const logInUserRef = db.collection('users').doc(this.state.logInUid);
    logInUserRef.update({
      [`following.${this.state.uid}`]: nextValue,
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

  onPressUpload = () => {
    const timestamp = Date.now().toString();
    this.props.navigation.navigate({
      routeName: 'SelectGifts',
      params: {
        user: this.state.user,
      },
      key: 'SelectGifts' + timestamp,
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
    const followersTitle = `Followers ${this.state.followersArray && this.state.followersArray.length}`;
    const followingTitle = `Following ${this.state.followersArray && this.state.followingArray.length}`;

    // const initialPage = (this.state.user && this.state.user.data.isAthlete) ? 1 : 0;

    return (
      <View style={styles.container}>
        <Header
          headerTitle="FLEGO"
          navigation={this.props.navigation}
          logInUser={this.state.logInUser}
        />
        <Profile
          navigation={this.props.navigation}
          logInUser={this.state.logInUser}
          uid={this.state.uid}
          receivedRequests={this.state.receivedRequests}
          sentRequests={this.state.sentRequests}
          user={this.state.user}
          photoURL={this.state.user && this.state.user.data.photoURL}
          isFollowing={this.state.isFollowing}
          handleFollowButton={this.handleFollowButton}
          onPressRequest={this.onPressRequest}
        />

        <ScrollableTabView
          // renderTabBar={this.renderTabBar}
          style={[
            styles.header,
          ]}
          tabBarUnderlineStyle={styles.underline}
          tabBarBackgroundColor="#fff"
          tabBarActiveTextColor="#DB4D5E"
          tabBarInactiveTextColor="black"
          tabBarTextStyle={styles.tabBarText}
          tabStyle={{ paddingBottom: 0 }}
          // initialPage={initialPage}
        >
          <PhotoCollection
            tabLabel="Posts"
            navigation={this.props.navigation}
            uid={this.state.uid}
            logInUser={this.state.logInUser}
          />
          <PhotoCollectionTagged
            tabLabel="Tagged"
            navigation={this.props.navigation}
            uid={this.state.uid}
            logInUser={this.state.logInUser}
          />
          <FollowingList
            tabLabel={followersTitle}
            navigation={this.props.navigation}
            followingArray={this.state.followersArray}
            logInUser={this.state.logInUser}
            logInUid={this.state.logInUid}
            onPressUser={this.onPressUser}
            // numColumns={3}
            // horizontal={true}
          />
          <FollowingList
            tabLabel={followingTitle}
            navigation={this.props.navigation}
            followingArray={this.state.followingArray}
            logInUser={this.state.logInUser}
            logInUid={this.state.logInUid}
            onPressUser={this.onPressUser}
            // numColumns={3}
            // horizontal={true}
          />
        </ScrollableTabView>

        <PhotoGivingButton
          // isAthlete={this.state.user && this.state.user.data.isAthlete}
          isMyPage={this.state.isMyPage}
          onPress={this.onPressUpload}
        />
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
    backgroundColor: '#DB4D5E',
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
