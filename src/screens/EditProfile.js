import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import {
  ImagePicker,
  Permissions,
} from 'expo';
import firebase from 'firebase';

import designLanguage from '../../designLanguage.json';
import Header from '../components/Header.js';
import UserIcon from '../elements/UserIcon.js';
import EditItem from '../components/EditItem.js';
import SaveButton from '../elements/SaveButton.js';
import CancelButton from '../elements/CancelButton.js';
import MyTeams from '../components/MyTeams.js';

class EditProfile extends React.Component {
  state = {
    uid: this.props.navigation.state.params.uid,
    // user: this.props.navigation.state.params.user,
    name: this.props.navigation.state.params.user.data.name,
    desc: this.props.navigation.state.params.user.data.desc,
    photoURL: this.props.navigation.state.params.user.data.photoURL,
    iconLoading: false,
    myTeams: this.props.navigation.state.params.user.data.myTeams,
    primaryMyTeamId: this.props.navigation.state.params.user.data.primaryMyTeamId,
  }

  // eslint-disable-next-line
  updateProfile = () => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(this.state.uid);
    userRef.update({
      name: this.state.name || '',
      desc: this.state.desc || '',
      photoURL: this.state.photoURL || '',
      myTeams: this.state.myTeams || {},
      primaryMyTeamId: this.state.primaryMyTeamId || '',
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

  onPressPhoto = () => {
    this.getPermission();
  }

  getPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.pickImage();
    } else {
      // this.props.navigation.navigate({ routeName: 'Home' });
      Alert.alert('カメラロールの使用が許可されていません。');
    }
  }

  deleteMyTeam = (teamId) => {
    Alert.alert(
      'チームリストから削除します。よろしいでですか？',
      undefined,
      [
        // eslint-disable-next-line
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            const { myTeams } = this.state;
            delete myTeams[teamId];
            if (this.state.primaryMyTeamId === teamId) {
              let primaryMyTeamId;
              if (Object.keys(myTeams).length) {
                // eslint-disable-next-line
                primaryMyTeamId = Object.keys(myTeams)[0];
              } else {
                primaryMyTeamId = null;
              }
              this.setState({ myTeams, primaryMyTeamId });
            } else {
              this.setState({ myTeams });
            }
          },
        },
      ],
      { cancelable: false },
    );
  }

  onPressTeam = (tagType, item) => {
    const myTeams = this.state.myTeams || {};
    myTeams[item.id] = true;

    if (!this.state.primaryMyTeamId) {
      this.setState({ myTeams, primaryMyTeamId: item.id });
    } else {
      this.setState({ myTeams });
    }
    this.props.navigation.navigate({ routeName: 'EditProfile' });
  }

  addTeam = () => {
    this.props.navigation.navigate({
      routeName: 'SearchTag',
      params: {
        tagType: 'teams',
        onPress: this.onPressTeam,
      },
    });
  }

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });
    console.log(result);

    if (result.cancelled) {
      // this.props.navigation.navigate({ routeName: 'Home' });
      // Alert.alert('カメラロールの使用が許可されていません。');
    } else {
      this.setState({ iconLoading: true });
      const { uri } = result;
      // this.setState({ photoURL: uri, photoChanged: true })
      // eslint-disable-next-line
      const res = await fetch(uri);
      const file = await res.blob();

      const timestamp = Date.now().toString();
      const path = `photos/${this.state.uid}/profile${timestamp}.png`;
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(path);

      imageRef.put(file).then((snapshot) => {
        if (snapshot.state) {
          this.setState({ photoURL: snapshot.downloadURL, iconLoading: false });
        } else {
          // Alert.alert('アップロードに失敗しました。');
        }
      });
    }
  };

  // eslint-disable-next-line
  makeListFromObject = (obj) => {
    if (!obj) { return null; }

    const array = [];
    Object.keys(obj).forEach((prop) => {
      if (obj[prop]) {
        array.push(prop);
      }
    });
    return array;
    // this.setState({ temas: array });
  };

  render() {
    const { isAthlete } = this.props.navigation.state.params.user.data;

    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          headerTitle="プロフィールを編集"
        />
        <ScrollView>
          <UserIcon
            onPress={this.onPressPhoto}
            photoURL={this.state.photoURL}
            dia={80}
            style={styles.icon}
            loading={this.state.iconLoading}
            // logoURL={this.state.logoURL}
          />
          <MyTeams
            teams={this.makeListFromObject(this.state.myTeams)}
            onPress={this.deleteMyTeam}
          />
          <SaveButton
            onPress={this.addTeam}
            style={styles.addTeam}
            buttonStyle={styles.addTeamButton}
            invisible={isAthlete && this.state.myTeams && Object.keys(this.state.myTeams).length}
          >
            マイチーム追加
          </SaveButton>
          <EditItem
            onChangeText={this.onChangeTextName}
            title="ユーザー名（最大20文字）"
            maxLength={20}
            value={this.state.name}
          />
          <EditItem
            onChangeText={this.onChangeTextDesc}
            title="自己紹介（最大200文字）"
            value={this.state.desc}
            maxLength={200}
          />
        </ScrollView>
        <View style={styles.footer}>
          <CancelButton
            onPress={this.onPressCancel}
            style={{ marginRight: 12 }}
          >
            キャンセル
          </CancelButton>
          <SaveButton onPress={this.onPressSave}>
            保存
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
  icon: {
    marginLeft: 24,
    marginTop: 24,
    marginBottom: 24,
    alignItems: 'flex-start',
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
  addTeam: {
    marginTop: 16,
    marginBottom: 32,
  },
  addTeamButton: {
    backgroundColor: designLanguage.color300,
  },
});

export default EditProfile;
