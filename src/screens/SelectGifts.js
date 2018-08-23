import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Text,
  Alert,
  AsyncStorage,
} from 'react-native';
import firebase from 'firebase';

import Header from '../components/Header.js';

class SelectGifts extends React.Component {
  state = {
    headerTitle: 'フォトギフトを選ぶ',
  }

  componentWillMount() {
    this.fetchLogInUser();
  }

  // eslint-disable-next-line
  fetchLogInUser = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      // this.setState({ logInUid: value });
      this.fetchPhotos(value);
    } catch (error) {
    //
    }
  }

  // eslint-disable-next-line
  fetchPhotos = (uid) => {
    const photos = [];
    const db = firebase.firestore();
    const photosRef = db.collection('photos').where('uid', '==', uid);

    photosRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          photos.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({ photos });
      });
  }

  sortDesc = (array) => {
    array.sort((a, b) => (a.data.createdAt - b.data.createdAt));
    array.reverse();
    return array;
  }

  onPress = (photo) => {
    const { user } = this.props.navigation.state.params;
    const timestamp = Date.now().toString();
    this.props.navigation.navigate({
      routeName: 'SendGift',
      params: {
        user,
        photo,
      },
      key: 'SendGift' + timestamp,
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => { this.onPress(item); }}
    >
      <Image
        style={styles.photoItem}
        source={{ uri: item.data.downloadURL }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  render() {
    if (!this.state.photos) {
      return (
        <View style={{ flex: 1, padding: 100, alignSelf: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    if (!this.state.photos.length) {
      return (
        <View style={styles.container}>
          <Header
            navigation={this.props.navigation}
            logInUser={this.state.logInUser}
            headerTitle={this.state.headerTitle}
          />
          <Text style={styles.alert}>
             投稿できる画像がまだないようです。他ユーザーに写真を届けるにはまず写真をアップロードする必要があります。
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          logInUser={this.state.logInUser}
          headerTitle={this.state.headerTitle}
        />
        <FlatList
          navigation={this.props.navigation}
          data={this.sortDesc(this.state.photos)}
          renderItem={this.renderItem}
          numColumns={4}
          // horizontal={true}
          keyExtractor={this.keyExtractor}
          columnWrapperStyle={styles.column}
        />
        <View style={styles.whitelineLeft} />
        <View style={styles.whitelineRight} />
        <View style={styles.whitelineCenter} />
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
  alert: {
    padding: 16,
  },
  photoItem: {
    width: (Dimensions.get('window').width / 4),
    height: Dimensions.get('window').width / 4,
    marginBottom: 1,
    // borderWidth: 1,
    // borderColor: '#fff',
  },
  column: {
    // justifyContent: 'space-between',
  },
  whitelineLeft: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    left: (Dimensions.get('window').width / 4),
    width: 1,
    backgroundColor: '#fff',
  },
  whitelineRight: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    right: (Dimensions.get('window').width / 4),
    width: 1,
    backgroundColor: '#fff',
  },
  whitelineCenter: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    left: (Dimensions.get('window').width / 2),
    width: 1,
    backgroundColor: '#fff',
  },
});

export default SelectGifts;
