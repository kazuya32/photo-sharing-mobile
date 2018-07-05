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

class PhotoUploader extends React.Component {
  state = {
    headerTitle: 'リクエスト',
    placeholder: '  メッセージを伝えましょう！（任意）',
    maxLength: 200,
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


  onPress = () => {
    Alert.alert('この機能はまだ利用できません。');
  }


  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <Header
            onPressLeft={() => { this.props.navigation.navigate({ routeName: 'MyPageFun' }); }}
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
          onPressLeft={() => { this.props.navigation.navigate({ routeName: 'MyPageFun' }); }}
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
          <SendButton
            onPress={this.onPress}
            style={styles.btn}
            textStyle={styles.btnTitle}
          >
            送信
          </SendButton>
        </ScrollView>
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

});

export default PhotoUploader;
