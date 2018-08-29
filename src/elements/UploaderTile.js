import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text, ActivityIndicator } from 'react-native';

class UploaderTile extends React.Component {
  render() {
    const {
      onPressUser,
      user,
    } = this.props;

    const userName = user ? (
      <TouchableHighlight
        onPress={() => { onPressUser(user.id); }}
        underlayColor="transparent"
      >
        <Text style={styles.userName}>
          {user.data.name}
        </Text>
      </TouchableHighlight>
    ) : (
      <View style={[styles.indicator]}>
        <ActivityIndicator color="#DB4D5E" animating={user} />
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
    color: '#DB4D5E',
    paddingLeft: 8,
    // paddingRight: 8,
  },
});

export default UploaderTile;
