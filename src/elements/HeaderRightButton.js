import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import UserIcon from './UserIcon.js';

class HeaderRightButton extends React.Component {
  render() {
    const { onPress, photoURL, onPressIcon } = this.props;

    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={onPress}
          underlayColor="transparent"
          style={styles.nortification}
        >
          <MaterialCommunityIcon
            name="bell-outline"
            size={28}
            style={styles.icon}
          />
        </TouchableHighlight>
        <UserIcon
          onPress={onPressIcon}
          photoURL={photoURL}
          dia={32}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nortification: {
    marginRight: 4,
  },
  icon: {
    alignSelf: 'center',
    display: 'none', // 通知機能未実装のために暫定処置
  },
});

export default HeaderRightButton;
