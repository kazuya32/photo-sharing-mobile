import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';

import Profile from '../components/Profile.js';

class MyPageFun extends React.Component {
  state = {
    userName: 'YoSasaki',
    userDesc: 'サッカーしようぜ！',
    photo: require('../../assets/image/athlete/naoya_kondo.jpg'),
    data: [
      {source: require('../../assets/image/athlete/naoya_kondo.jpg')},
      {source: require('../../assets/image/athlete/naoya_kondo.jpg')},
      {source: require('../../assets/image/athlete/naoya_kondo.jpg')},
      {source: require('../../assets/image/athlete/naoya_kondo.jpg')},
      {source: require('../../assets/image/athlete/naoya_kondo.jpg')},
    ],
  }

  onPressTest() {
    Alert.alert('button pressed')
  }

  _renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => { this.props.navigation.navigate('PhotoDetail'); }}>
        <Image
          style={styles.photoItem}
          source={item.source}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  }

  // _keyExtractor = (item, index) => item.source;

  render() {
    return (
      <View style={styles.container} navigation={this.props.navigation}>
        <Profile
          onPress={this.onPressTest}
          userName={this.state.userName}
          userDesc={this.state.userDesc}
        />
        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          numColumns={3}
          // horizontal={true}
          // keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  photoItem: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default MyPageFun;
