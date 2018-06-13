import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class NortificationItem extends React.Component {
  render() {
    const { item } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.icon}>
          <FontAwesomeIcon name="user-circle-o" size={30} />
        </Text>
        <Text style={styles.item}>{item}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 8,
    paddingTop: 8,
    flexDirection: 'row',
  },
  icon: {
    fontSize: 16,
    paddingLeft: 16,
    paddingRight: 16,
    fontWeight: '600',
  },
  item: {
    fontSize: 14,
    alignSelf: 'center',
  },
});

export default NortificationItem;
