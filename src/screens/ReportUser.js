import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import firebase from 'firebase';

import Header from '../components/Header.js';
import SaveButton from '../elements/SaveButton.js';
import CancelButton from '../elements/CancelButton.js';
import UserIcon from '../elements/UserIcon.js';

class Report extends React.Component {
  state = {
    logInUser: this.props.navigation.state.params && this.props.navigation.state.params.logInUser,
    headerTitle: 'レポート',
    placeholder: '  理由をお聞かせください。',
    // maxLength: 200,
    isUploading: false,
    text: '',
    email: '  email adress',
  }

  componentWillMount() {
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

  validateEmail = () => {
    // eslint-disable-next-line
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === true) {
      this.setState({ emailValidated : true });
    } else {
      this.setState({ emailValidated : false });
    }
  }

  // eslint-disable-next-line
  makeReport = () => {
    if (this.state.emailValidated) {
      if (!this.state.isUploading) {
        const { user } = this.props.navigation.state.params;
        this.setState({ isUploading: true });
        const createdAt = Date.now();
        const db = firebase.firestore();
        db.collection('reports').doc().set({
          type: 'user',
          uid: user.id,
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
            Alert.alert('不適切なユーザーをサポートチームに報告しました。');
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

  render() {
    const { user } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          logInUser={this.state.logInUser}
          headerTitle={this.state.headerTitle}
        />
        <ScrollView>
          <Text style={[styles.text, { color: 'red' }]}>
            {`${user.data.name}さんを不適切ユーザーとしてサポートチームに連絡します。`}
          </Text>
          <View style={styles.profile}>
            <UserIcon
              // onPress
              photoURL={user && user.data.photoURL}
              dia={48}
              isAthlete={(user && user.data.isAthlete)}
            />
            <Text style={styles.name}>
              {user && user.data.name}
            </Text>
          </View>
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
    paddingTop: 80,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 16,
    // paddingBottom: 16,
    // paddingLeft: 16,
    // paddingRight: 16,
    margin: 16,
  },
  name: {
    // flex: 2,
    fontSize: 16,
    marginLeft: 16,
    // paddingTop: 8,
    // paddingBottom: 8,
  },
  text: {
    margin: 16,
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

export default Report;
