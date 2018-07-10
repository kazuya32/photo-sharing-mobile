import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import firebase from 'firebase';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import TagTile from '../components/TagTile.js';

class PhotoTile extends React.Component {
  state = {
    stadium: null,
    liked: this.props.photo.data.likes[this.props.uid],
    // logInUser: this.props.logInUser,
    uid: this.props.uid,
  }

  componentWillMount() {
    const {
      photo,
    } = this.props;
    // this.setState({ photo });

    const likes = this.makeListFromObject(photo.data.likes);
    this.setState({ likes });

    this.getUser(photo.data.uid);

    if (photo.data.matchPath) {
      this.getMatch(photo.data.matchPath);
    }

    if (photo.data.teamId) {
      this.getTeam(photo.data.teamId);
    }
  }

  getUser = (uid) => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(uid);
    userRef.get().then((doc) => {
      // const user = doc.data();
      const user = { id: doc.id, data: doc.data() };
      this.setState({ user });
    });
  }

  getMatch = (matchPath) => {
    const db = firebase.firestore();
    const Ref = db.doc(matchPath);
    Ref.get().then((doc) => {
      const match = { id: doc.id, data: doc.data() };
      this.setState({ match });
    });
  }

  getTeam = (teamId) => {
    const db = firebase.firestore();
    const Ref = db.collection('teams').doc(teamId);
    Ref.get().then((doc) => {
      const team = { id: doc.id, data: doc.data() };
      this.setState({ team });
    });
  }

  // eslint-disable-next-line
  makeListFromObject = (obj) => {
    // const count = 0;
    const array = [];
    Object.keys(obj).forEach((prop) => {
      if (obj[prop]) {
        array.push(prop);
      }
    });
    return array;
  };

  // onPressMatch = () => {
  //   this.props.navigation.navigate({
  //     routeName: 'MatchFeed',
  //     params: {
  //       feedType: 'match',
  //       itemId: this.state.match.data.matchId,
  //       matchPath: this.state.match.data.matchPath,
  //     },
  //   });
  // }

  handleLikeButton = (nextValue) => {
    let { likes } = this.state;
    if (nextValue) {
      likes.push(this.state.uid);
    } else {
      likes = this.deletePropFromArray(likes, this.state.uid);
    }

    this.setState({ liked: nextValue, likes });

    const db = firebase.firestore();
    const ref = db.collection('photos').doc(this.props.photo.id);
    ref.update({
      [`likes.${this.state.uid}`]: nextValue,
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

  deletePropFromArray = (array, prop) => {
    const index = array.indexOf(prop);

    if (index >= 0) {
      array.splice(index, 1);
    }
    return array;
  };

  render() {
    const {
      onPressUser,
      photoStyle,
      photo,
    } = this.props;

    if (!this.state.user) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator />
        </View>
      );
    }

    let iconName;

    if (this.state.liked) {
      iconName = 'heart';
    } else {
      iconName = 'heart-outline';
    }

    return (
      <View style={styles.container}>
        <View style={[styles.match, !this.state.match && { display: 'none' }]}>
          <Text style={styles.matchPrefix}>
            In
          </Text>
          <TouchableHighlight
            // onPress={this.onPressMatch}
            onPress={this.props.onPressMatch}
            underlayColor="transparent"
          >
            <Text style={styles.matchTitle}>
              {this.state.match && `${this.state.match.data.home.teamName} vs ${this.state.match.data.away.teamName}`}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.team, !this.state.team && { display: 'none' }]}>
          <Text style={styles.teamPrefix}>
            For
          </Text>
          <TouchableHighlight
            onPress={this.props.onPressTeam}
            underlayColor="transparent"
          >
            <Text style={styles.teamTitle}>
              {this.state.team && `${this.state.team.data.name}`}
            </Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          onPress={this.props.onPressPhoto}
          underlayColor="transparent"
        >
          <Image
            style={[styles.photo, photoStyle]}
            source={{ uri: photo.data.downloadURL }}
            resizeMode="contain"
          />
        </TouchableHighlight>
        <View style={styles.bar}>
          <View style={styles.likes}>
            <TouchableHighlight
              onPress={() => { this.handleLikeButton(!this.state.liked); }}
              underlayColor="transparent"
            >
              <MaterialCommunityIcon
                name={iconName}
                size={26}
                style={[styles.heart]}
              />
            </TouchableHighlight>
            <Text style={styles.likesNumber}>
              {this.state.likes.length}
            </Text>
          </View>
          <View style={styles.userItem}>
            <Text style={styles.userBy}>
              by
            </Text>
            <TouchableHighlight
              onPress={() => { onPressUser(this.state.user.id); }}
              underlayColor="transparent"
            >
              <Text style={styles.userName}>
                {this.state.user.data.name}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <TagTile
          style={[styles.tags, !photo.data.tags && { display: 'none' }]}
          tags={photo.data.tags}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  indicator: {
    height: Dimensions.get('window').height * 0.6,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  match: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
  },
  team: {
    alignContent: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
  },
  matchTitle: {
    alignSelf: 'center',
    color: '#DB4D5E',
    // fontSize: 12,
  },
  teamTitle: {
    color: '#DB4D5E',
    fontSize: 12,
  },
  matchPrefix: {
    marginRight: 4,
    alignSelf: 'center',
  },
  teamPrefix: {
    marginRight: 4,
    fontSize: 12,
  },
  photo: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
    flex: 1,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    // paddingBottom: 12,
  },
  heart: {
    color: '#D0364C',
    // borderWidth: 1,
    // borderColor: '#D0364C',
  },
  heartLiked: {
    color: '#fff',
  },
  likes: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  likesNumber: {
    paddingLeft: 8,
    paddingRight: 12,
    fontSize: 18,
    paddingBottom: 4,
    alignSelf: 'center',
  },
  userItem: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  userBy: {
    marginRight: 4,
    alignSelf: 'center',
  },
  userName: {
    color: '#DB4D5E',
    alignSelf: 'center',
  },
  tags: {
    // paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
  },
});

export default PhotoTile;
