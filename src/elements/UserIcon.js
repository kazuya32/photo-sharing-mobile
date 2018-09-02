import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
  // Platform,
} from 'react-native';
import { FileSystem } from 'expo';

import IconBadge from '../elements/IconBadge.js';

class UserIcon extends React.Component {
  // cacheImage = async () => {
  //   const { photo } = this.props;
  //   const path = FileSystem.cacheDirectory + photo.id + '.jpg';
  //   const info = await FileSystem.getInfoAsync(path);
  //   if (!info.exists) {
  //     await FileSystem.downloadAsync(photo.data.downloadURL, path);
  //   }
  //   return path;
  // };

  render() {
    const {
      onPress,
      dia,
      style,
      isAthlete,
      badgeNumber,
      invisible,
    } = this.props;

    if (invisible) { return null; }

    let photoURL;

    if (this.props.photoURL) {
      // eslint-disable-next-line
      photoURL = this.props.photoURL;
    }

    const borderWidth = this.props.borderWidth || 3;
    const borderColor = this.props.borderColor || '#DB4D5E';

    // const isAndroid = Platform.OS === 'android';

    return (
      <TouchableHighlight
        style={[
          styles.profilePhoto,
          { width: dia, height: dia, borderRadius: dia * 0.5 },
          // isAndroid && { paddingTop: 6, paddingRight: 6 },
          style,
        ]}
        onPress={onPress}
        underlayColor="transparent"
      >
        <View
          style={[
            // styles.profilePhoto,
            // { width: dia, height: dia, borderRadius: dia * 0.5 },
          ]}
        >
          <Image
            style={[
              styles.photo,
              { width: dia, height: dia },
              isAthlete && { borderWidth, borderColor },
              // isAndroid && { top: 0 },
            ]}
            source={{ uri: photoURL }}
            resizeMode="cover"
            borderRadius={dia * 0.5}
          />
          <IconBadge
            style={styles.badge}
            badgeNumber={badgeNumber}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  profilePhoto: {
    backgroundColor: 'gray',
  },
  photo: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
  },
});

export default UserIcon;
