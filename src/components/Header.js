import React from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';

import HeaderLeftButton from '../elements/HeaderLeftButton.js';
import HeaderRightButton from '../elements/HeaderRightButton.js';

class Header extends React.Component {
  state = {}

  componentWillMount() {
    this.retrieveUser();
  }

  retrieveUser = async () => {
    try {
      const photoURL = await AsyncStorage.getItem('photoURL');
      const isAthlete = await AsyncStorage.getItem('isAthlete');

      // if (photoURL !== null && isAthlete !== null) {
      const value = (isAthlete === 'true');
      this.setState({ photoURL, isAthlete: value });
      // }
    } catch (error) {
    //
    }
  }

  render() {
    const {
      onPressLeft,
      onPressRight,
      headerTitle,
    } = this.props;


    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <HeaderLeftButton
            onPress={onPressLeft}
            photoURL={this.state.photoURL}
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
          <HeaderRightButton
            onPress={onPressRight}
            onPressIcon={onPressLeft}
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
    paddingLeft: 14,
    paddingRight: 14,
  },
});

export default Header;
