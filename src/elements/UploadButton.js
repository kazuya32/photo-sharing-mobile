import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class UploadButton extends React.Component {
  render() {
    const { onPress } = this.props;

    return (
      <TouchableHighlight onPress={onPress} style={styles.container} underlayColor="transparent">
        <Icon name="plus" size={40} style={styles.button} />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    zIndex: 100,
    backgroundColor: '#DB4D5E',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderColor: '#102330',
    shadowColor: '#102330',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    borderRadius: 28,
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    color: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    // borderRadius: 48 * 0.5,

  },
});

export default UploadButton;
