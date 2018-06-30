import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import firebase from 'firebase';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class PhotoTile extends React.Component {
  state = {
    stadium: null,
  }

  componentWillMount() {
    const {
      photo,
    } = this.props;
    // this.setState({ photo });

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

  render() {
    const {
      onPressUser,
      photoStyle,
      photo,
    } = this.props;

    if (!this.state.user) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={[styles.match, !this.state.match && { display: 'none' }]}>
          <Text style={styles.prefix}>
            In
          </Text>
          <TouchableHighlight
            // onPress={this.onPressMatch}
            onPress={this.props.onPressMatch}
            underlayColor="transparent"
          >
            <Text style={styles.title}>
              {this.state.match && `${this.state.match.data.home.teamName} vs ${this.state.match.data.away.teamName}`}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.team, !this.state.team && { display: 'none' }]}>
          <Text style={styles.prefix}>
            For
          </Text>
          <TouchableHighlight
            onPress={this.props.onPressTeam}
            underlayColor="transparent"
          >
            <Text style={styles.title}>
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
            <MaterialCommunityIcon name="heart" size={26} color="#D0364C" />
            <Text style={styles.likesNumber}>
              {photo.data.likes}
            </Text>
          </View>
          <View style={styles.userItem}>
            <Text style={styles.userBy}>
              by
            </Text>
            <TouchableHighlight onPress={onPressUser} underlayColor="transparent">
              <Text style={styles.userName}>
                {this.state.user.data.name}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  match: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    paddingTop: 12,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
  },
  team: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 12,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
  },
  title: {
    alignSelf: 'center',
    color: '#DB4D5E',
  },
  prefix: {
    marginRight: 4,
    alignSelf: 'center',
  },
  photo: {
    // width: '100%',
    // height: '100%',
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
    flex: 1,
    alignSelf: 'center',
    // borderColor: '#EBEBEB',
    // borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 20,
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
});

export default PhotoTile;
