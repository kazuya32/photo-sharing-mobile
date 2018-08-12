import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  View,
} from 'react-native';

// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class SendButton extends React.Component {
  render() {
    const {
      onPress,
      dia,
      style,
      isAthlete,
      badgeNumber,
    } = this.props;
    let photoURL;

    if (this.props.photoURL) {
      // eslint-disable-next-line
      photoURL = this.props.photoURL;
    }

    const borderWidth = this.props.borderWidth || 3;
    const borderColor = this.props.borderColor || '#DB4D5E';

    let num = badgeNumber;
    if (num > 99) { num = 99; }

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
        <View>
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
          <View
            style={[
              styles.badge,
              !badgeNumber && { display: 'none' },
            ]}
          >
            <Text
              style={[
                styles.badgeTitle,
              ]}
            >
              {num}
            </Text>
          </View>
        </View>
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
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#DB4D5E',
    alignSelf: 'center',
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#DB4D5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTitle: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default SendButton;
