import React from 'react';
import { StyleSheet, TouchableHighlight, Image } from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class SendButton extends React.Component {
  render() {
    const {
      onPress,
      photoURL,
      dia,
      style,
    } = this.props;

    // if (!photoURL) {
    //   return (
    //     <TouchableHighlight
    //       onPress={onPress}
    //       underlayColor="transparent"
    //     >
    //       <FontAwesomeIcon name="user-circle-o" size={dia} />
    //     </TouchableHighlight>
    //   );
    // }

    return (
      <TouchableHighlight
        style={[
          styles.profilePhoto,
          { width: dia, height: dia, borderRadius: dia * 0.5 },
          style,
        ]}
        onPress={onPress}
        underlayColor="transparent"
      >
        <Image
          style={[styles.photo, { width: dia, height: dia, borderRadius: dia * 0.5 }]}
          source={{ uri: photoURL }}
          resizeMode="contain"
        />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  profilePhoto: {
    backgroundColor: 'gray',
  },
  photo: {
    borderWidth: 1,
    borderColor: '#EBEBEB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});

export default SendButton;
