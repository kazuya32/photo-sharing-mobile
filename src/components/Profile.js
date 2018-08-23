import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  ActionSheetIOS,
  Alert,
  Platform,
} from 'react-native';
import {
  ImagePicker,
  Permissions,
} from 'expo';
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
        const isReadAfterApproved = (request.data.status === 'approved' && !request.data.isReadAfterApproved);
        if ((request.type === 'request') && isReadAfterApproved) {
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

  onPressUpload = () => {
    this.getPermission();
  }

  getPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.pickImage();
    } else {
      // this.props.navigation.navigate({ routeName: 'Home' });
      Alert.alert('カメラロールの使用が許可されていません。');
    }
  }

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      // base64: true,
    });
    console.log(result);

    if (result.cancelled) {
      // this.props.navigation.navigate({ routeName: 'Home' });
      // Alert.alert('カメラロールの使用が許可されていません。');
    } else {
      const timestamp = Date.now().toString();
      const key = 'PhotoUploader' + timestamp;
      this.props.navigation.navigate({
        routeName: 'PhotoUploader',
        params: {
          image: result,
          logInUser: this.state.logInUser,
          key,
        },
        key,
      });
    }
  };

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
    const isAndroid = Platform.OS === 'android';

    if (isAndroid) {
      Alert.alert('この機能は現在iosでのみ対応しています。ごめんなさい！');
    } else {
      const options = ['キャンセル', '写真を投稿', 'プロフィールを編集'];
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
            this.onPressUpload();
          }
          if (buttonIndex === 2) {
            // eslint-disable-next-line
            this.onPressEdit();
          }
          if (buttonIndex === destructiveButtonIndex) {
            this.signOut();
          }
        },
      );
    }
  }

  blockingTransaction = () => {
    const db = firebase.firestore();
    const logInUserRef = db.collection('users').doc(this.state.logInUid);
    logInUserRef.update({
      [`followers.${this.props.uid}`]: false,
      [`blockingUser.${this.props.uid}`]: true,
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
    const isAndroid = Platform.OS === 'android';

    if (isAndroid) {
      Alert.alert('この機能は現在ios限定でのみ対応しています。ごめんなさい！');
    } else {
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
  }

  render() {
    const {
      onPressRequest,
      photoURL,
      handleFollowButton,
      receivedItems,
      sentItems,
      isFollowing,
      user,
    } = this.props;

    const unreadSum = this.countUnread(receivedItems);
    const approvedSum = this.countApproved(sentItems);
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
                style={[styles.menuButtonMyPage]}
                onPress={this.onPressMenuMyPage}
                isMyPage={this.state.isMyPage}
              />
            </View>
            <View style={[styles.buttonArea, this.state.isMyPage && { display: 'none' }]}>
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
          <View style={styles.downArea}>
            <Text style={styles.userDesc}>
              {user && user.data.desc}
            </Text>
            <MenuButton
              style={[styles.menuButton, this.state.isMyPage && { display: 'none' }]}
              onPress={this.onPressMenu}
              isMyPage={this.state.isMyPage}
            />
          </View>
        </View>
      </View>
    );
  }
}

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
    margin: 8,
    alignSelf: 'flex-start',
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
    alignContent: 'center',
  },
  downArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  userName: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignContent: 'flex-end',
    // justifyContent: 'center',
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
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonAreaMypage: {
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
  menuButton: {
    alignSelf: 'flex-end',
    marginTop: 12,
    marginBottom: 12,
    // paddingRight: 8,
  },
  menuButtonMyPage: {
    alignSelf: 'flex-start',
    // paddingRight: 8,
  },
  requestButton: {
    marginRight: 12,
    alignSelf: 'flex-start',
  },
  followButton: {
    alignSelf: 'center',
  },
});

export default Profile;
