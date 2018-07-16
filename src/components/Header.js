import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableHighlight,
} from 'react-native';

import HeaderLeftButton from '../elements/HeaderLeftButton.js';
import HeaderRightButton from '../elements/HeaderRightButton.js';

class Header extends React.Component {
  state = {
    // uid: this.props.navigation.state.params && this.props.navigation.state.params.uid,
    // logInUser: this.props.logInUser,
  }

  componentWillMount() {
    this.retrieveUser();
  }

  retrieveUser = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid');
      const photoURL = await AsyncStorage.getItem('photoURL');
      const isAthlete = await AsyncStorage.getItem('isAthlete');

      // if (photoURL !== null && isAthlete !== null) {
      const value = (isAthlete === 'true');
      this.setState({ uid, photoURL, isAthlete: value });
      // }
    } catch (error) {
    //
    }
  }

  navigateToMyPage = () => {
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid: this.state.uid,
        // logInUser: this.state.logInUser,
      },
      key: 'UserPage' + this.state.uid,
    });
  }

  navigateToSearch = () => {
    this.props.navigation.navigate({
      routeName: 'Search',
      params: {
        logInUser: this.state.logInUser,
      },
    });
  }

  navigateToHome = () => {
    this.props.navigation.navigate({
      routeName: 'Home',
      params: {
      },
      // key: 'Home' + Date.now().toString(),
    });
  }

  render() {
    const {
      // onPressLeft,
      // onPressRight,
      headerTitle,
    } = this.props;


    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <HeaderLeftButton
            onPress={this.navigateToSearch}
          />
        </View>
        <View style={styles.appbar}>
          <TouchableHighlight onPress={this.navigateToHome} underlayColor="transparent">
            <Text style={styles.appbarTitle}>
              {headerTitle}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.button}>
          <HeaderRightButton
            // onPress={onPressRight}
            onPressIcon={this.navigateToMyPage}
            photoURL={this.state.photoURL}
            isAthlete={this.state.isAthlete}
          />
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
    height: 80,
    backgroundColor: '#FCFCFC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 32,
    paddingBottom: 8,
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
    // position: 'absolute',
    // alignSelf: 'center',
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
  },
  button: {
    paddingLeft: 18,
    paddingRight: 18,
  },
});

export default Header;
