import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Alert,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import firebase from 'firebase';

import Header from '../components/Header.js';
import SaveButton from '../elements/SaveButton.js';
import CancelButton from '../elements/CancelButton.js';

class SendSignature extends React.Component {
  state = {
    headerTitle: 'リクエスト',
    placeholder: '  メッセージを添えましょう！（任意）',
    maxLength: 200,
    isUploading: false,
    text: '',
  }

  componentWillMount() {
    this.getUser(this.props.navigation.state.params.originalPhoto.data.uid);
    this.retrieveLogInUser();
  }

  // eslint-disable-next-line
  retrieveLogInUser = async () => {
    try {
      const logInUid = await AsyncStorage.getItem('uid');
      // const photoURL = await AsyncStorage.getItem('photoURL');
      // const isAthlete = await AsyncStorage.getItem('isAthlete');

      // if (photoURL !== null && isAthlete !== null) {
      // const value = (isAthlete === 'true');
      this.setState({ logInUid });
      // }
    } catch (error) {
    //
    }
  }

  // eslint-disable-next-line
  getUser = (uid) => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(uid);
    userRef.get().then((doc) => {
      // const user = doc.data();
      const user = { id: doc.id, data: doc.data() };
      this.setState({ user });
    });
  }

  uploadPhoto = async () => {
    if (!this.state.isUploading) {
      this.setState({ isUploading: true });
      // eslint-disable-next-line
      const { uri } = this.props.navigation.state.params.signedPhoto;
      const res = await fetch(uri);
      const file = await res.blob();

      const createdAt = Date.now();

      const path = `photos/${this.state.uid}/${createdAt.toString()}.jpg`;
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(path);

      imageRef.put(file).then((snapshot) => {
        // console.log(snapshot);
        if (snapshot.state) {
          this.indexToDatabase(path, snapshot.downloadURL, createdAt);
        } else {
          Alert.alert('アップロードに失敗しました。');
        }
      });
    }
  }

  indexToDatabase = (storagePath, downloadURL, createdAt) => {
    const { originalPhoto } = this.props.navigation.state.params;
    const {
      uid,
      tags,
      people,
      matchId,
      matchPath,
      teamId,
      width,
      height,
      // likes,
      // accesses,
    } = originalPhoto.data;

    const newPhotoId = originalPhoto.id + this.state.logInUid + createdAt;

    const likes = {};
    const accesses = {};
    accesses[uid] = true;

    const db = firebase.firestore();
    const ref = db.collection('photos').doc(newPhotoId);
    ref.set({
      storagePath,
      downloadURL,
      originalPhotoId: originalPhoto.id,
      uid: this.state.logInUid,
      createdAt,
      updatedAt: createdAt,
      tags,
      people,
      matchId,
      matchPath,
      teamId,
      width,
      height,
      likes,
      accesses,
    })
      .then(() => {
        this.setState({ isUploading: false });
        this.setSigned();
        this.sendGift(newPhotoId);
        Alert.alert('デジタルサインを贈りました。');
        this.props.navigation.navigate({
          routeName: 'Home',
          params: {
            uid: this.state.logInUid,
            // user: item,
          },
          key: 'Home',
        });
      })
      .catch((error) => {
        this.setState({ isUploading: false });
        console.error('Error writing document: ', error);
        this.props.navigation.navigate({
          routeName: 'Home',
          params: {
            uid: this.state.logInUid,
            // user: item,
          },
          key: 'Home',
        });
      });
  }

  setSigned = async () => {
    const { originalPhoto } = this.props.navigation.state.params;
    const db = firebase.firestore();
    const ref = db.collection('photos').doc(originalPhoto.id);
    ref.update({
      hasArranged: true,
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

  sendGift = (photoId) => {
    if (!this.state.isUploading) {
      const { originalPhoto } = this.props.navigation.state.params;
      const createdAt = Date.now();
      const db = firebase.firestore();
      db.collection('gifts').doc().set({
        from: this.state.logInUid,
        to: originalPhoto.data.uid,
        photoId,
        message: this.state.text,
        isReadAfterReceived: false,
        isReadAfterApproved: true,
        createdAt,
        updatedAt: createdAt,
        type: 'signature',
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
  }


  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <Header
            navigation={this.props.navigation}
            headerTitle={this.state.headerTitle}
          />
          <View style={styles.indicator}>
            <ActivityIndicator />
          </View>
        </View>
      );
    }

    const { originalPhoto } = this.props.navigation.state.params;
    const photoWidth = Dimensions.get('window').width;
    const XYRate = originalPhoto.data.height / originalPhoto.data.width;
    const photoHeight = photoWidth * XYRate;

    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          logInUser={this.state.logInUser}
          headerTitle={this.state.headerTitle}
        />
        <ScrollView>
          <Text style={styles.text}>
            {this.state.user.data.name}さんにデジタルサインをプレゼントします。
          </Text>
          <Image
            style={[
              styles.image,
              { height: photoHeight, width: photoWidth },
            ]}
            source={{ uri: this.props.navigation.state.params.signedPhoto.uri }}
            resizeMode="contain"
          />
          <TextInput
            style={[
              styles.input,
            ]}
            // value={value}
            onChangeText={(text) => { this.setState({ text }); }}
            // onBlur={this.addTag}
            autoCapitalize="none"
            autoCorrect={false}
            multiline
            // textShadowColor="gray"
            maxLength={this.state.maxLength}
            placeholder={this.state.placeholder}
          />
        </ScrollView>
        <View style={styles.footer}>
          <CancelButton
            onPress={() => { this.props.navigation.goBack(); }}
            style={{ marginRight: 12 }}
          >
            キャンセル
          </CancelButton>
          <SaveButton onPress={this.uploadPhoto} shadow >
            送信
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
  text: {
    margin: 16,
  },
  image: {
    // width: Dimensions.get('window').width / 1,
    // height: Dimensions.get('window').width / 1,
    alignSelf: 'center',
    // marginTop: 16,
    marginBottom: 16,
  },
  input: {
    height: Dimensions.get('window').height / 4,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: '#EBEBEB',
    borderRadius: 5,
  },
  btn: {
    marginBottom: 16,
    marginTop: 16,
  },
  btnTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  indicator: {
    height: Dimensions.get('window').height * 0.6,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
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

export default SendSignature;
