import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

class HeaderLeftButton extends React.Component {
  render() {
    const { onPress, style } = this.props;

    return (
      <TouchableHighlight
        onPress={onPress}
        underlayColor="transparent"
        style={[styles.container, style]}
      >
        <Icon
          name="search"
          size={28}
          style={styles.search}
        />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  search: {
    alignSelf: 'center',
  },
});

export default HeaderLeftButton;
