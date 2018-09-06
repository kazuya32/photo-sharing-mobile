import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
  ActivityIndicator,
  // Platform,
} from 'react-native';
import { FileSystem } from 'expo';

import designLanguage from '../../designLanguage.json';
import IconBadge from '../elements/IconBadge.js';

class UserIcon extends React.Component {
  state = {}

  // componentDidMount() {
  //   if (this.props.photoURL) {
  //     this.cacheImage();
  //   }
  // }

  // eslint-disable-next-line
  cacheImage = async () => {
    const { photoURL } = this.props;
    const filename = await this.getFileName(photoURL);
    const path = FileSystem.cacheDirectory + filename;
    const info = await FileSystem.getInfoAsync(path);
    if (!info.exists) {
      await FileSystem.downloadAsync(photoURL, path);
    }
    this.setState({ uri: path });
  };

  getFileName = async url => url.split('?').shift().slice(8);

  render() {
    const {
      onPress,
      dia,
      style,
      isAthlete,
      badgeNumber,
      invisible,
      loading,
    } = this.props;

    if (invisible) { return null; }

    if (loading) {
      return (
        <View
          style={[
            style,
          ]}
        >
          <View
            style={[
              styles.container,
              { width: dia, height: dia },
              isAthlete && { borderWidth, borderColor },
            ]}
          >
            <ActivityIndicator animating={loading} color={designLanguage.color200} />
          </View>
        </View>
      );
    }

    const borderWidth = this.props.borderWidth || 3;
    const borderColor = this.props.borderColor || '#DB4D5E';


    const image = this.props.photoURL ? (
      <Image
        style={[
          styles.photo,
          { width: dia, height: dia },
          isAthlete && { borderWidth, borderColor },
        ]}
        source={{
          uri: this.props.photoURL,
          cache: 'force-cache',
        }}
        resizeMode="cover"
        borderRadius={dia * 0.5}
      />
    ) : (
      <View
        style={[
          styles.photo,
          styles.blank,
          { width: dia, height: dia, borderRadius: dia * 0.5 },
          isAthlete && { borderWidth, borderColor },
        ]}
      />
    );

    // const image = this.state.uri ? (
    //   <Image
    //     style={[
    //       styles.photo,
    //       { width: dia, height: dia },
    //       isAthlete && { borderWidth, borderColor },
    //       // isAndroid && { top: 0 },
    //     ]}
    //     source={{ uri: this.state.uri }}
    //     resizeMode="cover"
    //     borderRadius={dia * 0.5}
    //   />
    // ) : (
    //   <View
    //     style={[
    //       styles.photo,
    //       styles.blank,
    //       { width: dia, height: dia, borderRadius: dia * 0.5 },
    //       isAthlete && { borderWidth, borderColor },
    //     ]}
    //   />
    // );

    return (
      <View
        style={[
          styles.container,
          style,
        ]}
      >
        <TouchableHighlight
          style={[
            styles.profilePhoto,
            { width: dia, height: dia, borderRadius: dia * 0.5 },
          ]}
          onPress={onPress}
          underlayColor="transparent"
        >
          {image}
        </TouchableHighlight>
        <IconBadge
          style={styles.badge}
          badgeNumber={badgeNumber}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePhoto: {
    // padding: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  blank: {
    backgroundColor: 'gray',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
  },
});

export default UserIcon;
