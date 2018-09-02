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

class TeamFeed extends React.Component {
  state = {
    headerTitle: 'FLEGO',
    reloadNumber: 40,
    showingPhotos: null,
    loading: false,
  }

  componentWillMount() {
    const { itemId } = this.props.navigation.state.params;
    this.getTeam(itemId);
    this.fetchPhotos();
  }

  getTeam = (teamId) => {
    const db = firebase.firestore();
    const Ref = db.collection('teams').doc(teamId);
    Ref.get().then((doc) => {
      const team = { id: doc.id, data: doc.data() };
      this.setState({ team, headerTitle: team.data.name });
    });
  }

  // eslint-disable-next-line
  fetchPhotos = () => {
    const teamId = this.props.navigation.state.params.itemId;
    const db = firebase.firestore();
    // const maxResults = 5;

    const photosRef = db.collection('photos')
      .where('teamId', '==', teamId);

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

  // renderItem = ({ item }) => (
  //   <TouchableOpacity
  //     onPress={() => {
  //       this.props.navigation.navigate({
  //         routeName: 'PhotoDetail',
  //         params: {
  //           photo: item,
  //         },
  //         key: 'PhotoDetail' + item.id,
  //       });
  //     }}
  //   >
  //     <Image
  //       style={styles.photoItem}
  //       source={{ uri: item.data.downloadURL }}
  //       resizeMode="cover"
  //     />
  //   </TouchableOpacity>
  // );

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
            navigation={this.props.navigation}
            headerTitle={this.state.headerTitle}
          />
          <Text style={styles.alert}>
             投稿画像はありません.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          headerTitle={this.state.headerTitle}
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
          // extraData={this.state}
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
  },
  alert: {
    flex: 1,
    backgroundColor: '#fff',
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

export default TeamFeed;
