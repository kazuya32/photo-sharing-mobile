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

class SendRequest extends React.Component {
  state = {
    headerTitle: 'リクエスト',
    placeholder: '  メッセージを伝えましょう！（任意）',
    maxLength: 200,
    isUploading: false,
    text: '',
  }

  componentWillMount() {
    this.getUser(this.props.navigation.state.params.photo.data.uid);
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

  // eslint-disable-next-line
  uploadRequest = () => {
    if (!this.state.isUploading) {
      this.setState({ isUploading: true });
      const createdAt = Date.now();
      const db = firebase.firestore();
      db.collection('requests').doc().set({
        from: this.state.logInUid,
        to: this.state.user.id,
        photoId: this.props.navigation.state.params.photo.id,
        message: this.state.text,
        isRead: false,
        status: 'pending',
        createdAt,
        updatedAt: createdAt,
      })
        .then(() => {
          this.setPending();
          Alert.alert('ダウンロードリクエストを送信しました。');
          this.setState({ isUploading: false });
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
          console.error('Error writing document: ', error);
        });
    }
  }

  setPending = async () => {
    const db = firebase.firestore();
    const ref = db.collection('photos').doc(this.props.navigation.state.params.photo.id);
    ref.update({
      [`pendingRequests.${this.state.logInUid}`]: true,
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

    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
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
          <Text style={styles.text}>
            {this.state.user.data.name}さんにダウンロードリクエストを送信します。
          </Text>
          <Image
            style={styles.image}
            source={{ uri: this.props.navigation.state.params.photo.data.downloadURL }}
            resizeMode="contain"
          />
          <TextInput
            style={[
              styles.input,
              { display: 'none' },
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
          <SaveButton onPress={this.uploadRequest} shadow >
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
  activityIndicatorContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 150,
  },
  activityIndicator: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    margin: 16,
  },
  image: {
    width: Dimensions.get('window').width / 1,
    height: Dimensions.get('window').width / 1,
    alignSelf: 'center',
    // marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  input: {
    height: Dimensions.get('window').height / 2.5,
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

export default SendRequest;
