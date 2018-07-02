import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import firebase from 'firebase';

import Header from '../components/Header.js';
import UserIcon from '../elements/UserIcon.js';
import EditItem from '../components/EditItem.js';
import SendButton from '../elements/SendButton.js';
import CancelButton from '../elements/CancelButton.js';

class EditProfile extends React.Component {
  state = {
    uid: this.props.navigation.state.params.uid,
    user: this.props.navigation.state.params.user,
    name: this.props.navigation.state.params.user.name,
    desc: this.props.navigation.state.params.user.desc,
  }

  // eslint-disable-next-line
  updateProfile = () => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(this.state.uid);
    userRef.update({
      name: this.state.name,
      desc: this.state.desc,
    })
      .then(() => {
        this.props.navigation.goBack();
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error updating document: ', error);
        Alert.alert('データ更新に失敗しました。時間をおいてから再度実行してください。');
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
  onPressSave = () => {
    this.updateProfile();
  }

  // eslint-disable-next-line
  onPressCancel = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          onPressLeft={() => { this.props.navigation.navigate({ routeName: 'MyPageFun' }); }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle="Edit Profile"
        />
        <UserIcon
          // onPress
          photoURL={this.state.user.photoURL}
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
        <View style={styles.footer}>
          <CancelButton onPress={this.onPressCancel}>
            キャンセル
          </CancelButton>
          <SendButton onPress={this.onPressSave}>
            保存
          </SendButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 70,
  },
  icon: {
    left: 24,
    marginTop: 24,
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#C4C4C4',
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 16,
    paddingLeft: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 0,
    height: 60,
  },
});

export default EditProfile;
