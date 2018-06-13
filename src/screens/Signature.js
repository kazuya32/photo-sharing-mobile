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
} from 'react-native';

import BackgroundImage from '../../assets/image/athlete/sample.png';

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
    image: BackgroundImage,
    strokeColor: '0xffff0000',
    // strokeColor: Math.random() * 0xffffff,
    // strokeWidth: Math.random() * 30 + 10,
    strokeWidth: 50,
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
      image: { uri },
    });
  };

  onReady = () => {
    console.log('ready!');
  };

  render() {
    // const resizeMode = 'center';

    return (
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <Image
            style={styles.backgroundImage}
            source={BackgroundImage}
            // source={this.state.image}
            resizeMode="contain"
          />
          <ExpoPixi.Sketch
            ref={ref => (this.sketch = ref)}
            style={styles.sketch}
            strokeColor={this.state.strokeColor}
            strokeWidth={this.state.strokeWidth}
            strokeAlpha={0.5}
            onChange={this.onChangeAsync}
            onReady={this.onReady}
            // initialLines={this.state.lines}
          >
          </ExpoPixi.Sketch>
        </View>
        <Button
          color={'blue'}
          title="undo"
          style={styles.button}
          onPress={() => {
            this.sketch.undo();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    // alignItems: 'center',
  },
  sketch: {
    // position: 'absolute',
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    // flex: 1,
  },
  photoContainer: {
    justifyContent: 'center',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    opacity: 0.9,
    alignSelf: 'center',
  },
  button: {
    position: 'absolute',
    // height: Dimensions.get('window').height * 0.1,
    bottom: Dimensions.get('window').height * 0.15,
    padding: 12,
  },
});

export default Signature;
