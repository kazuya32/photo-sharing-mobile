import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text, ActivityIndicator } from 'react-native';

import designLanguage from '../../designLanguage.json';

class UploaderTile extends React.Component {
  render() {
    const {
      onPressUser,
      user,
    } = this.props;

    const userName = user ? (
      <TouchableHighlight
        onPress={() => { onPressUser(user); }}
        underlayColor="transparent"
      >
        <Text style={styles.userName}>
          {user.data.name}
        </Text>
      </TouchableHighlight>
    ) : (
      <View style={[styles.indicator]}>
        <ActivityIndicator color={designLanguage.color300} animating={user} />
      </View>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.userBy}>
          by
        </Text>
        {userName}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  indicator: {
    alignSelf: 'center',
  },
  userBy: {
  },
  userName: {
    color: designLanguage.color300,
    paddingLeft: 8,
    // paddingRight: 8,
  },
});

export default UploaderTile;
