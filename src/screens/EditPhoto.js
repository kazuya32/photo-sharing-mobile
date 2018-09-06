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
import { CheckBox } from 'react-native-elements';

import designLanguage from '../../designLanguage.json';
import Header from '../components/Header.js';
import SelectItem from '../components/SelectItem.js';
import TagBox from '../components/TagBox.js';
import SaveButton from '../elements/SaveButton.js';
import CancelButton from '../elements/CancelButton.js';

class EditPhoto extends React.Component {
  state = {
    tags: [],
    people: [],
    match: null,
    team: null,
    isUploading: false,
  }

  componentWillMount() {
    if (this.props.navigation.state.params && this.props.navigation.state.params.photo) {
      const { photo } = this.props.navigation.state.params;
      this.setState({ photo });

      const {
        tags,
        people,
        matchId,
        teamId,
        unlisted,
      } = photo.data;

      if (tags) {
        const tagsArray = this.makeListFromObject(tags);
        this.setState({ tags: tagsArray });
      }

      if (people) {
        const peopleIdArray = this.makeListFromObject(people);
        peopleIdArray.forEach((item) => { this.fetchUser(item); });
      }

      if (matchId) { this.fetchMatch(matchId); }

      if (teamId) { this.fetchTeam(teamId); }

      this.setState({ unlisted });
    }
  }

  // eslint-disable-next-line
  fetchUser = (userId) => {
    const db = firebase.firestore();
    const Ref = db.collection('users').doc(userId);
    Ref.get().then((doc) => {
      const user = { id: doc.id, data: doc.data() };
      const { people } = this.state;
      people.push(user);
      this.setState({ people });
    });
  }

  fetchTeam = (teamId) => {
    const db = firebase.firestore();
    const Ref = db.collection('teams').doc(teamId);
    Ref.get().then((doc) => {
      const team = { id: doc.id, data: doc.data() };
      this.setState({ team });
    });
  }

  fetchMatch = (matchId) => {
    const db = firebase.firestore();
    const Ref = db.collection('matches').doc(matchId);
    Ref.get().then((doc) => {
      const match = { id: doc.id, data: doc.data() };
      this.setState({ match });
    });
  }

  // eslint-disable-next-line
  makeListFromObject = (obj) => {
    const array = [];
    Object.keys(obj).forEach((prop) => {
      if (obj[prop]) {
        array.push(prop);
      }
    });
    return array;
  };

  storeUserPhoto = async (photoURL) => {
    try {
      await AsyncStorage.setItem('photoURL', photoURL);
    } catch (error) {
      // Error saving data
    }
  }

  onPressAlert = () => {
    Alert.alert('この機能はまだ利用できません。');
  }

  onPress = (tagType, item) => {
    switch (tagType) {
      case 'teams':
        this.setState({ team: item });
        this.props.navigation.navigate({
          routeName: 'EditPhoto',
          key: this.props.navigation.state.params.key,
        });
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
        this.props.navigation.navigate({
          routeName: 'EditPhoto',
          key: this.props.navigation.state.params.key,
        });
        break;

      default:
        console.log('invalid tagType');
        break;
    }
  }

  onPressMatch = (tagType, item) => {
    this.setState({ match: item });
    this.props.navigation.navigate({
      routeName: 'EditPhoto',
      key: this.props.navigation.state.params.key,
    });
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

  updatePhoto = () => {
    if (!this.state.isUploading) {
      const updatedAt = Date.now();
      const db = firebase.firestore();
      const photoRef = db.collection('photos').doc(this.state.photo.id);
      photoRef.update({
        updatedAt,
        tags: this.mapArray(this.state.tags),
        people: this.mapArrayPeople(this.state.people),
        matchId: this.state.match && this.state.match.id,
        matchPath: this.state.match && `matchSchedules/${this.state.match.data.scheduleId}/matches/${this.state.match.id}`,
        teamId: this.state.team && this.state.team.id,
        unlisted: this.state.unlisted,
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
  }

  mapArrayPeople = (peopleArray) => {
    if (peopleArray) {
      // eslint-disable-next-line
      let obj = {};
      peopleArray.forEach((user) => {
        obj[user.id] = true;
      });
      return obj;
    }
    return peopleArray;
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

  // eslint-disable-next-line
  setTags = (tags) => {
    this.setState({ tags });
  }

  onPressUser = (item) => {
    const { people } = this.state;
    let count = 0;
    people.forEach((user) => {
      if (user.id !== item.id) { count += 1; }
    });
    if (count === people.length) { people.push(item); }
    this.setState({ people });
    // return this.props.navigation.navigate({ routeName: 'PhotoUploader' });
    return this.props.navigation.navigate({
      routeName: 'EditPhoto',
      key: this.props.navigation.state.params.key,
    });
  }

  tagPeople = () => {
    this.props.navigation.navigate({
      routeName: 'PlayerList',
      params: {
        onPress: this.onPressUser,
      },
    });
  }

  onIconPress = () => {
    if (this.state.unlisted) {
      this.setState({ unlisted: false });
    } else {
      this.setState({ unlisted: 'feed' });
    }
  }

  render() {
    let textPeople = '';

    if (this.state.people.length) {
      this.state.people.forEach((user) => {
        textPeople += user.data.name;
        textPeople += ', ';
      });
    } else {
      textPeople = 'Tag People';
    }

    return (
      <View style={styles.container}>
        <Header
          headerTitle="写真を編集する"
          navigation={this.props.navigation}
        />
        <View style={styles.body}>
          <View style={styles.top}>
            <Image
              style={styles.image}
              source={{ uri: this.props.navigation.state.params.photo.data.downloadURL }}
              resizeMode="contain"
            />
            <TagBox
              placeholder="タグをつける"
              setter={this.setTags}
              value={this.state.tagText}
              style={styles.tagBox}
              tags={this.state.tags}
            />
          </View>
          <SelectItem
            onPress={this.tagPeople}
            title={textPeople}
          />
          <SelectItem
            onPress={this.addTeam}
            title={[
              !this.state.team && 'Add Team',
              this.state.team && this.state.team.data.name,
            ]}
          />
          <SelectItem
            onPress={this.addMatch}
            title={[
              !this.state.match && 'Add Match',
              this.state.match && `${this.state.match.data.homeTeam.fullname} vs ${this.state.match.data.awayTeam.fullname}`,
            ]}
          />
          <CheckBox
            iconType="material-community"
            checkedIcon="checkbox-marked-outline"
            uncheckedIcon="checkbox-blank-outline"
            title="フィード画面に非表示にする"
            checked={this.state.unlisted && true}
            containerStyle={styles.unlisted}
            // onIconPress={this.onIconPress}
            onPress={this.onIconPress}
            checkedColor={designLanguage.color900}
          />
        </View>
        <View style={styles.footer}>
          <CancelButton
            onPress={() => { this.props.navigation.goBack(); }}
            style={{ marginRight: 12 }}
          >
            キャンセル
          </CancelButton>
          <SaveButton onPress={this.updatePhoto}>
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
  body: {
    flex: 1,
  },
  // tags: {
  //   flexDirection: 'row',
  // },
  top: {
    borderColor: '#EBEBEB',
    borderBottomWidth: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
  },
  image: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
  },
  tagBox: {
    height: Dimensions.get('window').width / 3,
  },
  unlisted: {
    backgroundColor: '#fff',
    shadowColor: '#fff',
    borderWidth: 0,
  },
  footer: {
    position: 'absolute',
    width: '100%',
    borderTopWidth: 1,
    borderColor: designLanguage.footerBorderColor,
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

export default EditPhoto;
