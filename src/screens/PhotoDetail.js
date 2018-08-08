import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  AsyncStorage,
} from 'react-native';

import DownloadRequestButton from '../elements/DownloadRequestButton';
import PhotoTile from '../components/PhotoTile';
import Header from '../components/Header.js';

class PhotoDetail extends React.Component {
  state = {}

  componentWillMount() {
    this.retrieveLogInUser();
  }

  // eslint-disable-next-line
  retrieveLogInUser = async () => {
    try {
      const logInUid = await AsyncStorage.getItem('uid');
      // const photoURL = await AsyncStorage.getItem('photoURL');
      // const isAthlete = await AsyncStorage.getItem('isAthlete');

      // if (photoURL !== null && isAthlete !== null) {
      // const value = (isAthlete === 'true');
      this.setState({ logInUid });
      // }
    } catch (error) {
    //
    }
  }

  onPress = () => {
    // Alert.alert('ダウンロードリクエストを送信しました。');
    this.props.navigation.navigate({
      routeName: 'SendRequest',
      params: {
        photo: this.props.navigation.state.params.photo,
        // logInUser: this.state.logInUser,
      },
    });
  }

  onPressMatch = () => {
    const { photo } = this.props.navigation.state.params;
    this.props.navigation.navigate({
      routeName: 'MatchFeed',
      params: {
        feedType: 'match',
        itemId: photo.data.matchId,
        matchPath: photo.data.matchPath,
      },
    });
  }

  onPressTeam = () => {
    const { photo } = this.props.navigation.state.params;
    this.props.navigation.navigate({
      routeName: 'TeamFeed',
      params: {
        feedType: 'team',
        itemId: photo.data.teamId,
      },
    });
  }

  onPressBlock = () => {
    const timestamp = Date.now().toString();
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid: this.state.logInUid,
      },
      key: 'UserPage' + timestamp,
    });
  }

  onPressUser = () => {
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid: this.props.navigation.state.params.photo.data.uid,
        // logInUser: this.state.logInUser,
      },
      key: 'UserPage' + this.props.navigation.state.params.photo.data.uid,
    });
  }

  render() {
    const { photo } = this.props.navigation.state.params;
    const hasAccess = photo.data.accesses && photo.data.accesses[this.state.logInUid];
    // eslint-disable-next-line
    const isPending = photo.data.pendingRequests && photo.data.pendingRequests[this.state.logInUid];

    return (
      <View style={styles.container}>
        <Header
          headerTitle="FLEGO"
          navigation={this.props.navigation}
        />
        <ScrollView>
          <PhotoTile
            photo={photo}
            onPressUser={this.onPressUser}
            onPressTeam={this.onPressTeam}
            onPressMatch={this.onPressMatch}
            onPressBlock={this.onPressBlock}
            onDeleted={() => { this.props.navigation.goBack(); }}
            photoStyle={styles.photo}
            // logInUser={this.state.logInUser}
            uid={this.state.logInUid}
            navigation={this.props.navigation}
          />
          <DownloadRequestButton
            onPress={this.onPress}
            style={[
              styles.reqBtn,
            ]}
            hasAccess={hasAccess}
            isMyPage={(photo.data.uid === this.state.logInUid)}
            isPending={isPending}
            textStyle={styles.btnTitle}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
  },
  photo: {
    // marginTop: 12,
    // height: Dimensions.get('window').height * 0.6,
  },
  reqBtn: {
    marginBottom: 16,
  },
  btnTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PhotoDetail;
