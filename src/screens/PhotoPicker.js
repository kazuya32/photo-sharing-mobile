import React from 'react';
import {
  StyleSheet,
  View,
  // Alert,
} from 'react-native';
import {
  ImagePicker,
  Permissions,
} from 'expo';

class PhotoPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.selectImage();
  }

  selectImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      this.pickImage();
    } else {
      this.props.navigation.navigate({ routeName: 'Home' });
      // Alert.alert('カメラロールの使用が許可されていません。');
    }
  }

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      // base64: true,
    });
    console.log(result);

    if (result.cancelled) {
      this.props.navigation.navigate({ routeName: 'Home' });
      // Alert.alert('カメラロールの使用が許可されていません。');
    } else {
      this.props.navigation.navigate({
        routeName: 'PhotoUploader',
        params: { image: result },
      });
    }
  };

  // onPress = (item) => {
  //   this.setState({ selectedImageUri: item.uri });
  // }

  render() {
    return (
      <View
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PhotoPicker;
