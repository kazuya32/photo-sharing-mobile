import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase';

import UserIcon from '../elements/UserIcon.js';
import EditButton from '../elements/EditButton.js';
import RequestButton from '../elements/RequestButton.js';
import FollowButton from '../elements/FollowButton.js';

class Profile extends React.Component {
  state = {
    isMyPage: this.props.isMyPage,
    isFollowing: this.props.isFollowing,
  }

  // componentWillMount() {
  //   if (this.state.isMyPage) {
  //     this.fetchRequest();
  //   }
  // }

  // fetchRequest = () => {
  //   const db = firebase.firestore();
  //   const requestRef = db.collection('request').where('to', '==', this.props.logInUid);
  //
  //   const requests = [];
  //   requestRef.onSnapshot((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       requests.push({
  //         id: doc.id,
  //         data: doc.data(),
  //       });
  //       this.setState({ requests });
  //     });
  //   });
  // }

  render() {
    const {
      onPressEdit,
      onPressRequest,
      userName,
      userDesc,
      photoURL,
      handleFollowButton,
      requests,
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
          <RequestButton
            style={styles.requestButton}
            onPress={onPressRequest}
            hasRequest={requests && requests.length}
            requests={requests}
          />
          <EditButton
            style={styles.editButton}
            onPress={onPressEdit}
          />
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
  editButton: {
    position: 'absolute',
    right: 16,
    // height: 30,
    alignSelf: 'center',
  },
  requestButton: {
    position: 'absolute',
    right: 68,
    // height: 30,
    alignSelf: 'center',
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
