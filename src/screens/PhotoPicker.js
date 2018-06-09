import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  CameraRoll,
  Alert,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Appbar from '../components/Appbar.js';

class PhotoPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedImageUri: 'initial uri',
      // endCursor: true,
    };
  }

  componentDidMount() {
    CameraRoll.getPhotos({
      first: 30,
      assetType: 'Photos',
    })
      .then((obj) => {
        this.storeImages(obj.edges);
        this.setState({ selectedImageUri: obj.edges[0].node.image.uri });
        // this.setState({ endCursor: obj.page_info.end_cursor })
      });
  }

  onPress(item) {
    this.setState({ selectedImageUri: item.uri });
  }

  onPressTest() {
    Alert.alert('button pressed');
  }

  loadImages() {
    const endCursor = this.state.EndCursor;
    CameraRoll.getPhotos({
      after: endCursor,
      assetType: 'Photos',
    })
      .then((obj) => {
        this.storeImages(obj.edges);
        // this.setState({ endCursor: obj.page_info.end_cursor })
      });
  }

  storeImages(edges) {
    // const images = this.state.images;
    // edges.forEach((edge) => {
    //   images.push(edge.node.image);
    // })
    const images = edges.map((asset) => asset.node.image )
    this.setState({ images });
  }

  keyExtractor = (item, index) => item.uri;

  renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => this.onPress(item)} >
        <Image
          style={styles.imageItem}
          source={{ uri: item.uri }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar onPress={this.onPressTest} imageUri={this.state.selectedImageUri} />
        <View style={styles.cameraRoll}>
          <Image
            style={styles.mainImage}
            source={{ uri: this.state.selectedImageUri }}
            resizeMode="cover"
          />
          <FlatList
            data={this.state.images}
            renderItem={this.renderItem.bind(this)}
            numColumns={4}
            keyExtractor={this.keyExtractor}
            onEndReached={this.onPressTest}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  cameraRoll: {
    flex: 1,
    marginTop: 64,
  },
  imageItem: {
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 4,
    borderWidth: 1,
    borderColor: '#fff',
  },
  mainImage: {
    width: '100%',
    height: '60%',
  },
})

export default PhotoPicker;
