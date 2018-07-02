import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Alert,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import firebase from 'firebase';

import PhotoHeader from '../components/PhotoHeader.js';
import SelectItem from '../components/SelectItem.js';

class PhotoUploader extends React.Component {
  state = {
    tags: null,
    people: null,
    match: null,
    team: null,
    isUploading: false,
  }

  componentWillMount() {
    this.fetchData();
  }

  // eslint-disable-next-line
  fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      if (value !== null) {
        this.setState({ uid: value });
        // this.fetchUser();
        // this.fetchPhotos();
      }
    } catch (error) {
    //
    }
  }

  onPressAlert = () => {
    Alert.alert('この機能はまだ利用できません。');
  }

  onPress = (tagType, item) => {
    switch (tagType) {
      case 'teams':
        this.setState({ team: item });
        this.props.navigation.navigate({ routeName: 'PhotoUploader' });
        break;
      case 'matchSchedules':
        this.props.navigation.navigate({
          routeName: 'SearchMatch',
          params: {
            tagType: 'matches',
            scheduleId: item.id,
            onPress: this.onPressMatch,
          },
        });
        break;
      case 'matches':
        this.setState({ match: item });
        this.props.navigation.navigate({ routeName: 'PhotoUploader' });
        break;

      default:
        console.log('invalid tagType');
        break;
    }
  }

  onPressMatch = (tagType, item) => {
    this.setState({ match: item });
    this.props.navigation.navigate({ routeName: 'PhotoUploader' });
  }

  addTeam = () => {
    this.props.navigation.navigate({
      routeName: 'SearchTag',
      params: {
        tagType: 'teams',
        onPress: this.onPress,
      },
    });
  }

  addMatch = () => {
    this.props.navigation.navigate({
      routeName: 'SearchTag',
      params: {
        tagType: 'matchSchedules',
        onPress: this.onPress,
      },
    });
  }

  uploadPhoto = async () => {
    if (!this.state.isUploading) {
      this.setState({ isUploading: true });
      // eslint-disable-next-line
      const res = await fetch(this.props.navigation.state.params.image.uri);
      const file = await res.blob();

      const path = `photos/${this.state.uid}/${Date.now().toString()}.jpg`;
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(path);

      imageRef.put(file).then((snapshot) => {
        // console.log(snapshot);
        if (snapshot.state) {
          const createdAt = Date.now();
          this.indexToDatabase(path, snapshot.downloadURL, createdAt);
        } else {
          Alert.alert('アップロードに失敗しました。');
        }
      });
    }
  }

  indexToDatabase = (storagePath, downloadURL, createdAt) => {
    const db = firebase.firestore();
    const ref = db.collection('photos').doc();
    ref.set({
      storagePath,
      downloadURL,
      uid: this.state.uid,
      createdAt,
      tags: this.mapArray(this.state.tags),
      people: this.mapArray(this.state.people),
      matchId: this.state.match && this.state.match.id,
      matchPath: this.state.match && `matchSchedules/${this.state.match.scheduleId}/matches/${this.state.match.id}`,
      teamId: this.state.team && this.state.team.id,
      width: this.props.navigation.state.params.image.width,
      height: this.props.navigation.state.params.image.height,
      likes: 0,
    })
      .then(() => {
        this.props.navigation.navigate({ routeName: 'MyPageFun' });
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
        this.props.navigation.navigate({ routeName: 'MyPageFun' });
      });
  }

  mapArray = (array) => {
    if (array) {
      // eslint-disable-next-line
      let obj = {};
      array.forEach((item) => {
        obj[item] = true;
      });
      return obj;
    }
    return array;
  }

  render() {
    return (
      <View style={styles.container}>
        <PhotoHeader
          onPressLeft={() => { this.props.navigation.goBack(); }}
          onPressRight={this.uploadPhoto}
          headerTitle="New Photo"
          rightButtonTitle="Post"
        />
        <View style={styles.body}>
          <View style={styles.bodyItem}>
            <Image
              style={styles.image}
              source={{ uri: this.props.navigation.state.params.image.uri }}
              // source={this.props.navigation.state.params.image.base64}
              resizeMode="cover"
            />
          </View>
          <SelectItem
            onPress={this.onPressAlert}
            title="Tag People"
            selected=""
          />
          <SelectItem
            onPress={this.addTeam}
            // title="Add Team"
            title={[
              !this.state.team && 'Add Team',
              this.state.team && this.state.team.data.name,
            ]}
          />
          <SelectItem
            onPress={this.addMatch}
            title={[
              !this.state.match && 'Add Match',
              this.state.match && `${this.state.match.data.home.teamName} vs ${this.state.match.data.away.teamName}`,
            ]}
          />
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
  body: {
    flex: 1,
    marginTop: 80,
  },
  bodyItem: {
    borderColor: '#EBEBEB',
    borderBottomWidth: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  image: {
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 4,
  },
});

export default PhotoUploader;
