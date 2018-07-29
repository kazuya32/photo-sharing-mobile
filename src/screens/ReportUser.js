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
    // this.getUser(this.props.navigation.state.params.photo.data.uid);
    // this.retrieveLogInUser();
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

  report = () => {
    Alert.alert('この機能は調整中です。');
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
            不適切ユーザーとして運営サポートに連絡します。
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
            // onBlur={this.addTag}
            autoCapitalize="none"
            autoCorrect={false}
            // textShadowColor="gray"
            // maxLength={this.state.maxLength}
            placeholder={this.state.email}
          />
          <Text style={styles.text}>
            理由
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
          <SaveButton onPress={this.report} shadow >
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
