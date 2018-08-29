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

  onPressRequest = () => {
    console.log(this.props.navigation.state.params.photo);
    // Alert.alert('ダウンロードリクエストを送信しました。');
    this.props.navigation.navigate({
      routeName: 'SendRequest',
      params: {
        photo: this.props.navigation.state.params.photo,
        // logInUser: this.state.logInUser,
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
            show
            photo={photo}
            onPressBlock={this.onPressBlock}
            onDeleted={() => { this.props.navigation.goBack(); }}
            photoStyle={styles.photo}
            navigation={this.props.navigation}
          />
          <DownloadRequestButton
            onPress={this.onPressRequest}
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
