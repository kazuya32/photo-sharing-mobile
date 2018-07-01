import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

import HeaderLeftButton from '../elements/HeaderLeftButton.js';
import HeaderRightButton from '../elements/HeaderRightButton.js';

class Header extends React.Component {
  state = {}

  componentWillMount() {
    this.fetchData();
  }

  // eslint-disable-next-line
  fetchData = () => {
    this.setAuth();
  }

  setAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const {
          displayName,
          email,
          emailVerified,
          photoURL,
          isAnonymous,
          uid,
          providerData,
        } = user;

        this.setState({
          displayName,
          email,
          emailVerified,
          photoURL,
          isAnonymous,
          uid,
          providerData,
        });
        this.fetchUser();
      // eslint-disable-next-line
      } else {
        this.props.navigation.navigate({ routeName: 'Login' });
      }
    });
  }

  fetchUser = () => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(this.state.uid);
    userRef.get().then((doc) => {
      const user = doc.data();
      this.setState({ user });
    });
  }

  render() {
    const {
      onPressLeft,
      onPressRight,
      headerTitle,
    } = this.props;

    if (!this.state.user) {
      return (
        <View style={{ flex: 1, padding: 20, alignSelf: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <HeaderLeftButton
            onPress={onPressLeft}
            photoURL={this.state.user && this.state.user.photoURL}
          />
        </View>
        <View style={styles.appbar}>
          <View>
            <Text style={styles.appbarTitle}>
              {headerTitle}
            </Text>
          </View>
        </View>
        <View style={styles.button}>
          <HeaderRightButton onPress={onPressRight} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#FCFCFC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 32,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    borderBottomWidth: 0.3,
    borderBottomColor: '#808080',
    zIndex: 10,
  },
  appbar: {

  },
  appbarTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
  },
  button: {
    paddingLeft: 14,
    paddingRight: 14,
  },
});

export default Header;
