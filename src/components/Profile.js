import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  ActionSheetIOS,
  Alert,
} from 'react-native';
import firebase from 'firebase';

import UserIcon from '../elements/UserIcon.js';
import MenuButton from '../elements/MenuButton.js';
import RequestButton from '../elements/RequestButton.js';
import FollowButton from '../elements/FollowButton.js';
import CheckMark from '../elements/CheckMark.js';

class Profile extends React.Component {
  state = {
    // isMyPage: this.props.isMyPage,
    // isFollowing: this.props.isFollowing,
  }

  componentDidMount() {
    this.checkMyPage();
  }

  // eslint-disable-next-line
  checkMyPage = async () => {
    const value = await AsyncStorage.getItem('uid');
    const isMyPage = (this.props.uid === value);
    // const isMyPage = (this.props.uid === this.props.logInUser.id);
    this.setState({
      isMyPage,
      logInUid: value,
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

  signOut = () => {
    firebase.auth().signOut()
      .then(() => {
        // eslint-disable-next-line
        console.log('Signed Out');
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Sign Out Error', error);
      });
  }

  onPressEdit = () => {
    this.props.navigation.navigate({
      routeName: 'EditProfile',
      params: {
        user: this.props.user,
        uid: this.props.uid,
      },
    });
  }

  onPressMenuMyPage = () => {
    const options = ['キャンセル', 'プロフィールを編集'];
    const destructiveButtonIndex = options.length;
    if (this.state.isMyPage) {
      options.push('ログアウト');
    }
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          // eslint-disable-next-line
          this.onPressEdit();
        }
        if (buttonIndex === destructiveButtonIndex) {
          this.signOut();
        }
      },
    );
  }

  blockingTransaction = () => {
    const db = firebase.firestore();
    const logInUserRef = db.collection('users').doc(this.state.logInUid);
    logInUserRef.update({
      [`followers.${this.props.uid}`]: false,
      [`blocking.${this.props.uid}`]: true,
    })
      .then(() => {
        // eslint-disable-next-line
        console.log('Document successfully written!');
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error updating document: ', error);
      });

    const userRef = db.collection('users').doc(this.props.uid);
    userRef.update({
      [`following.${this.state.logInUid}`]: false,
      [`blockedBy.${this.state.logInUid}`]: true,
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

  block = () => {
    this.blockingTransaction();
    const {
      user,
    } = this.props;
    const text = `${user && user.data.name}さんをブロックしました。`;
    Alert.alert(text);
  }

  report = () => {
    this.props.navigation.navigate({
      routeName: 'ReportUser',
      params: {
        user: this.props.user,
      },
    });
  }

  onPressMenu = () => {
    const options = ['キャンセル', 'ブロック', '不適切アカウントとして報告'];
    const destructiveButtonIndex = 1;
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          this.block();
        }
        if (buttonIndex === 2) {
          this.report();
        }
      },
    );
  }

  render() {
    const {
      onPressRequest,
      photoURL,
      handleFollowButton,
      receivedRequests,
      sentRequests,
      isFollowing,
      user,
    } = this.props;

    const unreadSum = this.countUnread(receivedRequests);
    const approvedSum = this.countApproved(sentRequests);
    const sum = unreadSum + approvedSum;

    return (
      <View style={styles.container}>
        <UserIcon
          // onPress
          photoURL={photoURL}
          dia={48}
          isAthlete={(user && user.data.isAthlete)}
        />
        <View style={styles.profileText}>
          <View style={styles.upperArea}>
            <View style={styles.userName}>
              <Text style={styles.userNameTitle}>
                {user && user.data.name}
              </Text>
              <CheckMark
                style={[
                  styles.athleteMark,
                  (user && !user.data.isAthlete) && { display: 'none' },
                ]}
              />
            </View>
            <View style={[styles.buttonAreaMypage, !this.state.isMyPage && { display: 'none' }]}>
              <RequestButton
                style={styles.requestButton}
                onPress={onPressRequest}
                badgeNumber={sum}
              />
              <MenuButton
                style={styles.menuButtonMyPage}
                onPress={this.onPressMenuMyPage}
                isMyPage={this.state.isMyPage}
              />
            </View>
            <View style={[styles.buttonArea, this.state.isMyPage && { display: 'none' }]}>
              <MenuButton
                style={styles.menuButton}
                onPress={this.onPressMenu}
                isMyPage={this.state.isMyPage}
              />
              <FollowButton
                style={[
                  styles.followButton,
                  !user && { display: 'none' },
                ]}
                // isFollowing={this.state.isFollowing}
                isFollowing={isFollowing}
                handleFollowButton={handleFollowButton}
              />
            </View>
          </View>
          <Text style={styles.userDesc}>
            {user && user.data.desc}
          </Text>
        </View>
      </View>
    );
  }
}

// <Icon
//   name="account-check"
//   size={24}
//   style={[
//     styles.athleteMark,
//   ]}
// />

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  athleteMark: {
    // color: '#DB4D5E',
    // textAlignVertical: 'bottom',
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 8,
    alignSelf: 'flex-end',
    // marginLeft: 12,
  },
  profileText: {
    alignSelf: 'center',
    paddingLeft: 12,
    justifyContent: 'space-around',
    flex: 1,
  },
  upperArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignContent: 'center',
    // flex: 1,
    // width: 190,
  },
  userName: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignContent: 'flex-end',
    // flex: 1,
    // width: 190,
  },
  userNameTitle: {
    // flex: 2,
    fontSize: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  userDesc: {
    // flex: 1,
    fontSize: 14,
    marginTop: 8,
  },
  buttonArea: {
    // flexDirection: 'row',
    alignContent: 'flex-start',
  },
  buttonAreaMypage: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignContent: 'flex-start',
    // flex: 1,
    // width: 190,
  },
  menuButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  menuButtonMyPage: {
    alignSelf: 'flex-start',
  },
  requestButton: {
    // position: 'absolute',
    // right: 12,
    marginRight: 12,
    // height: 30,
    alignSelf: 'flex-start',
  },
  followButton: {
    // position: 'absolute',
    // right: 0,
    // top: 0,
    // height: 30,
    alignSelf: 'flex-start',
    // marginTop: 16,
  },
});

export default Profile;
