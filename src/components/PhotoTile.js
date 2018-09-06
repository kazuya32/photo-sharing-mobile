import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  Dimensions,
  Alert,
  CameraRoll,
  AsyncStorage,
  Share,
  Linking,
  Platform,
} from 'react-native';
import firebase from 'firebase';
import {
  FileSystem,
  // Share,
} from 'expo';

import ActionSheet from '../components/ActionSheet.js';
import TagTile from '../components/TagTile.js';
import MatchTile from '../elements/MatchTile.js';
import TeamTile from '../elements/TeamTile.js';
import DownloadButton from '../elements/DownloadButton.js';
import SignatureButton from '../elements/SignatureButton.js';
import LikeButton from '../elements/LikeButton.js';
import UploaderTile from '../elements/UploaderTile.js';
import MenuButton from '../elements/MenuButton.js';

class PhotoTile extends React.Component {
  state = {
    // eslint-disable-next-line
    stadium: null,
    deleted: false,
    blocked: false,
    modalVisible: false,
    isDownloading: false,
  }

  componentDidMount() {
    this.cacheImage();
    this.fetchLogInData();
    this.getUser();
    this.fetchLikes();
  }

  render() {
    const {
      style,
      photoStyle,
      photo,
      show,
    } = this.props;

    if (!show || this.state.deleted || this.state.blocked) {
      return null;
    }

    // const onPressMenu = this.state.isMyPage ? this.onPressMenuMyPage : this.onPressMenu;
    const options = this.state.isMyPage ? this.createOptionsMyPage() : this.createOptions();

    const photoWidth = Dimensions.get('window').width;
    const XYRate = photo.data.height / photo.data.width;
    const photoHeight = photoWidth * XYRate;

    const hasAccess = photo.data.accesses && photo.data.accesses[this.state.logInUid];

    return (
      <View style={[
          styles.container,
          style,
        ]}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MatchTile
              onPress={this.onPressMatch}
              matchId={photo.data.matchId}
            />
            <TeamTile
              onPress={this.onPressTeam}
              teamId={photo.data.teamId}
            />
          </View>
          <MenuButton
            show
            style={[styles.menuButton]}
            onPress={this.onPressMenu}
          />
        </View>
        <TouchableHighlight
          onPress={this.onPressPhoto}
          underlayColor="transparent"
          style={styles.photoWrap}
        >
          <Image
            style={[
              styles.photo,
              { height: photoHeight, width: photoWidth },
              photoStyle,
            ]}
            // source={{ uri: photo.data.downloadURL }}
            source={{ uri: this.state.uri }}
            resizeMode="contain"
          />
        </TouchableHighlight>
        <View style={styles.btnArea}>
          <DownloadButton
            style={styles.downloadBtn}
            onPress={this.onPressDownload}
            hasAccess={hasAccess || (!photo.data.private && this.state.isAthleteLogIn)}
          />
          <SignatureButton
            style={[
              styles.signatureBtn,
              this.state.isMyPage && { display: 'none' },
            ]}
            onPress={this.onPressSignature}

          />
        </View>
        <View style={styles.bar}>
          <LikeButton
            // style={}
            onPressButton={this.handleLikeButton}
            onPressNumber={this.onPressLikes}
            likes={this.state.likes}
            userLiked={this.state.liked}
            show
          />
          <UploaderTile
            onPressUser={this.onPressUser}
            user={this.state.user}
          />
        </View>
        <TagTile
          style={[styles.tags]}
          tags={photo.data.tags}
        />

        <ActionSheet
          visible={this.state.modalVisible}
          setModalVisible={(visible) => { this.setModalVisible(visible); }}
          options={options}
        />
        <View style={[
            styles.activityIndicatorContainer,
          ]}
        >
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color="#DB4D5E" animating={this.state.isDownloading} />
          </View>
        </View>
      </View>
    );
  }

  // eslint-disable-next-line
  fetchLogInData = async () => {
    const { photo } = this.props;
    const { uid } = photo.data;
    const value = await AsyncStorage.getItem('uid');
    const isAthleteString = await AsyncStorage.getItem('isAthlete');
    const isAthlete = isAthleteString === 'true';
    const isMyPage = (uid === value);
    this.setState({
      isMyPage,
      logInUid: value,
      isAthleteLogIn: isAthlete,
      liked: this.props.photo.data.likes[value],
    });
  }

  fetchLikes = () => {
    const { photo } = this.props;
    const likes = this.makeListFromObject(photo.data.likes);
    this.setState({ likes });
  }

  getUser = () => {
    const { photo } = this.props;
    const { uid } = photo.data;
    let user;
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(uid);
    userRef.get().then((doc) => {
      // const user = doc.data();
      user = { id: doc.id, data: doc.data() };
      this.setState({ user });
    });
    // return user;
  }

  cacheImage = async () => {
    const { photo } = this.props;
    const ext = await this.getFileExtension(photo.data.downloadURL);
    const path = FileSystem.cacheDirectory + photo.id + '.' + ext;
    const info = await FileSystem.getInfoAsync(path);
    if (!info.exists) {
      await FileSystem.downloadAsync(photo.data.downloadURL, path);
    }
    this.setState({ uri: path });
  };

  getFileExtension = async filename => filename.split('.').pop().split('?').shift();

  // eslint-disable-next-line
  makeListFromObject = (obj) => {
    // const count = 0;
    const array = [];
    Object.keys(obj).forEach((prop) => {
      if (prop !== 'undefined' && obj[prop]) {
        array.push(prop);
      }
    });
    return array;
  };

  // eslint-disable-next-line
  onPressPhoto = () => {
    const { photo } = this.props;
    this.props.navigation.navigate({
      routeName: 'PhotoDetail',
      params: {
        photo,
      },
      key: 'PhotoDetail' + photo.id,
    });
  }

  onPressUser = (user) => {
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid: user.id,
      },
      key: 'UserPage' + user.id,
    });
  }

  onPressMatch = (match) => {
    this.props.navigation.navigate({
      routeName: 'MatchFeed',
      params: {
        match,
      },
      key: 'MatchFeed' + match.id,
    });
  }

  onPressTeam = (team) => {
    this.props.navigation.navigate({
      routeName: 'TeamFeed',
      params: {
        feedType: 'team',
        itemId: team.id,
      },
      key: 'TeamFeed' + team.id,
    });
  }

  handleLikeButton = (nextValue) => {
    let { likes } = this.state;
    if (nextValue) {
      likes.push(this.state.logInUid);
    } else {
      likes = this.deletePropFromArray(likes, this.state.logInUid);
    }

    this.setState({ liked: nextValue, likes });

    const db = firebase.firestore();
    const ref = db.collection('photos').doc(this.props.photo.id);
    ref.update({
      [`likes.${this.state.logInUid}`]: nextValue,
      likesSum: likes.length,
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

  deletePropFromArray = (array, prop) => {
    const index = array.indexOf(prop);

    if (index >= 0) {
      array.splice(index, 1);
    }
    return array;
  };

  // eslint-disable-next-line
  downloadPhoto = async () => {
    const { photo } = this.props;
    const remoteURL = photo.data.downloadURL;
    const isAndroid = Platform.OS === 'android';

    if (isAndroid) {
      const ext = await this.getFileExtension(photo.data.downloadURL);
      FileSystem.downloadAsync(
        remoteURL,
        FileSystem.documentDirectory + photo.id + '.' + ext,
      )
        .then(({ uri }) => {
          // console.log('Finished downloading to ', uri);
          CameraRoll.saveToCameraRoll(uri)
            .then(() => {
              this.setState({ isDownloading: false });
              // eslint-disable-next-line
              Alert.alert(
                '画像を保存しました。',
                // '保存した画像をInstagramで友達にシェアしよう！',
                // [
                //   { text: 'No' },
                //   { text: 'Yes', onPress: () => this.ShareToInstagram(uri) },
                // ],
                // { cancelable: false },
              // eslint-disable-next-line
              );
            });
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    } else {
      CameraRoll.saveToCameraRoll(remoteURL)
      // eslint-disable-next-line
        .then((uri) => {
          this.setState({ isDownloading: false });
          // eslint-disable-next-line
          Alert.alert(
            '画像を保存しました。',
            // '保存した画像をInstagramで友達にシェアしよう！',
            // [
            //   { text: 'No' },
            //   { text: 'Yes', onPress: () => this.ShareToInstagram(uri) },
            // ],
            // { cancelable: false },
          // eslint-disable-next-line
          );
        });
    }
  }

  // eslint-disable-next-line
  onPressDownload = () => {
    if (!this.state.isDownloading) {
      this.setState({ isDownloading: true });

      const { photo } = this.props;
      const hasAccess = photo.data.accesses && photo.data.accesses[this.state.logInUid];

      if (!hasAccess && this.state.isAthleteLogIn) {
        this.setDownloadRequestByAthlete();
      }
      this.downloadPhoto();
    }
  }

  // eslint-disable-next-line
  setDownloadRequestByAthlete = () => {
    this.makeRequest();
    this.giveAccessToAthlete();
  }

  // eslint-disable-next-line
  makeRequest = () => {
    const { photo } = this.props;

    const createdAt = Date.now();
    const db = firebase.firestore();
    db.collection('requests').doc().set({
      from: this.state.logInUid,
      to: photo.data.uid,
      photoId: photo.id,
      message: '',
      isReadAfterReceived: false,
      isReadAfterApproved: true,
      status: 'approved',
      createdAt,
      updatedAt: createdAt,
      downloadByAthlete: true,
    })
      .then(() => {
        // eslint-disable-next-line
        console.log('Document successfully written!');
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error writing document: ', error);
      });
  }

  // eslint-disable-next-line
  giveAccessToAthlete = async () => {
    const { photo } = this.props;

    const db = firebase.firestore();
    const Ref = db.collection('photos').doc(photo.id);
    Ref.update({
      [`accesses.${this.state.logInUid}`]: true,
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

  deletePhoto = async () => {
    const { photo } = this.props;
    const db = firebase.firestore();
    db.collection('photos').doc(photo.id).delete()
      .then(() => {
        // eslint-disable-next-line
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error("Error removing document: ", error);
      });
  }

  onPressEdit = () => {
    const timestamp = Date.now().toString();
    this.props.navigation.navigate({
      routeName: 'EditPhoto',
      params: {
        photo: this.props.photo,
        key: 'EditPhoto' + timestamp,
      },
      key: 'EditPhoto' + timestamp,
    });
  }

  onPressReport = () => {
    const timestamp = Date.now().toString();
    this.props.navigation.navigate({
      routeName: 'ReportPhoto',
      params: {
        photo: this.props.photo,
      },
      key: 'ReportPhoto' + timestamp,
    });
  }

  blockingTransaction = () => {
    const { photo } = this.props;
    const isBlocked = photo.data.blockedBy && photo.data.blockedBy[this.state.logInUid];

    const db = firebase.firestore();
    const logInUserRef = db.collection('users').doc(this.state.logInUid);
    logInUserRef.update({
      [`blockingPhoto.${photo.id}`]: !isBlocked,
    })
      .then(() => {
        // eslint-disable-next-line
        console.log('Document successfully written!');
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error updating document: ', error);
      });

    const photoRef = db.collection('photos').doc(photo.id);
    photoRef.update({
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

  onPressBlock = () => {
    this.blockingTransaction();
    const {
      user,
    } = this.state;
    const text = `${user && user.data.name}さんの投稿写真を1枚ブロックしました。`;
    Alert.alert(text);
    if (this.props.onPressBlock) { this.props.onPressBlock(); }
    this.setState({ blocked: true });
  }

  onPressSignature = () => {
    const timestamp = Date.now().toString();
    this.props.navigation.navigate({
      routeName: 'Signature',
      params: {
        photo: this.props.photo,
      },
      key: 'UserPage' + timestamp,
    });
  }

  onPressLikes = () => {
    this.props.navigation.navigate({
      routeName: 'LikedUsers',
      params: {
        photo: this.props.photo,
      },
      key: 'LikedUsers' + this.props.photo.id,
    });
  }

  onPressShare = () => {
    const content = {
      message: 'message',
      title: 'title',
    };
    Share.share(content);
  }

  ShareToInstagram = (uri) => {
    const encodedURL = encodeURIComponent(uri);
    const instagramURL = `instagram://library?AssetPath=${encodedURL}`;
    Linking.openURL(instagramURL);
  }

  onPressInvisible = () => {
    const { photo } = this.props;
    const { invisibleInMyPage } = photo.data;
    const isInvisible = invisibleInMyPage && invisibleInMyPage[this.state.logInUid];

    const db = firebase.firestore();
    const photoRef = db.collection('photos').doc(photo.id);
    photoRef.update({
      [`invisibleInMyPage.${this.state.logInUid}`]: !isInvisible,
    });

    const timestamp = Date.now().toString();
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid: this.state.logInUid,
      },
      key: 'UserPage' + timestamp,
    });
  }

  onPressMenu = () => {
    this.setModalVisible(true);
  }

  onPressDelete = () => {
    this.deletePhoto()
      .then(this.onDeleted);
  }

  onDeleted = () => {
    // eslint-disable-next-line
    this.props.onDeleted && this.props.onDeleted();
    this.setState({ deleted: true });
  }

  createOptionsMyPage = () => {
    const optionsMyPage = [
      {
        title: '編集',
        onPress: this.onPressEdit,
        cancel: false,
        destructive: false,
      },
      {
        title: '削除',
        onPress: this.onPressDelete,
        cancel: false,
        destructive: true,
      },
    ];

    return optionsMyPage;
  }

  createOptions = () => {
    const options = [
      {
        title: 'サインする',
        onPress: this.onPressSignature,
        cancel: false,
        destructive: false,
      },
    ];

    const { photo } = this.props;
    const hasAccess = photo.data.accesses && photo.data.accesses[this.state.logInUid];
    const isBlocked = photo.data.blockedBy && photo.data.blockedBy[this.state.logInUid];
    const { invisibleInMyPage } = photo.data;
    const isInvisible = invisibleInMyPage && invisibleInMyPage[this.state.logInUid];

    const blockTitle = isBlocked ? 'ブロックを取り消す' : 'ブロック';
    options.push({
      title: blockTitle,
      onPress: this.onPressBlock,
      cancel: false,
      destructive: false,
    });

    const invisibleTitle = isInvisible ? 'マイページに表示する' : 'マイページで非表示にする';
    if (hasAccess) {
      options.push({
        title: invisibleTitle,
        onPress: this.onPressInvisible,
        cancel: false,
        destructive: false,
      });
    }
    const reportTitle = '不適切な投稿として通報する';
    options.push({
      title: reportTitle,
      onPress: this.onPressReport,
      cancel: false,
      destructive: true,
    });
    return options;
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  activityIndicatorContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
  },
  headerLeft: {
    paddingTop: 12,
    paddingLeft: 16,
    paddingBottom: 12,
  },
  menuButton: {
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 8,
    paddingRight: 16,
    paddingLeft: 16,
    alignSelf: 'flex-end',
  },
  photo: {
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  photoWrap: {
    // borderTopWidth: 1,
    // borderTopColor: '#EBEBEB',
  },
  btnArea: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    bottom: 56,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  downloadBtn: {
    marginRight: 16,
    marginLeft: 16,
  },
  signatureBtn: {
    marginRight: 16,
    marginLeft: 16,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingLeft: 16,
    paddingRight: 16,
  },
  tags: {
    // paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
  },
});

export default PhotoTile;

// onPressMenu = () => {
//   const isAndroid = Platform.OS === 'android';
//
//   // if (isAndroid) {
//   if (true) {
//     // Alert.alert('この機能は現在iosでのみ対応しています。ごめんなさい！');
//     this.setModalVisible(true);
//   } else {
//     const { photo } = this.props;
//     const hasAccess = photo.data.accesses && photo.data.accesses[this.state.logInUid];
//     const isBlocked = photo.data.blockedBy && photo.data.blockedBy[this.state.logInUid];
//     const { invisibleInMyPage } = photo.data;
//     const isInvisible = invisibleInMyPage && invisibleInMyPage[this.state.logInUid];
//
//     const signatureTitle = 'サインする';
//     // const sharingTitle = 'シェアする';
//     const options = [
//       'キャンセル',
//       signatureTitle,
//       // sharingTitle,
//     ];
//
//     const blockTitle = isBlocked ? 'ブロックを取り消す' : 'ブロック';
//     options.push(blockTitle);
//     const invisibleTitle = isInvisible ? 'マイページに表示する' : 'マイページで非表示にする';
//     if (hasAccess) {
//       options.push(invisibleTitle);
//     }
//     const reportTitle = '不適切な投稿として通報する';
//     options.push(reportTitle);
//
//     const destructiveButtonIndex = options.length - 1;
//     ActionSheetIOS.showActionSheetWithOptions(
//       {
//         options,
//         destructiveButtonIndex,
//         cancelButtonIndex: 0,
//       },
//       (buttonIndex) => {
//         const buttonTitle = options[buttonIndex];
//         switch (buttonTitle) {
//           case signatureTitle:
//             this.onPressSignature();
//             break;
//           // case sharingTitle:
//           //   this.onPressShare();
//           //   break;
//           case blockTitle:
//             this.onPressBlock();
//             break;
//           case invisibleTitle:
//             this.onPressInvisible();
//             break;
//           case reportTitle:
//             this.onPressReport();
//             break;
//
//           default:
//             // eslint-disable-next-line
//             console.log('cancel button');
//             break;
//         }
//       },
//     );
//   }
// }
//
// onPressMenuMyPage = () => {
//   const isAndroid = Platform.OS === 'android';
//
//   if (isAndroid) {
//   // if (true) {
//     // Alert.alert('この機能は現在iosでのみ対応しています。ごめんなさい！');
//     this.setModalVisible(true);
//   } else {
//     const options = ['キャンセル', '編集', '削除'];
//     const destructiveButtonIndex = options.length - 1;
//     ActionSheetIOS.showActionSheetWithOptions(
//       {
//         options,
//         destructiveButtonIndex,
//         cancelButtonIndex: 0,
//       },
//       (buttonIndex) => {
//         if (buttonIndex === 1) {
//           // eslint-disable-next-line
//           this.onPressEdit();
//         }
//         if (buttonIndex === destructiveButtonIndex) {
//           this.deletePhoto();
//           // eslint-disable-next-line
//           this.props.onDeleted && this.props.onDeleted();
//         }
//       },
//     );
//   }
// }
