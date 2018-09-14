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
  AsyncStorage,
} from 'react-native';
import { Segment } from 'expo';
import firebase from 'firebase';

import Header from '../components/Header.js';
import SaveButton from '../elements/SaveButton.js';
import CancelButton from '../elements/CancelButton.js';

class ViewRequest extends React.Component {
  state = {
    // headerTitle: 'リクエスト',
    placeholder: '  お返事を書きましょう！（任意）',
  }

  componentWillMount() {
    Segment.screen('ViewRequest');
  }

  onPressApprove = () => {
    Alert.alert('ダウンロードリクエストを承認しました。');
    this.setState({ status: 'approved' });
    this.giveAccess();
    this.props.navigation.goBack();
  }

  onPressDecline = () => {
    Alert.alert('ダウンロードリクエストを見送りました。');
    this.setState({ status: 'declined' });
    this.removeAccess();
    this.props.navigation.goBack();
  }

  // eslint-disable-next-line
  pushApproveNotification = async () => {
    const { user } = this.props.navigation.state.params;
    const token = user && user.data.pushToken;

    if (typeof token !== 'undefined') {
      const db = firebase.firestore();
      const logInUid = await AsyncStorage.getItem('uid');
      const userRef = db.collection('users').doc(logInUid);
      userRef.get().then((doc) => {
        // const user = doc.data();
        const logInUser = { id: doc.id, data: doc.data() };
        const logInUserName = logInUser.data.name;
        const suffix = logInUser.data.isAthlete ? '選手' : 'さん';

        const message = `${logInUserName}${suffix}があなたのダウンロードリクエストを承認しました。`;

        const expoPushEndpoint = 'https://exp.host/--/api/v2/push/send';
        fetch(expoPushEndpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip,deflate',
          },
          body: JSON.stringify({
            to: token,
            title: 'FLEGO',
            body: message,
          }),
        });
      });
    }
  }

  // eslint-disable-next-line
  giveAccess = async () => {
    const db = firebase.firestore();
    const Ref = db.collection('photos').doc(this.props.navigation.state.params.photo.id);
    Ref.update({
      [`accesses.${this.props.navigation.state.params.user.id}`]: true,
    })
      .then(() => {
        this.setApproved();
        this.pushApproveNotification();
        // eslint-disable-next-line
        console.log('Document successfully written!');
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error updating document: ', error);
      });
  }

  removeAccess = async () => {
    const db = firebase.firestore();
    const Ref = db.collection('photos').doc(this.props.navigation.state.params.photo.id);
    Ref.update({
      [`accesses.${this.props.navigation.state.params.user.id}`]: false,
    })
      .then(() => {
        this.setDeclined();
        // eslint-disable-next-line
        console.log('Document successfully written!');
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error updating document: ', error);
      });
  }

  setApproved = async () => {
    const db = firebase.firestore();
    const Ref = db.collection('requests').doc(this.props.navigation.state.params.request.id);
    Ref.update({
      status: 'approved',
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

  setDeclined = async () => {
    const db = firebase.firestore();
    const Ref = db.collection('requests').doc(this.props.navigation.state.params.request.id);
    Ref.update({
      status: 'declined',
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
    const {
      request,
      user,
      photo,
    } = this.props.navigation.state.params;

    let isApproved;

    if (typeof this.state.status === 'undefined') {
      // eslint-disable-next-line
      isApproved = (request.data.status === 'approved');
    } else {
      // eslint-disable-next-line
      isApproved = (this.state.status === 'approved');
    }

    const photoWidth = Dimensions.get('window').width;
    const XYRate = photo.data.height / photo.data.width;
    const photoHeight = photoWidth * XYRate;

    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          headerTitle="FLEGO"
        />
        <ScrollView>
          <Text style={styles.text}>
            {user.data.name}さんからのダウンロードリクエスト
          </Text>
          <Image
            style={[
              styles.image,
              { height: photoHeight, width: photoWidth },
            ]}
            source={{ uri: photo.data.downloadURL }}
            resizeMode="contain"
          />
          <Text style={[styles.message, !request.data.message && { display: 'none' }]}>
            {request.data.message}
          </Text>
          <TextInput
            style={[styles.input, { display: 'none' }]}
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
        <View
          style={[
            styles.footer,
            (isApproved) && { display: 'none' },
          ]}
        >
          <CancelButton
            style={{ marginRight: 12 }}
            onPress={() => { this.props.navigation.goBack(); }}
          >
            キャンセル
          </CancelButton>
          <CancelButton
            style={{ marginRight: 12 }}
            onPress={this.onPressDecline}
          >
            承認しない
          </CancelButton>
          <SaveButton onPress={this.onPressApprove}>
            承認
          </SaveButton>
        </View>
        <View
          style={[
            styles.footer,
            (!isApproved) && { display: 'none' },
          ]}
        >
          <CancelButton
            style={{ marginRight: 12 }}
            onPress={() => { this.props.navigation.goBack(); }}
          >
            キャンセル
          </CancelButton>
          <CancelButton onPress={this.onPressDecline}>
            取り消す
          </CancelButton>
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
    padding: 16,
  },
  message: {
    padding: 20,
  },
  image: {
    // width: Dimensions.get('window').width / 1,
    // height: Dimensions.get('window').width / 1,
    alignSelf: 'center',
    // marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  input: {
    height: Dimensions.get('window').height / 3,
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

export default ViewRequest;
