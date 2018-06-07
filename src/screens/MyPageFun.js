import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';

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
      <TouchableOpacity style={styles.photoItem} onPress={() => { this.props.navigation.navigate('PhotoDetail'); }}>
        <Image
          style={styles.photo}
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
        <View style={styles.profile}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileImage}>
              YK
            </Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.userName}>
              {this.state.userName}
            </Text>
            <Text style={styles.userDesc}>
              {this.state.userDesc}
            </Text>
          </View>
          <TouchableHighlight style={styles.buttonContainer} onPress={this.onPressTest} underlayColor="transparent">
            <View style={styles.menuButton}>
              <Text style={styles.menuButtonTitle}>
                •••
              </Text>
            </View>
          </TouchableHighlight>
        </View>

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
  },
  photo: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderWidth: 1,
    borderColor: '#fff',
  },
  profile: {
    height: '15%',
    flexDirection: 'row',
    padding: 16,
  },
  profileIcon: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  profileImage: {
    alignSelf: 'center',
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
    // alignSelf: 'center',
  },
  userDesc: {
    // flex: 1,
    fontSize: 14,
    alignSelf: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    right: 16,
    // height: 30,
    alignSelf: 'center',
  },
  menuButton: {
    backgroundColor: '#fff',
    borderRadius: 18,
    height: 30,
    width: 30,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#DB4D5E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  menuButtonTitle: {
    color: '#DB4D5E',
    alignSelf: 'center',
    fontSize: 8,
  },
});

export default MyPageFun;
