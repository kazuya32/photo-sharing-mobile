import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import firebase from 'firebase';

import UserIcon from '../elements/UserIcon.js';
import FollowButton from '../elements/FollowButton.js';

class UserTile extends React.Component {
  state = {
    logInUid: this.props.logInUid,
    // isMyPage: this.props.isMyPage,
    // isFollowing: this.props.isFollowing,
  }

  componentWillMount() {
    const {
      uid,
    } = this.props;
    // this.setState({ photo });
    // this.fetchData();
    this.getUser(uid);
  }

  // eslint-disable-next-line
  handleFollowButton = (nextValue) => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(this.props.uid);
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
      [`following.${this.props.uid}`]: nextValue,
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

  // fetchData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('uid');
  //     this.setState({ logInUid: value });
  //   } catch (error) {
  //   //
  //   }
  // }

  getUser = async (uid) => {
    // try {
    //   const value = await AsyncStorage.getItem('uid');
    //   const isFollowing = user.data.followers[value];
    // } catch (error) {
    //   const isFollowing = false;
    // }

    const db = firebase.firestore();
    const userRef = db.collection('users').doc(uid);
    userRef.get().then((doc) => {
      // const user = doc.data();
      const user = { id: doc.id, data: doc.data() };
      const isLogInUser = (user.id === this.state.logInUid);
      const isFollowing = user.data.followers && user.data.followers[this.state.logInUid];

      this.setState({
        user,
        isLogInUser,
        isFollowing,
      });
    });
  }

  render() {
    const {
      onPressUser,
      // handleFollowButton,
      // isFollowing,
    } = this.props;

    console.log('this.state.logInUid in user tile');
    console.log(this.state.logInUid);

    if (!this.state.user) {
      return (
        <View />
      );
    }

    return (
      <View style={styles.container}>
        <UserIcon
          onPress={onPressUser}
          photoURL={this.state.user.data.photoURL}
          dia={36}
        />
        <TouchableHighlight
          style={styles.userName}
          onPress={onPressUser}
          underlayColor="transparent"
        >
          <Text style={styles.userNameText}>
            {this.state.user.data.name}
          </Text>
        </TouchableHighlight>
        <FollowButton
          style={[
            styles.followButton,
            this.state.isLogInUser && { display: 'none' },
          ]}
          isFollowing={this.state.isFollowing}
          handleFollowButton={this.handleFollowButton}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    flex: 1,
    alignSelf: 'center',
    paddingLeft: 16,
    paddingRight: 12,
    justifyContent: 'center',
  },
  userNameText: {
    fontSize: 20,
  },
  followButton: {
    // position: 'absolute',
    // right: 16,
    // height: 30,
    // alignSelf: 'flex-start',
    // marginTop: 16,
    zIndex: 100,
  },
  buttonStyle: {
    paddingTop: 2,
    paddingBottom: 2,
    // paddingRight: 6,
    // paddingLeft: 6,
    // width: 88,
  },
});

export default UserTile;
