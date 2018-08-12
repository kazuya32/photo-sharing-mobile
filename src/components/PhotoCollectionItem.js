import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import firebase from 'firebase';
// import Icon from 'react-native-vector-icons/Ionicons';

import UserIcon from '../elements/UserIcon.js';

class PhotoCollectionItem extends React.Component {
  state = {

  }

  componentWillMount() {
    if (this.props.isCertificated) {
      this.getUser(this.props.photo.data.uid);
    }
  }
  // eslint-disable-next-line
  getUser = (uid) => {
    let user;
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(uid);
    userRef.get().then((doc) => {
      user = { id: doc.id, data: doc.data() };
      this.setState({ user });
    });
  }

  onPressUser = () => {
    const { photo } = this.props;
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid: photo.data.uid,
      },
      key: 'UserPage' + photo.data.uid,
    });
  }

  onPressPhoto = () => {
    const { photo } = this.props;
    this.props.navigation.navigate({
      routeName: 'PhotoDetail',
      params: {
        photo,
        logInUser: this.state.logInUser,
      },
      key: 'PhotoDetail' + photo.id,
    });
  }

  render() {
    const {
      style,
      photoStyle,
      iconStyle,
      photo,
      isCertificated,
      iconDia,
    } = this.props;

    return (
      <TouchableOpacity
        onPress={this.onPressPhoto}
      >
        <View style={style}>
          <Image
            style={photoStyle}
            source={{ uri: photo.data.downloadURL }}
            resizeMode="cover"
          />
          <UserIcon
            onPress={this.onPressUser}
            photoURL={this.state.user && this.state.user.data.photoURL}
            dia={iconDia || 24}
            // isAthlete={this.state.user && this.state.user.data.isAthlete}
            isAthlete
            style={[
              iconStyle,
              !isCertificated && { display: 'none' },
            ]}
            borderWidth={2}
            // borderColor="black"
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default PhotoCollectionItem;
