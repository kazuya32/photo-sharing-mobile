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
      {key:1, source: require('../../assets/image/athlete/naoya_kondo.jpg')},
      {key:2, source: require('../../assets/image/athlete/naoya_kondo.jpg')},
      {key:3, source: require('../../assets/image/athlete/naoya_kondo.jpg')},
      {key:4, source: require('../../assets/image/athlete/naoya_kondo.jpg')},
      {key:5, source: require('../../assets/image/athlete/naoya_kondo.jpg')},
    ],
  }

  onPressTest() {
    Alert.alert('button pressed')
  }

  _renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => { navigation.navigate('PhotoDetail'); }}>
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
      <View style={styles.container}>
        <Profile
          onPress={() => { this.props.navigation.navigate('PhotoDetail'); }}
          userName={this.state.userName}
          userDesc={this.state.userDesc}
        />
        <FlatList
          navigation={this.props.navigation}
          data={this.state.data}
          renderItem={this._renderItem.bind(this)}
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
