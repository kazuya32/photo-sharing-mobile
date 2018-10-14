import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UploadButton = (props) => {
  const { onPress, show } = props;

  if (!show) { return null; }

  return (
    <TouchableHighlight onPress={onPress} style={styles.container} underlayColor="transparent">
      <Icon name="plus" size={40} style={styles.button} />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 56,
    height: 56,
    zIndex: 100,
    backgroundColor: '#DB4D5E',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    shadowColor: '#102330',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    borderRadius: 28,
  },
  button: {
    alignSelf: 'center',
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    // borderRadius: 48 * 0.5,

  },
});

export default UploadButton;
