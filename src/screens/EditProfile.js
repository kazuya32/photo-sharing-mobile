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
    user: this.props.navigation.state.params.user,
    name: this.props.navigation.state.params.user.name,
    desc: this.props.navigation.state.params.user.desc,
  }

  componentWillMount() {
    this.setAuth();
  }

  // eslint-disable-next-line
  setAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const {
          displayName,
          email,
          emailVerified,
          photoURL,
          isAnonymous,
          uid,
          providerData,
        } = user;

        this.setState({
          displayName,
          email,
          emailVerified,
          photoURL,
          isAnonymous,
          uid,
          providerData,
        });
      // eslint-disable-next-line
      } else {
        this.props.navigation.navigate({ routeName: 'Login' });
      }
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
  onPressTest = () => {
    Alert.alert('実装中');
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
          title="ユーザー名"
          value={this.state.name}
          // style={styles.icon}
        />
        <EditItem
          onChangeText={this.onChangeTextDesc}
          title="自己紹介"
          value={this.state.desc}
          // style={styles.icon}
        />
        <View style={styles.footer}>
          <CancelButton onPress={this.onPressTest}>
            キャンセル
          </CancelButton>
          <SendButton onPress={this.onPressTest}>
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
