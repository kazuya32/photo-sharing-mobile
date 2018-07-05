import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';

import SendButton from '../elements/SendButton';
import PhotoTile from '../components/PhotoTile';
import Header from '../components/Header.js';

class LoginScreen extends React.Component {
  state = {}

  onPress = () => {
    // Alert.alert('ダウンロードリクエストを送信しました。');
    this.props.navigation.navigate({
      routeName: 'Request',
      params: {
        photo: this.props.navigation.state.params.photo,
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          onPressLeft={() => { this.props.navigation.navigate({ routeName: 'MyPageFun' }); }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle="FLEGO"
        />
        <ScrollView>
          <PhotoTile
            photo={this.props.navigation.state.params.photo}
            onPressUser={this.onPressTest}
            photoStyle={styles.photo}
            // uid={this.props.navigation.state.params.uid}
          />
          <SendButton
            onPress={this.onPress}
            style={styles.reqBtn}
            textStyle={styles.btnTitle}
          >
            ダウンロードリクエスト
          </SendButton>
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

export default LoginScreen;
