import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import firebase from 'firebase';

import HeaderLeftButton from '../elements/HeaderLeftButton.js';
import HeaderRightButton from '../elements/HeaderRightButton.js';

class Header extends React.Component {
  state = {
    receivedRequests: [],
    sentRequests: [],
    receivedGifts: [],
    sentGifts: [],
    // uid: this.props.navigation.state.params && this.props.navigation.state.params.uid,
    // logInUser: this.props.logInUser,
  }

  componentWillMount() {
    this.retrieveUser();
  }

  retrieveUser = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid');
      const photoURL = await AsyncStorage.getItem('photoURL');
      const isAthlete = await AsyncStorage.getItem('isAthlete');

      // if (photoURL !== null && isAthlete !== null) {
      const value = (isAthlete === 'true');
      this.fetchRequest(uid);
      this.fetchGifts(uid);
      this.setState({ uid, photoURL, isAthlete: value });
      // }
    } catch (error) {
    //
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

    const sentRef = db.collection('gifts')
      .where('from', '==', uid);
    sentRef.get()
      .then((querySnapshot) => {
        const sentGifts = [];
        querySnapshot.forEach((doc) => {
          sentGifts.push({
            id: doc.id,
            data: doc.data(),
            type: 'gift',
          });
        });
        this.setState({ sentGifts });
      });
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

  navigateToHome = () => {
    this.props.navigation.navigate({
      routeName: 'Home',
      params: {
      },
      // key: 'Home' + Date.now().toString(),
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

  render() {
    const {
      // onPressLeft,
      // onPressRight,
      headerTitle,
    } = this.props;

    const unreadRequestsSum = this.countUnread(this.state.receivedRequests);
    const approvedRequestsSum = this.countApproved(this.state.sentRequests);
    const unreadGiftsSum = this.countUnread(this.state.receivedGifts);
    const approvedGiftsSum = this.countApproved(this.state.sentGifts);
    const sum = unreadRequestsSum + approvedRequestsSum + unreadGiftsSum + approvedGiftsSum;

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
        />
        <View style={styles.button}>
          <HeaderLeftButton
            onPress={this.navigateToSearch}
          />
        </View>
        <View style={styles.appbar}>
          <TouchableHighlight onPress={this.navigateToHome} underlayColor="transparent">
            <Text style={styles.appbarTitle}>
              {headerTitle}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.button}>
          <HeaderRightButton
            // onPress={onPressRight}
            onPressIcon={this.navigateToMyPage}
            photoURL={this.state.photoURL}
            isAthlete={this.state.isAthlete}
            badgeNumber={sum}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FCFCFC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 32,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    borderBottomWidth: 0.3,
    borderBottomColor: '#808080',
    zIndex: 10,
  },
  appbar: {

  },
  appbarTitle: {
    // position: 'absolute',
    // alignSelf: 'center',
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
  },
  button: {
    paddingLeft: 18,
    paddingRight: 18,
  },
});

export default Header;
