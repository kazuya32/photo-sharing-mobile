import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Image, Button, Platform, AppState, StyleSheet, Text, View } from 'react-native';

const isAndroid = Platform.OS === 'android';
function uuidv4() {
  //https://stackoverflow.com/a/2117523/4047926
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

class Signature extends Component {
  state = {
    image: null,
    strokeColor: '0xffff0000',
    // strokeColor: Math.random() * 0xffffff,
    // strokeWidth: Math.random() * 30 + 10,
    strokeWidth: 50,
    lines: [
      {
        points: [{ x: 300, y: 300 }, { x: 600, y: 300 }, { x: 450, y: 600 }, { x: 300, y: 300 }],
        color: 0xff00ff,
        alpha: 1,
        width: 10,
      },
    ],
    appState: AppState.currentState,
    backgroundImage: require('../../assets/image/athlete/sample.png'),
  };

  handleAppStateChangeAsync = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      if (isAndroid && this.sketch) {
        this.setState({ appState: nextAppState, id: uuidv4(), lines: this.sketch.lines });
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
      // strokeWidth: Math.random() * 30 + 10,
      // strokeColor: Math.random() * 0xffffff,
    });
  };

  onReady = () => {
    console.log('ready!');
  };

  render() {
    const resizeMode = 'center';

    return (
      <View style={styles.container}>
        <Image
          style={{
            backgroundColor: 'black',
            opacity: 0.8,
            flex: 1,
            resizeMode,
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}
          source={this.state.backgroundImage}
        >
        </Image>
        <View style={styles.container}>
          <View style={styles.sketchContainer}>
            <ExpoPixi.Sketch
              ref={ref => (this.sketch = ref)}
              style={styles.sketch}
              strokeColor={this.state.strokeColor}
              strokeWidth={this.state.strokeWidth}
              strokeAlpha={0.5}
              onChange={this.onChangeAsync}
              onReady={this.onReady}
              // initialLines={this.state.lines}
            />
            <View style={styles.header}>
              <Text>Digital Sign Sample</Text>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <View style={styles.label}>
              <Text> </Text>
            </View>
            <Image style={styles.image} source={this.state.image} />
          </View>
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
    flex: 1,
  },
  sketch: {
    flex: 1,
  },
  sketchContainer: {
    // height: '50%',
    height: '100%',
    zIndex: 100,
  },
  backgroundImage: {
    backgroundColor: '#ccc',
    flex: 1,
    position: 'absolute',
    // width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
  },
  imageContainer: {
    height: '50%',
    borderTopWidth: 4,
    borderTopColor: '#E44262',
  },
  header: {
    width: '100%',
    padding: 5,
    alignItems: 'center',
  },
  label: {
    width: '100%',
    padding: 5,
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 24,
    // left: 8,
    zIndex: 1,
    padding: 12,
    minWidth: 56,
    minHeight: 48,
  },
});

export default Signature;
