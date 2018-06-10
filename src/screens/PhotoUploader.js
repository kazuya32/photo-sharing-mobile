import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Alert,
  Dimensions,
} from 'react-native';

import PhotoHeader from '../components/PhotoHeader.js';
import SelectItem from '../components/SelectItem.js';

class PhotoUploader extends React.Component {
  state = {
    tags: [],
    people: [],
    match: null,
    team: null,
  }

  onPressTest() {
    Alert.alert('Uploaded!');
  }


  render() {
    return (
      <View style={styles.container}>
        <PhotoHeader
          onPressLeft={() => { this.props.navigation.goBack(); }}
          onPressRight={this.onPressTest}
          headerTitle="New Photo"
          rightButtonTitle="Post"
        />
        <View style={styles.body}>
          <View style={styles.bodyItem}>
            <Image
              style={styles.image}
              source={{ uri: this.props.navigation.state.params.imageUri }}
              resizeMode="cover"
            />
          </View>
          <SelectItem
            onPress={this.onPressTest}
            title="Tag People"
          />
          <SelectItem
            onPress={this.onPressTest}
            title="Add Team"
          />
          <SelectItem
            onPress={this.onPressTest}
            title="Add Match"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    marginTop: 64,
  },
  bodyItem: {
    borderColor: '#EBEBEB',
    borderBottomWidth: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  image: {
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 4,
  },
})

export default PhotoUploader;
