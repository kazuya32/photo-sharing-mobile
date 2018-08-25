import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class BackButton extends React.Component {
  render() {
    const { onPress, style, size } = this.props;

    return (
      <TouchableHighlight
        onPress={onPress}
        underlayColor="transparent"
        style={[
          styles.container,
          style,
        ]}
      >
        <Icon
          name="ios-arrow-back"
          size={size}
          style={styles.back}
        />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 18,
    paddingRight: 18,
  },
  back: {
    alignSelf: 'center',
  },
});

export default BackButton;
