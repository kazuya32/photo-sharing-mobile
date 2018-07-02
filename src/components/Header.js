import React from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';

import HeaderLeftButton from '../elements/HeaderLeftButton.js';
import HeaderRightButton from '../elements/HeaderRightButton.js';

class Header extends React.Component {
  state = {}

  componentWillMount() {
    this.retrieveUserPhoto();
  }

  retrieveUserPhoto = async () => {
    try {
      const value = await AsyncStorage.getItem('photoURL');
      if (value !== null) {
        this.setState({ photoURL: value });
      }
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
