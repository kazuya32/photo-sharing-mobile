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

class PhotoTile extends React.Component {
  state = { user: null }

  componentWillMount() {
    this.getUser(this.props.uid);
  }

  getUser = (uid) => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(uid);
    userRef.get().then((doc) => {
      const user = doc.data();
      console.log(user);
      this.setState({ user });
    });
  }

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
        <View>
          <Image
            style={[styles.photo, photoStyle]}
            source={{ uri: photo.data.downloadURL }}
            // source={require('../../assets/image/athlete/naoya_kondo.jpg')}
            resizeMode="contain"
          />
        </View>
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
                {this.state.user.name}
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
