import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class DownloadButton extends React.Component {
  render() {
    const { onPress, style, hasAccess } = this.props;

    return (
      <TouchableHighlight
        onPress={onPress}
        style={[
          styles.container,
          style,
          !hasAccess && { display: 'none' },
        ]}
        underlayColor="transparent"
      >
        <Icon name="download" size={36} style={styles.button} />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // bottom: 20,
    // right: 20,
    // width: 56,
    // height: 56,
    zIndex: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#102330',
    // shadowColor: '#102330',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.7,
    // shadowRadius: 3,
  },
  button: {
    alignSelf: 'center',
    color: '#DB4D5E',
  },
});

export default DownloadButton;
