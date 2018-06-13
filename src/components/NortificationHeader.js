import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

class NortificationHeader extends React.Component {
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
    paddingBottom: 20,
    paddingLeft: 16,
    paddingTop: 12,
    borderTopWidth: 2,
    borderColor: '#EBEBEB',
  },
  item: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NortificationHeader;
