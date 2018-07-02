import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  CameraRoll,
  // Alert,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import PhotoHeader from '../components/PhotoHeader.js';

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

  onPress = (item) => {
    this.setState({ selectedImageUri: item.uri });
  }

  onPressTest = () => {
    // Alert.alert('button pressed');
  }

  loadImages = () => {
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

  storeImages = (edges) => {
    console.log(edges);
    // const images = this.state.images;
    // edges.forEach((edge) => {
    //   images.push(edge.node.image);
    // })
    const images = edges.map(asset => asset.node.image);
    console.log(images);
    this.setState({ images });
  }

  keyExtractor = index => index.toString();

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onPress(item)} >
      <Image
        style={styles.imageItem}
        source={{ uri: item.uri }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  )

  render() {
    return (
      <View
        style={styles.container}
        imageUri={this.state.selectedImageUri}
      >
        <PhotoHeader
          onPressRight={() => {
            this.props.navigation.navigate({
              routeName: 'PhotoUploader',
              params: { imageUri: this.state.selectedImageUri },
            });
          }}
          onPressLeft={() => { this.props.navigation.goBack(); }}
          headerTitle="Camera Roll"
          rightButtonTitle="Next"
        />
        <View style={styles.cameraRoll}>
          <Image
            style={styles.mainImage}
            source={{ uri: this.state.selectedImageUri }}
            resizeMode="cover"
          />
          <FlatList
            data={this.state.images}
            renderItem={this.renderItem}
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
  },
  cameraRoll: {
    flex: 1,
    marginTop: 80,
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
});

export default PhotoPicker;
