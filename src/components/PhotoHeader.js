import React from 'react';
import { StyleSheet, View, Text, Button, TouchableHighlight, StatusBar } from 'react-native';

class Appbar extends React.Component {
  render() {
    const {
      onPressLeft,
      onPressRight,
      headerTitle,
      rightButtonTitle,
    } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
        />
        <TouchableHighlight style={styles.leftButton} onPress={onPressLeft} underlayColor="transparent">
          <Text style={styles.leftButtonText}>
            Cancel
          </Text>
        </TouchableHighlight>
        <View style={styles.appbar}>
          <View>
            <Text style={styles.appbarTitle}>
              {headerTitle}
            </Text>
          </View>
        </View>
        <View style={styles.rightButton}>
          <Button
            onPress={onPressRight}
            title={rightButtonTitle}
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
    height: 80,
    backgroundColor: '#FCFCFC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 32,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    zIndex: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: '#808080',
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
    bottom: 6,
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
