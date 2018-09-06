import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import { Constants } from 'expo';
import firebase from 'firebase';

import designLanguage from '../../designLanguage.json';
import HeaderLeftButton from '../elements/HeaderLeftButton.js';
import UserIcon from '../elements/UserIcon.js';

class HomeHeader extends React.Component {
  state = {
    receivedRequests: [],
    sentRequests: [],
    receivedGifts: [],
    // sentGifts: [],
  }

  componentWillMount() {
    this.initAuthState();
    // this.retrieveUser();
  }


  initAuthState = async () => {
    const uid = await AsyncStorage.getItem('uid');
    this.fetchLogInUser(uid);
    this.fetchRequest(uid);
    this.fetchGifts(uid);
  }

  // retrieveUser = async () => {
  //   try {
  //     const uid = await AsyncStorage.getItem('uid');
  //     const photoURL = await AsyncStorage.getItem('photoURL');
  //     const isAthlete = await AsyncStorage.getItem('isAthlete');
  //
  //
  //     // if (photoURL !== null && isAthlete !== null) {
  //     const value = (isAthlete === 'true');
  //     this.fetchRequest(uid);
  //     this.fetchGifts(uid);
  //     this.setState({ uid, photoURL, isAthlete: value });
  //     // }
  //   } catch (error) {
  //   //
  //   }
  // }

  fetchLogInUser = (uid) => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(uid);
    userRef.onSnapshot((doc) => {
      // const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
      if (doc.exists) {
        const user = {
          id: doc.id,
          data: doc.data(),
        };
        this.storeLogInUser(user);
        this.setState({
          uid,
          photoURL: user.data.photoURL,
          isAthlete: user.data.isAthlete,
        });
      }
    });
  }

  storeLogInUser = async (logInUser) => {
    try {
      // await AsyncStorage.setItem('uid', logInUser.id);
      await AsyncStorage.setItem('photoURL', logInUser.data.photoURL);
      // await AsyncStorage.setItem('name', logInUser.data.name);
      // await AsyncStorage.setItem('desc', logInUser.data.desc);
      await AsyncStorage.setItem('isAthlete', logInUser.data.isAthlete.toString());
    } catch (error) {
      // Error saving data
    }
  }

  fetchRequest = (uid) => {
    const db = firebase.firestore();
    const receivedRef = db.collection('requests')
      .where('to', '==', uid);

    receivedRef.onSnapshot((querySnapshot) => {
      const receivedRequests = [];
      querySnapshot.forEach((doc) => {
        receivedRequests.push({
          id: doc.id,
          data: doc.data(),
          type: 'request',
        });
      });
      this.setState({ receivedRequests });
    });

    const sentRef = db.collection('requests')
      .where('from', '==', uid);
    sentRef.onSnapshot((querySnapshot) => {
      const sentRequests = [];
      querySnapshot.forEach((doc) => {
        sentRequests.push({
          id: doc.id,
          data: doc.data(),
          type: 'request',
        });
      });
      this.setState({ sentRequests });
    });
    // if (!receivedRequests.length) {
    //   this.setState({ receivedRequests });
    // }
  }

  fetchGifts = (uid) => {
    const db = firebase.firestore();
    const receivedRef = db.collection('gifts')
      .where('to', '==', uid);

    receivedRef.get()
      .then((querySnapshot) => {
        const receivedGifts = [];
        querySnapshot.forEach((doc) => {
          receivedGifts.push({
            id: doc.id,
            data: doc.data(),
            type: 'gift',
          });
        });
        this.setState({ receivedGifts });
      });

    // const sentRef = db.collection('gifts')
    //   .where('from', '==', uid);
    // sentRef.get()
    //   .then((querySnapshot) => {
    //     const sentGifts = [];
    //     querySnapshot.forEach((doc) => {
    //       sentGifts.push({
    //         id: doc.id,
    //         data: doc.data(),
    //         type: 'gift',
    //       });
    //     });
    //     this.setState({ sentGifts });
    //   });
  }

  navigateToMyPage = () => {
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid: this.state.uid,
        // logInUser: this.state.logInUser,
      },
      key: 'UserPage' + this.state.uid,
    });
  }

  navigateToSearch = () => {
    this.props.navigation.navigate({
      routeName: 'Search',
      params: {
        logInUser: this.state.logInUser,
      },
    });
  }

  countUnread = (requests) => {
    let unreadSum = 0;
    if (requests) {
      requests.forEach((request) => {
        if (!request.data.isReadAfterReceived) {
          unreadSum += 1;
        }
      });
    }
    return unreadSum;
  }

  countApproved = (requests) => {
    let approvedSum = 0;
    if (requests) {
      requests.forEach((request) => {
        if (request.data.status === 'approved' && !request.data.isReadAfterApproved) {
          approvedSum += 1;
        }
      });
    }
    return approvedSum;
  }

  onPressTitle = () => {
    console.log(Constants.statusBarHeight);
  }

  render() {
    const {
      headerTitle,
    } = this.props;

    const unreadRequestsSum = this.countUnread(this.state.receivedRequests);
    const approvedRequestsSum = this.countApproved(this.state.sentRequests);
    const unreadGiftsSum = this.countUnread(this.state.receivedGifts);
    // const approvedGiftsSum = this.countApproved(this.state.sentGifts);
    const sum = unreadRequestsSum + approvedRequestsSum + unreadGiftsSum;

    console.log(Constants.statusBarHeight);
    const height = Constants.statusBarHeight + designLanguage.headerHeight;
    const paddingTop = Constants.statusBarHeight + designLanguage.headerPaddingTop;
    const paddingBottom = designLanguage.headerPaddingBottom;

    return (
      <View
        style={[
          styles.container,
          {
            height,
            paddingTop,
            paddingBottom,
          },
        ]}
      >
        <StatusBar
          barStyle="dark-content"
        />
        <HeaderLeftButton
          onPress={this.navigateToSearch}
          style={styles.leftButton}
        />
        <TouchableHighlight onPress={this.onPressTitle} underlayColor="transparent">
          <Text style={styles.appbarTitle}>
            {headerTitle}
          </Text>
        </TouchableHighlight>
        <View style={styles.button}>
          <UserIcon
            onPress={this.navigateToMyPage}
            dia={32}
            photoURL={this.state.photoURL}
            isAthlete={this.state.isAthlete}
            badgeNumber={sum}
            style={styles.icon}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FCFCFC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    borderBottomWidth: 0.3,
    borderBottomColor: '#808080',
    zIndex: 10,
  },
  appbarTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
  },
  leftButton: {
    position: 'absolute',
    left: 0,
    bottom: 12,
    paddingLeft: 18,
    paddingRight: 18,
  },
  button: {
    position: 'absolute',
    right: 0,
    bottom: 12,
  },
  icon: {
    marginLeft: 18,
    marginRight: 18,
  },
});

export default HomeHeader;
