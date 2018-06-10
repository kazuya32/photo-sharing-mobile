import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';

import HeartIcon from '../../assets/icon/valentines-heart-white.png';

class PhotoTile extends React.Component {
  render() {
    const {
      onPressUser,
      photoStyle,
      photo,
      likes,
      userName,
    } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <Image
            style={[styles.photo, photoStyle]}
            source={photo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.bar}>
          <View style={styles.likes}>
            <Image
              style={styles.heart}
              source={HeartIcon}
            />
            <Text style={styles.likesNumber}>
              {likes}
            </Text>
          </View>
          <View style={styles.userItem}>
            <Text style={styles.userBy}>
              by
            </Text>
            <TouchableHighlight onPress={onPressUser} underlayColor="transparent">
              <Text style={styles.userName}>
                {userName}
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
    alignSelf: 'center',
    borderColor: '#EBEBEB',
    borderWidth: 1,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    paddingLeft: 12,
    paddingRight: 12,
  },
  heart: {
  },
  userItem: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  userBy: {
    marginRight: 4,
  },
  userName: {
    color: '#DB4D5E',
  },
});

export default PhotoTile;
