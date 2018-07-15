import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';

import DownloadRequestButton from '../elements/DownloadRequestButton';
import PhotoTile from '../components/PhotoTile';
import Header from '../components/Header.js';

class PhotoDetail extends React.Component {
  state = {
    logInUser: this.props.navigation.state.params && this.props.navigation.state.params.logInUser,
  }

  onPress = () => {
    // Alert.alert('ダウンロードリクエストを送信しました。');
    this.props.navigation.navigate({
      routeName: 'SendRequest',
      params: {
        photo: this.props.navigation.state.params.photo,
        logInUser: this.state.logInUser,
      },
    });
  }

  onPressUser = () => {
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid: this.props.navigation.state.params.photo.data.uid,
        logInUser: this.state.logInUser,
      },
      key: 'UserPage' + this.props.navigation.state.params.photo.data.uid,
    });
  }

  render() {
    const { photo } = this.props.navigation.state.params;
    const hasAccess = photo.data.accesses && photo.data.accesses[this.state.logInUser.id];
    // eslint-disable-next-line
    const isPending = photo.data.pendingRequests && photo.data.pendingRequests[this.state.logInUser.id];

    return (
      <View style={styles.container}>
        <Header
          onPressLeft={() => { this.props.navigation.navigate({ routeName: 'UserPage' }); }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle="FLEGO"
        />
        <ScrollView>
          <PhotoTile
            photo={photo}
            onPressUser={this.onPressUser}
            onDeleted={() => { this.props.navigation.goBack(); }}
            photoStyle={styles.photo}
            logInUser={this.state.logInUser}
            uid={this.state.logInUser && this.state.logInUser.id}
          />
          <DownloadRequestButton
            onPress={this.onPress}
            style={[
              styles.reqBtn,
            ]}
            hasAccess={hasAccess}
            isMyPage={(photo.data.uid === this.state.logInUser.id)}
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
    marginTop: 12,
    height: Dimensions.get('window').height * 0.6,
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
