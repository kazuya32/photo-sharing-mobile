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
} from 'react-native';
import firebase from 'firebase';

import Header from '../components/Header.js';
import SaveButton from '../elements/SaveButton.js';
import CancelButton from '../elements/CancelButton.js';

class ViewRequest extends React.Component {
  state = {
    logInUser: this.props.navigation.state.params && this.props.navigation.state.params.logInUser,
    // headerTitle: 'リクエスト',
    placeholder: '  お返事を書きましょう！（任意）',
  }

  onPress = () => {
    Alert.alert('ダウンロードリクエストを承認しました。');
    this.giveAccess();
    // this.navigateToMyPage();
    this.props.navigation.goBack();
  }

  // eslint-disable-next-line
  giveAccess = async () => {
    const db = firebase.firestore();
    const Ref = db.collection('photos').doc(this.props.navigation.state.params.photo.id);
    Ref.update({
      [`accesses.${this.props.navigation.state.params.user.id}`]: true,
    })
      .then(() => {
        this.setApprove();
        // eslint-disable-next-line
        console.log('Document successfully written!');
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error updating document: ', error);
      });
  }

  setApprove = async () => {
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

  navigateToMyPage = () => {
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid: this.state.logInUser.id,
        logInUser: this.state.logInUser,
      },
      key: 'UserPage' + this.state.logInUser.id,
    });
  }


  render() {
    const {
      request,
      user,
      photo,
    } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Header
          // onPressLeft={() => { this.props.navigation.navigate({ routeName: 'UserPage' }); }}
          onPressLeft={this.navigateToMyPage}
          // onPressLeft={() => { this.setState({ uid: this.state.logInUid }); }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle="FLEGO"
        />
        <ScrollView>
          <Text style={styles.text}>
            {user.data.name}さんからのダウンロードリクエスト
          </Text>
          <Image
            style={styles.image}
            source={{ uri: photo.data.downloadURL }}
            resizeMode="contain"
          />
          <Text style={[styles.message, !request.data.message && { display: 'none' }]}>
            {request.data.message}
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
            maxLength={this.state.maxLength}
            placeholder={this.state.placeholder}
          />
        </ScrollView>
        <View style={styles.footer}>
          <CancelButton onPress={() => { this.props.navigation.goBack(); }}>
            キャンセル
          </CancelButton>
          <SaveButton onPress={this.onPress}>
            承認
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
    // paddingBottom: 80,
  },
  text: {
    padding: 16,
  },
  message: {
    padding: 20,
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
