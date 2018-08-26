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

class SentGiftTile extends React.Component {
  state = {
    isReadAfterApproved: false,
    photoDeleted: false,
  }

  componentWillMount() {
    const {
      gift,
    } = this.props;
    this.getUser(gift.data.to);
    this.getPhoto(gift.data.photoId);
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

  onPress = (gift, user, photo) => {
    this.props.onPress(photo);
  }

  render() {
    const {
      gift,
    } = this.props;

    if (this.state.photoDeleted) {
      return null;
    }

    if (!(this.state.user && this.state.photo)) {
      return (
        <View style={{ flex: 1, height:30, alignSelf: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    const title = this.state.user.data.isAthlete ? '選手' : 'さん';
    const originalMessage = `${title}にフォトギフトを贈りました。`;
    const signatureMessage = `${title}にデジタルサインを贈りました。`;

    const text = gift.data.type === 'signature' ? signatureMessage : originalMessage;

    return (
      <TouchableHighlight
        style={styles.container}
        onPress={() => this.onPress(gift, this.state.user, this.state.photo)}
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
                (gift.data.status === 'approved') && { color: '#DB4D5E' },
                (this.state.isReadAfterApproved || gift.data.isReadAfterApproved) && { color: 'black' },
              ]}
            >
              {`${this.state.user && this.state.user.data.name}${text}`}
            </Text>
            <Text
              style={[
                styles.message,
                !gift.data.message && { display: 'none' },
                { display: 'none' },
              ]}
            >
              {gift.data.message}
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
    color: 'black',
  },
  contents: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 4,
  },
});

export default SentGiftTile;
