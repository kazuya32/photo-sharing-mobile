import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Text,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import firebase from 'firebase';

class PhotoCollection extends React.Component {
  state = {
    // photos: this.props.photos,
    logInUser: this.props.logInUser,
  }

  componentDidMount() {
    this.fetchLogInUid();
    if (this.props.uid) {
      this.fetchPhotos(this.props.uid);
    }
  }

  // eslint-disable-next-line
  fetchLogInUid = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      this.setState({ logInUid: value });
    } catch (error) {
    //
    }
  }

  // eslint-disable-next-line
  fetchPhotos = (uid) => {
    const db = firebase.firestore();
    // eslint-disable-next-line
    const maxResults = 30;
    // eslint-disable-next-line
    // const photosRef = db.collection('photos').where('uid', '==', this.state.uid).orderBy('createdAt', 'desc').limit(maxResults);
    const photosRef = db.collection('photos').where(`people.${uid}`, '==', true);

    photosRef.get()
      .then((querySnapshot) => {
        const photos = [];
        querySnapshot.forEach((doc) => {
          const isBlocked = doc.data().blockedBy && doc.data().blockedBy[this.state.logInUid];
          if (!isBlocked) {
            photos.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        });
        this.setState({ photos });
      });
  }

  sortDesc = (array) => {
    array.sort((a, b) => (a.data.createdAt - b.data.createdAt));
    array.reverse();
    return array;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate({
          routeName: 'PhotoDetail',
          params: {
            photo: item,
            // logInUser: this.state.logInUser,
          },
          key: 'PhotoDetail' + item.id,
        });
      }}
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
        <Text style={styles.alert}>
           投稿画像はありません.
        </Text>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.sortDesc(this.state.photos)}
          renderItem={this.renderItem}
          numColumns={3}
          // horizontal={true}
          keyExtractor={this.keyExtractor}
          extraData={this.state}
          columnWrapperStyle={styles.column}
        />
        <View style={styles.whitelineLeft} />
        <View style={styles.whitelineRight} />
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
    // width: (Dimensions.get('window').width / 3) - 1,
    width: (Dimensions.get('window').width / 3),
    height: Dimensions.get('window').width / 3,
    marginBottom: 1,
    zIndex: 30,
    // borderWidth: 1,
    // borderColor: '#fff',
  },
  column: {
    // justifyContent: 'space-between',
  },
  whitelineLeft: {
    position: 'absolute',
    height: '100%',
    left: (Dimensions.get('window').width / 3),
    width: 1,
    backgroundColor: '#fff',
  },
  whitelineRight: {
    position: 'absolute',
    height: '100%',
    right: (Dimensions.get('window').width / 3),
    width: 1,
    backgroundColor: '#fff',
  },
  alert: {
    padding: 16,
    // alignSelf: 'center',
  },
});

export default PhotoCollection;
