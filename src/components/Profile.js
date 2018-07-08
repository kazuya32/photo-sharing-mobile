import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

import UserIcon from '../elements/UserIcon.js';
import FollowButton from '../elements/FollowButton.js';

class Profile extends React.Component {
  state = {
    isMyPage: this.props.isMyPage,
    isFollowing: this.props.isFollowing,
  }
  render() {
    const {
      onPress,
      userName,
      userDesc,
      photoURL,
      handleFollowButton,
      // isFollowing,
    } = this.props;

    console.log('isFollowing in profile');
    console.log(this.state.isFollowing);

    if (this.state.isMyPage) {
      return (
        <View style={styles.container}>
          <UserIcon
            // onPress
            photoURL={photoURL}
            dia={48}
          />
          <View style={styles.profileText}>
            <Text style={styles.userName}>
              {userName}
            </Text>
            <Text style={styles.userDesc}>
              {userDesc}
            </Text>
          </View>
          <TouchableHighlight style={styles.buttonContainer} onPress={onPress} underlayColor="transparent">
            <View style={styles.menuButton}>
              <Text style={styles.menuButtonTitle}>
                •••
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }


    return (
      <View style={styles.container}>
        <UserIcon
          // onPress
          photoURL={photoURL}
          dia={48}
        />
        <View style={styles.profileText}>
          <Text style={styles.userName}>
            {userName}
          </Text>
          <Text style={styles.userDesc}>
            {userDesc}
          </Text>
        </View>
        <FollowButton
          onPress={onPress}
          style={styles.followButton}
          isFollowing={this.state.isFollowing}
          handleFollowButton={handleFollowButton}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  profileText: {
    alignSelf: 'center',
    paddingLeft: 12,
    justifyContent: 'space-around',
  },
  userName: {
    // flex: 2,
    fontSize: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  userDesc: {
    // flex: 1,
    fontSize: 14,
  },
  buttonContainer: {
    position: 'absolute',
    right: 16,
    // height: 30,
    alignSelf: 'center',
  },
  menuButton: {
    backgroundColor: '#fff',
    borderRadius: 18,
    height: 30,
    width: 30,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#DB4D5E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  menuButtonTitle: {
    color: '#DB4D5E',
    alignSelf: 'center',
    fontSize: 8,
  },
  followButton: {
    position: 'absolute',
    right: 16,
    // height: 30,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
});

export default Profile;
