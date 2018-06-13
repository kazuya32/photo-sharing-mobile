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
import Header from '../components/Header.js';

class MyPageFun extends React.Component {
  state = {
    userName: 'YoSasaki',
    userDesc: 'サッカーしようぜ！',
    data: [
      { likes: 32, userName: 'sasaki', source: require('../../assets/image/athlete/naoya_kondo.jpg') },
      { likes: 32, userName: 'sasaki', source: require('../../assets/image/athlete/masaki_yamamoto.jpg') },
      { likes: 32, userName: 'sasaki', source: require('../../assets/image/athlete/takayuki_funayama.jpg') },
      { likes: 32, userName: 'sasaki', source: require('../../assets/image/athlete/yuya_sato.jpg') },
      { likes: 32, userName: 'sasaki', source: require('../../assets/image/athlete/yushi_mizobuchi.jpg') },
    ],
  }

  onPressTest() {
    Alert.alert('button pressed')
  }

  keyExtractor = (item, index) => index.toString();

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

  render() {
    return (
      <View style={styles.container}>
        <Header
          onPressLeft={() =>  { this.props.navigation.navigate({ routeName: 'MyPageFun' }); }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle="FLEGO"
        />
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
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 70,
  },
  photoItem: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default MyPageFun;
