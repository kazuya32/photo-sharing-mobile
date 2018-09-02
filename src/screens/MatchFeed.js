import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import firebase from 'firebase';

import Header from '../components/Header.js';
import PhotoCollectionItem from '../components/PhotoCollectionItem.js';

class MatchFeed extends React.Component {
  state = {
    headerTitle: 'FLEGO',
    reloadNumber: 40,
    showingPhotos: null,
    loading: false,
  }

  componentWillMount() {
    this.fetchMatchTitle();
    this.fetchMatchPhotos();
  }

  // eslint-disable-next-line
  fetchMatchTitle = () => {
    const { match } = this.props.navigation.state.params;
    const headerTitle = `${match.data.homeTeam.name} vs ${match.data.awayTeam.name}`;
    this.setState({ headerTitle });
  }

  // eslint-disable-next-line
  fetchMatchPhotos = () => {
    const { match } = this.props.navigation.state.params;
    const db = firebase.firestore();

    const photosRef = db.collection('photos')
      .where('matchId', '==', match.id);

    const photos = [];
    photosRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { userDeleted } = doc.data();
          const isBlocked = doc.data().blockedBy && doc.data().blockedBy[this.state.logInUid];
          if (!(userDeleted || isBlocked)) {
            photos.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        });
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.setState({ photos: this.sortDesc(photos), lastVisible });

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
      photoStyle={styles.photoItem}
    />
  );

  render() {
    if (!this.state.showingPhotos) {
      return (
        <View style={styles.container}>
          <Header
            navigation={this.props.navigation}
            headerTitle={this.state.headerTitle}
          />
          <View style={{ flex: 1, padding: 100, alignSelf: 'center' }}>
            <ActivityIndicator />
          </View>
        </View>
      );
    }

    if (!this.state.showingPhotos.length) {
      return (
        <View style={styles.container}>
          <Header
            headerTitle={this.state.headerTitle}
            navigation={this.props.navigation}
          />
          <Text style={styles.alert}>
             投稿画像はまだありません。
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Header
          headerTitle={this.state.headerTitle}
          navigation={this.props.navigation}
        />
        <FlatList
          navigation={this.props.navigation}
          data={this.state.showingPhotos}
          renderItem={this.renderItem}
          numColumns={4}
          // horizontal={true}
          keyExtractor={this.keyExtractor}
          columnWrapperStyle={styles.column}
          onEndReachedThreshold={0.5}
          onEndReached={this.addPhotos}
        />
        <View style={styles.whitelineLeft} />
        <View style={styles.whitelineRight} />
        <View style={styles.whitelineCenter} />
      </View>
    );
  }
}

// <View
//   style={styles.whiteline}
// >
//   <View
//     style={styles.whitelineItem}
//   />
//   <View
//     style={styles.whitelineItem}
//   />
// </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  alert: {
    padding: 16,
  },
  photoItem: {
    // width: (Dimensions.get('window').width / 4) - 1,
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

export default MatchFeed;
