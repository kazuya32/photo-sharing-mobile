import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';

class ReceivedRequestTile extends React.Component {
  state = {
    isReadAfterReceived: false,
    photoDeleted: false,
  }

  componentWillMount() {
    const {
      request,
    } = this.props;
    this.getUser(request.data.from);
    this.getPhoto(request.data.photoId);
  }

  // eslint-disable-next-line
  getUser = async (uid) => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(uid);
    userRef.get().then((doc) => {
      const user = { id: doc.id, data: doc.data() };
      this.setState({
        user,
      });
    });
  }

  getPhoto = async (photoId) => {
    const db = firebase.firestore();
    const photoRef = db.collection('photos').doc(photoId);
    photoRef.get().then((DocumentSnapshot) => {
      if (DocumentSnapshot.exists) {
        const photo = { id: DocumentSnapshot.id, data: DocumentSnapshot.data() };
        this.setState({
          photo,
        });
      } else {
        this.setState({ photoDeleted: true });
      }
    });
  }

  setReadAfterReceived = async (request) => {
    const db = firebase.firestore();
    const Ref = db.collection('requests').doc(request.id);
    Ref.update({
      isReadAfterReceived: true,
    })
      .then(() => {
        // eslint-disable-next-line
        console.log('Document successfully written!');
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Error updating document: ', error);
      });
  }

  onPress = (request, user, photo) => {
    this.setState({ isReadAfterReceived: true });
    this.setReadAfterReceived(request);
    this.props.onPress(request, user, photo);
  }

  render() {
    const {
      request,
    } = this.props;

    if (this.state.photoDeleted) {
      return (
        <View style={{ display: 'none' }} />
      );
    }

    if (!(this.state.user && this.state.photo)) {
    // if (!(this.state.photo)) {
      return (
        <View style={{ flex: 1, height:30, alignSelf: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <TouchableHighlight
        style={styles.container}
        onPress={() => this.onPress(request, this.state.user, this.state.photo)}
        underlayColor="transparent"
      >
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={styles.image}
            source={{ uri: this.state.photo.data.downloadURL }}
            resizeMode="cover"
          />
          <View style={styles.contents} >
            <Text
              style={[
                styles.userName,
                (this.state.isReadAfterReceived || request.data.isReadAfterReceived) && { color: 'black' },
              ]}
            >
              {`${this.state.user && this.state.user.data.name}さんからのダウンロードリクエストが届いています。`}
            </Text>
            <Text
              style={[
                styles.message,
                !request.data.message && { display: 'none' },
                { display: 'none' },
              ]}
            >
              {request.data.message}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 16,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').width / 5,
    alignSelf: 'center',
    // marginTop: 16,
    // marginBottom: 16,
    // marginLeft: 16,
    // marginRight: 16,
  },
  userName: {
    // alignSelf: 'center',
    fontSize: 16,
    color: '#DB4D5E',
  },
  contents: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default ReceivedRequestTile;
