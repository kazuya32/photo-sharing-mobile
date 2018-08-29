import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  Alert,
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
import ActionSheet from '../components/ActionSheet.js';

class Profile extends React.Component {
  state = {
    modalVisible: false,
    receivedRequests: [],
    sentRequests: [],
    receivedGifts: [],
  }

  componentDidMount() {
    this.initLogInData();
  }

  // eslint-disable-next-line
  initLogInData = async () => {
    const value = await AsyncStorage.getItem('uid');
    const isMyPage = (this.props.uid === value);
    // const isMyPage = (this.props.uid === this.props.logInUser.id);
    this.setState({
      isMyPage,
      logInUid: value,
    });
    if (isMyPage) {
      this.fetchRequest(value);
      this.fetchGifts(value);
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
  }

  fetchGifts = (uid) => {
    const db = firebase.firestore();
    const receivedRef = db.collection('gifts')
      .where('to', '==', uid);

    receivedRef.onSnapshot((querySnapshot) => {
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
    if (this.state.isMyPage) {
      this.props.navigation.navigate({
        routeName: 'EditProfile',
        params: {
          user: this.props.user,
          uid: this.props.uid,
        },
      });
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

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onPressMenu = () => {
    this.setModalVisible(true);
  }

  createOptionsMyPage = () => {
    const optionsMyPage = [
      // {
      //   title: '写真を投稿',
      //   onPress: this.onPressUpload,
      //   cancel: false,
      //   destructive: false,
      // },
      {
        title: 'プロフィールを編集',
        onPress: this.onPressEdit,
        cancel: false,
        destructive: false,
      },
      {
        title: 'ログアウト',
        onPress: this.signOut,
        cancel: false,
        destructive: true,
      },
    ];

    return optionsMyPage;
  }

  createOptions = () => {
    const options = [
      {
        title: 'ブロック',
        onPress: this.block,
        cancel: false,
        destructive: false,
      },
      {
        title: '不適切アカウントとして報告',
        onPress: this.report,
        cancel: false,
        destructive: true,
      },
    ];
    return options;
  }

  render() {
    const {
      onPressRequest,
      photoURL,
      handleFollowButton,
      isFollowing,
      user,
    } = this.props;

    const unreadRequestsSum = this.countUnread(this.state.receivedRequests);
    const approvedRequestsSum = this.countApproved(this.state.sentRequests);
    const unreadGiftsSum = this.countUnread(this.state.receivedGifts);
    // const approvedGiftsSum = this.countApproved(this.state.sentGifts);
    const sum = unreadRequestsSum + approvedRequestsSum + unreadGiftsSum;

    const options = this.state.isMyPage ? this.createOptionsMyPage() : this.createOptions();

    const buttonArea = this.state.isMyPage ? (
      <View style={[styles.buttonAreaMypage]}>
        <RequestButton
          style={styles.requestButton}
          onPress={onPressRequest}
          badgeNumber={sum}
        />
        <MenuButton
          show
          border
          style={[styles.menuButtonMyPage]}
          onPress={this.onPressMenu}
          isMyPage={this.state.isMyPage}
        />
      </View>
    ) : (
      <View style={[styles.buttonArea]}>
        <FollowButton
          style={[
            styles.followButton,
          ]}
          show={user}
          isFollowing={isFollowing}
          handleFollowButton={handleFollowButton}
        />
      </View>
    );

    return (
      <View style={styles.container}>
        <UserIcon
          onPress={this.onPressEdit}
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
                style={[styles.athleteMark]}
                show={user && user.data.isAthlete}
              />
            </View>
            {buttonArea}
          </View>
          <View style={styles.underArea}>
            <View style={styles.userDesc}>
              <Text style={styles.userDescText}>
                {user && user.data.desc}
              </Text>
            </View>
            <MenuButton
              show={!this.state.isMyPage}
              border
              style={[styles.menuButton]}
              onPress={this.onPressMenu}
              isMyPage={this.state.isMyPage}
            />
          </View>
        </View>
        <ActionSheet
          visible={this.state.modalVisible}
          setModalVisible={(visible) => { this.setModalVisible(visible); }}
          options={options}
        />
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
  underArea: {
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
    flex: 1,
    marginTop: 8,
  },
  userDescText: {
    fontSize: 14,
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
    // flex: 1,
    alignSelf: 'flex-end',
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  menuButtonMyPage: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    height: 40,
    width: 40,
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

// onPressMenu = () => {
//   const isAndroid = Platform.OS === 'android';
//
//   if (isAndroid) {
//     Alert.alert('この機能は現在ios限定でのみ対応しています。ごめんなさい！');
//   } else {
//     const options = ['キャンセル', 'ブロック', '不適切アカウントとして報告'];
//     const destructiveButtonIndex = 1;
//     ActionSheetIOS.showActionSheetWithOptions(
//       {
//         options,
//         destructiveButtonIndex,
//         cancelButtonIndex: 0,
//       },
//       (buttonIndex) => {
//         if (buttonIndex === 1) {
//           this.block();
//         }
//         if (buttonIndex === 2) {
//           this.report();
//         }
//       },
//     );
//   }
// }

// onPressMenuMyPage = () => {
//   const isAndroid = Platform.OS === 'android';
//
//   if (isAndroid) {
//     Alert.alert('この機能は現在iosでのみ対応しています。ごめんなさい！');
//   } else {
//     const options = ['キャンセル', '写真を投稿', 'プロフィールを編集'];
//     const destructiveButtonIndex = options.length;
//     if (this.state.isMyPage) {
//       options.push('ログアウト');
//     }
//     ActionSheetIOS.showActionSheetWithOptions(
//       {
//         options,
//         destructiveButtonIndex,
//         cancelButtonIndex: 0,
//       },
//       (buttonIndex) => {
//         if (buttonIndex === 1) {
//           // eslint-disable-next-line
//           this.onPressUpload();
//         }
//         if (buttonIndex === 2) {
//           // eslint-disable-next-line
//           this.onPressEdit();
//         }
//         if (buttonIndex === destructiveButtonIndex) {
//           this.signOut();
//         }
//       },
//     );
//   }
// }
