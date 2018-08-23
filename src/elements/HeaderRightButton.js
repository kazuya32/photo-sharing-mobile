import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

import UserIcon from './UserIcon.js';

class HeaderRightButton extends React.Component {
  render() {
    const {
      onPress,
      photoURL,
      onPressIcon,
      isAthlete,
      badgeNumber,
    } = this.props;

    return (
      <TouchableHighlight
        onPress={onPress}
        underlayColor="transparent"
        style={styles.container}
      >
        <UserIcon
          onPress={onPressIcon}
          photoURL={photoURL}
          dia={32}
          isAthlete={isAthlete}
          badgeNumber={badgeNumber}
        />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HeaderRightButton;
