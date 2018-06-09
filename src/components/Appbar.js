import React from 'react';
import { StyleSheet, View, Text, Button, TouchableHighlight } from 'react-native';

class Appbar extends React.Component {
  render() {
    const { onPress } = this.props;

    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.leftButton} onPress={onPress} underlayColor="transparent">
          <Text style={styles.leftButtonText}>
            Cancel
          </Text>
        </TouchableHighlight>
        <View style={styles.appbar}>
          <View>
            <Text style={styles.appbarTitle}>Camera Roll</Text>
          </View>
        </View>
        <View style={styles.rightButton}>
          <Button
            onPress={onPress}
            title="Next"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#FCFCFC',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    zIndex: 10,
  },
  appbar: {

  },
  appbarTitle: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  rightButton: {
    paddingRight: 10,
    top: 8,
  },
  leftButton: {
    paddingLeft: 16,
  },
  leftButtonText: {
    fontSize: 16,
    color: '#000000',
  },
});

export default Appbar;
