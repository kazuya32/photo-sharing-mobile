import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class DownloadButton extends React.Component {
  onPress = () => {
    const { onPress, hasAccess } = this.props;
    if (hasAccess) { onPress(); }
  }
  render() {
    const { style, hasAccess } = this.props;

    return (
      <TouchableHighlight
        onPress={this.onPress}
        style={[
          styles.container,
          style,
          !hasAccess && { opacity: 0 },
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
    zIndex: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#102330',
  },
  button: {
    alignSelf: 'center',
    color: '#DB4D5E',
  },
});

export default DownloadButton;
