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
    data: [
      { key: 1, likes: 32, userName: 'sasaki', source: require('../../assets/image/athlete/naoya_kondo.jpg') },
      { key: 2, likes: 32, userName: 'sasaki', source: require('../../assets/image/athlete/masaki_yamamoto.jpg') },
      { key: 3, likes: 32, userName: 'sasaki', source: require('../../assets/image/athlete/takayuki_funayama.jpg') },
      { key: 4, likes: 32, userName: 'sasaki', source: require('../../assets/image/athlete/yuya_sato.jpg') },
      { key: 5, likes: 32, userName: 'sasaki', source: require('../../assets/image/athlete/yushi_mizobuchi.jpg') },
    ],
  }

  onPressTest() {
    Alert.alert('button pressed')
  }

  renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate({
            routeName: 'PhotoDetail',
            params: item,
          });
        }}
      >
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
          onPress={this.onPressTest}
          userName={this.state.userName}
          userDesc={this.state.userDesc}
        />
        <FlatList
          navigation={this.props.navigation}
          data={this.state.data}
          renderItem={this.renderItem.bind(this)}
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
