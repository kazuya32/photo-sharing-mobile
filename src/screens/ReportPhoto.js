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
import { Segment } from 'expo';
import firebase from 'firebase';

import Header from '../components/Header.js';
import SaveButton from '../elements/SaveButton.js';
import CancelButton from '../elements/CancelButton.js';

class ReportPhoto extends React.Component {
  state = {
    logInUser: this.props.navigation.state.params && this.props.navigation.state.params.logInUser,
    headerTitle: 'レポート',
    placeholder: '  理由をお聞かせください。',
    // maxLength: 200,
    isUploading: false,
    text: '',
    email: '  email adress',
    emailValidated : false,
  }

  componentWillMount() {
    Segment.screen('ReportPhoto');

    this.getUser(this.props.navigation.state.params.photo.data.uid);
    this.retrieveLogInUser();
  }

  // eslint-disable-next-line
  retrieveLogInUser = async () => {
    try {
      const logInUid = await AsyncStorage.getItem('uid');
      this.setState({ logInUid });
      this.getLogInUser(logInUid);
    } catch (error) {
    //
    }
  }

  // eslint-disable-next-line
  getUser = (uid) => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(uid);
    userRef.get().then((doc) => {
      const user = { id: doc.id, data: doc.data() };
      this.setState({ user });
    });
  }

  // eslint-disable-next-line
  getLogInUser = (logInUid) => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(logInUid);
    userRef.get().then((doc) => {
      const logInUser = { id: doc.id, data: doc.data() };
      this.setState({ logInUser });
    });
  }

  // eslint-disable-next-line
  autoReply = async () => {
    const { email, logInUser } = this.state;
    const functionURL = `https://us-central1-do-project-4eec7.cloudfunctions.net/autoReply?recipientEmail=${email}&recipientName=${logInUser.data.name}`;
    // eslint-disable-next-line
    const res = await fetch(functionURL);
    // eslint-disable-next-line
    console.log(res);
  }

  // eslint-disable-next-line
  makeReport = () => {
    if (this.state.emailValidated) {
      if (!this.state.isUploading) {
        this.setState({ isUploading: true });
        const createdAt = Date.now();
        const db = firebase.firestore();
        db.collection('reports').doc().set({
          type: 'photo',
          photoId: this.props.navigation.state.params.photo.id,
          reportedBy: this.state.logInUid,
          email: this.state.email,
          desc: this.state.text,
          isRead: false,
          status: 'pending',
          createdAt,
          updatedAt: createdAt,
        })
          .then(() => {
            this.autoReply();
            Alert.alert('不適切な画像をサポートチームに報告しました。');
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
            // eslint-disable-next-line
            console.error('Error writing document: ', error);
            Alert.alert('通信に失敗しました。');
            this.setState({ isUploading: false });
          });
      }
    } else {
      Alert.alert('Emailの形式が正しくありません。');
    }
  }

  validateEmail = () => {
    // eslint-disable-next-line
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === true) {
      this.setState({ emailValidated : true });
    } else {
      this.setState({ emailValidated : false });
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

    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          logInUser={this.state.logInUser}
          headerTitle={this.state.headerTitle}
        />
        <ScrollView>
          <Text style={[styles.text, { color: 'red' }]}>
            {`${this.state.user && this.state.user.data.name}さんの投稿を不適切画像としてサポートチームに連絡します。`}
          </Text>
          <Image
            style={styles.image}
            source={{ uri: this.props.navigation.state.params.photo.data.downloadURL }}
            resizeMode="contain"
          />
          <Text style={styles.text}>
            ご連絡先メールアドレス
          </Text>
          <TextInput
            style={[styles.email]}
            // value={value}
            onChangeText={(text) => { this.setState({ email: text }); }}
            onBlur={this.validateEmail}
            autoCapitalize="none"
            autoCorrect={false}
            // textShadowColor="gray"
            // maxLength={this.state.maxLength}
            placeholder={this.state.email}
            keyboardType="email-address"
          />
          <Text style={styles.text}>
            理由（お手数をおかけしますが、不適切な理由をお聞かせください。）
          </Text>
          <TextInput
            style={[styles.input]}
            // value={value}
            onChangeText={(text) => { this.setState({ text }); }}
            // onBlur={this.addTag}
            autoCapitalize="none"
            autoCorrect={false}
            multiline
            // textShadowColor="gray"
            // maxLength={this.state.maxLength}
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
          <SaveButton onPress={this.makeReport} shadow >
            連絡
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
  },
  text: {
    margin: 16,
  },
  image: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    alignSelf: 'center',
    // marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  email: {
    height: 32,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: '#EBEBEB',
    borderRadius: 5,
    // marginBottom: 16,
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

export default ReportPhoto;
