import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

class HeaderLeftButton extends React.Component {
  render() {
    const { onPressLeft } = this.props;

    return (
      <TouchableHighlight
        onPress={onPressLeft}
        underlayColor="transparent"
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
  search: {
    alignSelf: 'center',
  },
});

export default HeaderLeftButton;
