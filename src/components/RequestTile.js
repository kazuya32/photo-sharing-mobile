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

class RequestTile extends React.Component {
  state = {
    logInUid: this.props.logInUid,
    isRead: null,
  }

  componentWillMount() {
    const {
      request,
    } = this.props;
    this.getUser(request.data.from);
    this.getPhoto(request.data.photoId);
  }

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
    photoRef.get().then((doc) => {
      const photo = { id: doc.id, data: doc.data() };
      this.setState({
        photo,
      });
    });
  }

  render() {
    const {
      onPress,
      request,
    } = this.props;

    if (!(this.state.user && this.state.photo)) {
      return (
        <View style={{ flex: 1, height:30, alignSelf: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <TouchableHighlight
        style={styles.container}
        onPress={() => onPress(request, this.state.user, this.state.photo)}
      >
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={styles.image}
            source={{ uri: this.state.photo.data.downloadURL }}
            resizeMode="cover"
          />
          <View
            style={styles.contents}
          >
            <Text style={styles.userName}>
              {`${this.state.user.data.name}さんからのダウンロードリクエストが届いています。`}
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
    paddingTop: 12,
    paddingBottom: 12,
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

export default RequestTile;
