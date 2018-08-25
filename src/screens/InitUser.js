import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  ImagePicker,
  Permissions,
} from 'expo';
import firebase from 'firebase';

import LogInHeader from '../components/LogInHeader.js';
import UserIcon from '../elements/UserIcon.js';
import EditItem from '../components/EditItem.js';
import SaveButton from '../elements/SaveButton.js';
import CancelButton from '../elements/CancelButton.js';

class InitUser extends React.Component {
  state = {
    uid: this.props.navigation.state.params.uid,
    name: null,
    desc: null,
    photoURL: null,
    headerTitle: '初期プロフィール',
    isUploading: false,
  }

  // eslint-disable-next-line
  createProfile = () => {
    this.setState({ isUploading: true });

    const db = firebase.firestore();
    const userRef = db.collection('users').doc(this.state.uid);
    userRef.set({
      name: this.state.name || '',
      desc: this.state.desc || '',
      photoURL: this.state.photoURL || '',
      facebookId: '',
      phoneNumber: '',
      followers: {},
      following: {},
      isAthlete: false,
    })
      .then(() => {
        AsyncStorage.setItem('uid', this.state.uid);
        this.setState({ isUploading: false });
        this.navigateToMain();
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error updating document: ', error);
        Alert.alert('ユーザー登録に失敗しました。再度実行してください。');
        this.setState({ isUploading: false });
      });
  }

  // eslint-disable-next-line
  onChangeTextName = (text) => {
    this.setState({ name: text });
  }

  // eslint-disable-next-line
  onChangeTextDesc = (text) => {
    this.setState({ desc: text });
  }

  // eslint-disable-next-line
  onPressCancel = () => {
    this.props.navigation.goBack();
  }

  onPressPhoto = () => {
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
      aspect: [1, 1],
    });
    console.log(result);

    if (result.cancelled) {
      // this.props.navigation.navigate({ routeName: 'Home' });
      // Alert.alert('カメラロールの使用が許可されていません。');
    } else {
      const { uri } = result;
      // this.setState({ photoURL: uri, photoChanged: true })
      // eslint-disable-next-line
      const res = await fetch(uri);
      const file = await res.blob();

      const path = `photos/${this.state.uid}/profile.jpg`;
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(path);

      imageRef.put(file).then((snapshot) => {
        if (snapshot.state) {
          this.setState({ photoURL: snapshot.downloadURL });
        } else {
          // Alert.alert('アップロードに失敗しました。');
        }
      });
    }
  };

  navigateToMain = () => {
    const timestamp = Date.now().toString();
    this.props.navigation.navigate({
      routeName: 'MainStack',
      key: 'MainStack' + timestamp,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <LogInHeader
          headerTitle={this.state.headerTitle}
        />
        <View style={[
            styles.activityIndicatorContainer,
          ]}
        >
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color="#DB4D5E" animating={this.state.isUploading} />
          </View>
        </View>
        <ScrollView>
          <UserIcon
            onPress={this.onPressPhoto}
            photoURL={this.state.photoURL}
            dia={80}
            style={styles.icon}
          />
          <EditItem
            onChangeText={this.onChangeTextName}
            title="ユーザー名（最大20文字）"
            maxLength={20}
            value={this.state.name}
            // style={styles.icon}
          />
          <EditItem
            onChangeText={this.onChangeTextDesc}
            title="自己紹介（最大200文字）"
            value={this.state.desc}
            maxLength={200}
            // style={styles.icon}
          />
        </ScrollView>
        <View style={styles.footer}>
          <CancelButton
            onPress={this.onPressCancel}
            style={{ marginRight: 12 }}
          >
            キャンセル
          </CancelButton>
          <SaveButton onPress={this.createProfile}>
            登録
          </SaveButton>
        </View>
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
  activityIndicatorContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: 150,
  },
  activityIndicator: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    left: 24,
    marginTop: 24,
    marginBottom: 20,
  },
  footer: {
    // position: 'absolute',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#C4C4C4',
    // paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 0,
    height: 80,
  },
});

export default InitUser;
