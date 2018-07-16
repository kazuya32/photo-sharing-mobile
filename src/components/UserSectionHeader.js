import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class UserSectionHeader extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.item}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    borderTopWidth: 2,
    borderColor: '#EBEBEB',
  },
  item: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserSectionHeader;
