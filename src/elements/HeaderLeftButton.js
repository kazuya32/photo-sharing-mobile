import React from 'react';
import { TouchableHighlight, Image, StyleSheet, View } from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class HeaderLeftButton extends React.Component {
  render() {
    const { onPress, photoURL } = this.props;

    if (!photoURL) {
      return (
        <TouchableHighlight
          onPress={onPress}
          underlayColor="transparent"
        >
          <FontAwesomeIcon name="user-circle-o" size={24} />
        </TouchableHighlight>
      );
    }

    return (

      <TouchableHighlight
        onPress={onPress}
        underlayColor="transparent"
      >
        <View style={styles.profilePhoto}>
          <Image
            style={styles.photo}
            source={{ uri: photoURL }}
            resizeMode="cover"
          />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  profilePhoto: {
    // alignSelf: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'gray',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  photo: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#EBEBEB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  alert: {
    padding: 16,
    // alignSelf: 'center',
  },
});

export default HeaderLeftButton;
