import React from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import UserIcon from '../elements/UserIcon.js';
import EditButton from '../elements/EditButton.js';
import RequestButton from '../elements/RequestButton.js';
import FollowButton from '../elements/FollowButton.js';
import CheckMark from '../elements/CheckMark.js';

class Profile extends React.Component {
  state = {
    // isMyPage: this.props.isMyPage,
    // isFollowing: this.props.isFollowing,
  }

  componentDidMount() {
    this.checkMyPage();
  }

  checkMyPage = async () => {
    const value = await AsyncStorage.getItem('uid');
    const isMyPage = (this.props.uid === value);
    // const isMyPage = (this.props.uid === this.props.logInUser.id);
    this.setState({
      isMyPage,
    });
  }

  countUnread = (requests) => {
    let unreadSum = 0;
    if (requests) {
      requests.forEach((request) => {
        if (!request.data.isReadAfterReceived) {
          unreadSum += 1;
        }
      });
    }
    return unreadSum;
  }

  countApproved = (requests) => {
    let approvedSum = 0;
    if (requests) {
      requests.forEach((request) => {
        if (request.data.status === 'approved' && !request.data.isReadAfterApproved) {
          approvedSum += 1;
        }
      });
    }
    return approvedSum;
  }

  render() {
    const {
      onPressEdit,
      onPressRequest,
      photoURL,
      handleFollowButton,
      receivedRequests,
      sentRequests,
      isFollowing,
      user,
    } = this.props;

    const unreadSum = this.countUnread(receivedRequests);
    const approvedSum = this.countApproved(sentRequests);
    const sum = unreadSum + approvedSum;

    return (
      <View style={styles.container}>
        <UserIcon
          // onPress
          photoURL={photoURL}
          dia={48}
          isAthlete={(user && user.data.isAthlete)}
        />
        <View style={styles.profileText}>
          <View style={styles.upperArea}>
            <View style={styles.userName}>
              <Text style={styles.userNameTitle}>
                {user && user.data.name}
              </Text>
              <CheckMark
                style={[
                  styles.athleteMark,
                  (user && !user.data.isAthlete) && { display: 'none' },
                ]}
              />
            </View>
            <View style={[styles.buttonArea, !this.state.isMyPage && { display: 'none' }]}>
              <RequestButton
                style={styles.requestButton}
                onPress={onPressRequest}
                badgeNumber={sum}
              />
              <EditButton
                style={styles.editButton}
                onPress={onPressEdit}
              />
            </View>
            <View style={[styles.buttonArea, this.state.isMyPage && { display: 'none' }]}>
              <FollowButton
                style={[
                  styles.followButton,
                  !user && { display: 'none' },
                ]}
                // isFollowing={this.state.isFollowing}
                isFollowing={isFollowing}
                handleFollowButton={handleFollowButton}
              />
            </View>
          </View>
          <Text style={styles.userDesc}>
            {user && user.data.desc}
          </Text>
        </View>
      </View>
    );
  }
}

// <Icon
//   name="account-check"
//   size={24}
//   style={[
//     styles.athleteMark,
//   ]}
// />

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  athleteMark: {
    // color: '#DB4D5E',
    // textAlignVertical: 'bottom',
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 8,
    alignSelf: 'flex-end',
    // marginLeft: 12,
  },
  profileText: {
    alignSelf: 'center',
    paddingLeft: 12,
    justifyContent: 'space-around',
    flex: 1,
  },
  upperArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignContent: 'center',
    // flex: 1,
    // width: 190,
  },
  userName: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignContent: 'flex-end',
    // flex: 1,
    // width: 190,
  },
  userNameTitle: {
    // flex: 2,
    fontSize: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  userDesc: {
    // flex: 1,
    fontSize: 14,
    marginTop: 8,
  },
  buttonArea: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignContent: 'flex-start',
    // flex: 1,
    // width: 190,
  },
  editButton: {
    // position: 'absolute',
    // height: 30,
    alignSelf: 'flex-start',
  },
  requestButton: {
    // position: 'absolute',
    // right: 12,
    marginRight: 12,
    // height: 30,
    alignSelf: 'flex-start',
  },
  followButton: {
    // position: 'absolute',
    // right: 0,
    // top: 0,
    // height: 30,
    alignSelf: 'flex-start',
    // marginTop: 16,
  },
});

export default Profile;
