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
} from 'react-native';
import firebase from 'firebase';

class PhotoCollection extends React.Component {
  state = {
    // photos: this.props.photos,
    logInUser: this.props.logInUser,
  }

  componentDidMount() {
    if (this.props.uid) {
      this.fetchPhotos(this.props.uid);
    }
  }

  // eslint-disable-next-line
  fetchPhotos = (uid) => {
    const db = firebase.firestore();
    const maxResults = 30;
    // eslint-disable-next-line
    // const photosRef = db.collection('photos').where('uid', '==', this.state.uid).orderBy('createdAt', 'desc').limit(maxResults);
    const photosRef = db.collection('photos').where('uid', '==', uid);

    const photos = [];
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

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate({
          routeName: 'PhotoDetail',
          params: {
            photo: item,
            logInUser: this.state.logInUser,
          },
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
          data={this.state.photos}
          renderItem={this.renderItem}
          numColumns={3}
          // horizontal={true}
          keyExtractor={this.keyExtractor}
          extraData={this.state}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 70,
  },
  photoItem: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderWidth: 1,
    borderColor: '#fff',
  },
  alert: {
    padding: 16,
    // alignSelf: 'center',
  },
});

export default PhotoCollection;
