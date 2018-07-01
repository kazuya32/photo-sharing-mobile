import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

import UserIcon from '../elements/UserIcon.js';

class Profile extends React.Component {
  render() {
    const {
      onPress,
      userName,
      userDesc,
      photoURL,
    } = this.props;

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
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 24,
    paddingBottom: 36,
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
});

export default Profile;
