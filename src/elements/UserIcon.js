import React from 'react';
import { StyleSheet, TouchableHighlight, Image } from 'react-native';

// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class SendButton extends React.Component {
  render() {
    const {
      onPress,
      dia,
      style,
      isAthlete,
    } = this.props;
    let photoURL;

    if (this.props.photoURL) {
      // eslint-disable-next-line
      photoURL = this.props.photoURL;
    }

    const borderWidth = this.props.borderWidth || 3;
    const borderColor = this.props.borderColor || '#DB4D5E';

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
          style={[
            styles.photo,
            { width: dia, height: dia, borderRadius: dia * 0.5 },
            isAthlete && { borderWidth, borderColor },
            // isAthlete && { borderWidth: 3, borderColor: '#dab300' },
          ]}
          source={{ uri: photoURL }}
          resizeMode="contain"
        />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  profilePhoto: {
  },
  photo: {
    backgroundColor: 'gray',
    // borderWidth: 1,
    // borderColor: '#EBEBEB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});

export default SendButton;
