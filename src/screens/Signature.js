import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import {
  Image,
  Button,
  Platform,
  AppState,
  StyleSheet,
  View,
  Dimensions,
  PixelRatio,
} from 'react-native';
import { takeSnapshotAsync } from 'expo';

import PhotoHeader from '../components/PhotoHeader.js';

const isAndroid = Platform.OS === 'android';
// function uuidv4() {
//   //https://stackoverflow.com/a/2117523/4047926
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//     var r = (Math.random() * 16) | 0,
//       v = c == 'x' ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
// }

class Signature extends Component {
  state = {
    photo: this.props.navigation.state.params && this.props.navigation.state.params.photo,
    strokeColor: '0xDB4D5E',
    // strokeColor: '0xffff0000',
    // strokeColor: Math.random() * 0xffffff,
    // strokeWidth: Math.random() * 30 + 10,
    strokeWidth: 30,
    strokeAlpha: 0.8,
    // lines: [
    //   {
    //     points: [{ x: 300, y: 300 }, { x: 600, y: 300 }, { x: 450, y: 600 }, { x: 300, y: 300 }],
    //     color: 0xff00ff,
    //     alpha: 1,
    //     width: 10,
    //   },
    // ],
    appState: AppState.currentState,
  };

  // eslint-disable-next-line
  handleAppStateChangeAsync = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      if (isAndroid && this.sketch) {
        this.setState({
          appState: nextAppState,
          // id: uuidv4(),
          // lines: this.sketch.lines
        });
        return;
      }
    }
    this.setState({ appState: nextAppState });
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChangeAsync);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChangeAsync);
  }

  onChangeAsync = async () => {
    const { uri } = await this.sketch.takeSnapshotAsync();

    this.setState({
      signedPhoto: { uri },
    });
  };

  onReady = () => {
    console.log('ready!');
  };

  onPressSave = () => {
    this.props.navigation.navigate({
      routeName: 'SendSignature',
      params: {
        originalPhoto: this.state.photo,
        signedPhoto: this.state.signedPhoto,
      },
    });
  }

  takeSnapshot = async () => {
    const { photo } = this.state;
    const XYRate = photo.data.height / photo.data.width;

    const targetPixelCount = 1080; // If you want full HD pictures
    const pixelRatio = PixelRatio.get(); // The pixel ratio of the device
    // pixels * pixelratio = targetPixelCount, so pixels = targetPixelCount / pixelRatio
    const width = targetPixelCount / pixelRatio;
    const height = width * XYRate;
    // const pixels = targetPixelCount / pixelRatio;

    const result = await takeSnapshotAsync(this.photoContainer, {
      result: 'file',
      height,
      width,
      // width: Dimensions.get('window').width,
      // height: Dimensions.get('window').height * 0.7,
      quality: 1,
      format: 'png',
    });
    // console.log(this.photoContainer.current);
    this.setState({
      signedPhoto: { uri: result },
    });
  }

  render() {
    // const resizeMode = 'center';
    const { photo } = this.state;
    const photoWidth = Dimensions.get('window').width;
    const XYRate = photo.data.height / photo.data.width;
    const photoHeight = photoWidth * XYRate;

    return (
      <View style={styles.container}>
        <PhotoHeader
          onPressLeft={() => { this.props.navigation.goBack(); }}
          onPressRight={this.onPressSave}
          headerTitle="デジタルサイン"
          rightButtonTitle="Save"
        />
        <View
          style={styles.photoContainer}
          // ref={this.photoContainer}
          ref={ref => (this.photoContainer = ref)}
        >
          <Image
            style={[
              styles.backgroundImage,
              { height: photoHeight, width: photoWidth },
            ]}
            source={{ uri: photo.data.downloadURL }}
            resizeMode="contain"
          />
          <ExpoPixi.Sketch
            ref={ref => (this.sketch = ref)}
            style={[
              styles.sketch,
              { height: photoHeight, width: photoWidth },
            ]}
            strokeColor={this.state.strokeColor}
            strokeWidth={this.state.strokeWidth}
            strokeAlpha={this.state.strokeAlpha}
            // onChange={this.onChangeAsync}
            onChange={this.takeSnapshot}
            onReady={this.onReady}
            // initialLines={this.state.lines}
          />
        </View>
        <View
          style={styles.toolBox}
        >
          <Button
            color="blue"
            title="undo"
            style={styles.button}
            onPress={() => {
              this.sketch.undo();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    paddingTop: 80,
    // alignItems: 'center',
  },
  sketch: {
    // position: 'absolute',
    // height: '100%',
    // width: '100%',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    alignSelf: 'center',
    // flex: 1,
  },
  photoContainer: {
    marginTop: 32,
    marginBottom: 32,
    justifyContent: 'center',
    // flex: 1,
    // backgroundColor: '#fff',
    backgroundColor: 'black',
  },
  backgroundImage: {
    // top: 80,
    position: 'absolute',
    // opacity: 0.9,
    alignSelf: 'center',
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').width,
    // height: Dimensions.get('window').height * 0.7,
  },
  button: {
    // position: 'absolute',
    // height: Dimensions.get('window').height * 0.1,
    bottom: Dimensions.get('window').height * 0.15,
    padding: 16,
    flex: 1,
  },
  toolBox: {
    backgroundColor: 'black',
    opacity: 0.5,
    padding: 16,
    width: Dimensions.get('window').width,
  },
});

export default Signature;
