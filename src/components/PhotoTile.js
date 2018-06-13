import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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
            <MaterialCommunityIcon name="heart" size={26} color="#D0364C" />
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
