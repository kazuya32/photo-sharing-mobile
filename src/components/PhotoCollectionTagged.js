import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Text,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import firebase from 'firebase';

import designLanguage from '../../designLanguage.json';
import PhotoCollectionItem from '../components/PhotoCollectionItem.js';

class PhotoCollection extends React.Component {
  state = {
    reloadNumber: 12,
    showingPhotos: null,
    loading: false,
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
          const { userDeleted } = doc.data();
          if (!(userDeleted || isBlocked)) {
            photos.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        });
        this.setState({ photos: this.sortDesc(photos) });

        if (photos.length) {
          this.addPhotos();
        } else {
          this.setState({ showingPhotos: [] });
        }
      });
  }

  addPhotos = () => {
    const { photos } = this.state;

    if (!this.state.loading && photos.length) {
      this.setState({ loading: true });

      let { showingPhotos } = this.state;
      if (!showingPhotos) {
        showingPhotos = photos.slice(0, this.state.reloadNumber);
        photos.splice(0, this.state.reloadNumber);
      } else {
        const tmp = photos.slice(0, this.state.reloadNumber);
        photos.splice(0, this.state.reloadNumber);
        Array.prototype.push.apply(showingPhotos, tmp);
      }
      this.setState({ showingPhotos, photos, loading: false });
    }
  }

  sortDesc = (array) => {
    array.sort((a, b) => (a.data.createdAt - b.data.createdAt));
    array.reverse();
    return array;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <PhotoCollectionItem
      navigation={this.props.navigation}
      photo={item}
      // style={item.data.hasArranged && { display: 'none' }}
      photoStyle={styles.photoItem}
      iconStyle={styles.ribbon}
      iconDia={24}
    />
  );


  render() {
    if (!this.state.showingPhotos) {
      return (
        <View style={{ flex: 1, padding: 100, alignSelf: 'center' }}>
          <ActivityIndicator color={designLanguage.colorPrimary} />
        </View>
      );
    }

    if (!this.state.showingPhotos.length) {
      return (
        <Text style={styles.alert}>
           投稿画像はありません.
        </Text>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.showingPhotos}
          renderItem={this.renderItem}
          numColumns={3}
          // horizontal={true}
          keyExtractor={this.keyExtractor}
          extraData={this.state}
          columnWrapperStyle={styles.column}
          onEndReachedThreshold={0.5}
          onEndReached={this.addPhotos}
          removeClippedSubviews
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
