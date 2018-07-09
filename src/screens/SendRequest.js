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
} from 'react-native';
import firebase from 'firebase';

import Header from '../components/Header.js';
import SendButton from '../elements/SendButton';
import SaveButton from '../elements/SaveButton.js';
import CancelButton from '../elements/CancelButton.js';

class SendRequest extends React.Component {
  state = {
    logInUser: this.props.navigation.state.params && this.props.navigation.state.params.logInUser,
    headerTitle: 'リクエスト',
    placeholder: '  メッセージを伝えましょう！（任意）',
    maxLength: 200,
    isUploading: false,
  }

  componentWillMount() {
    this.getUser(this.props.navigation.state.params.photo.data.uid);
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

  uploadRequest = () => {
    if (!this.state.isUploading) {
      this.setState({ isUploading: true });
      const db = firebase.firestore();
      db.collection('requests').doc().set({
        from: this.state.logInUser.id,
        to: this.state.user.id,
        photoId: this.props.navigation.state.params.photo.id,
        message: this.state.text,
      })
        .then(() => {
          Alert.alert('ダウンロードリクエストを送信しました。');
          this.setState({ isUploading: false });
          this.props.navigation.navigate({
            routeName: 'Home',
            params: {
              uid: this.state.logInUser.id,
              // user: item,
            },
            key: 'Home' + this.state.logInUser.id,
          });
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    }
  }


  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <Header
            onPressLeft={() => { this.props.navigation.navigate({ routeName: 'UserPage' }); }}
            onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
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
          onPressLeft={() => { this.props.navigation.navigate({ routeName: 'UserPage' }); }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle={this.state.headerTitle}
        />
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
            style={[styles.input]}
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
          <CancelButton onPress={() => { this.props.navigation.goBack(); }}>
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
