import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

class SelectItem extends React.Component {
  render() {
    const { onPress, title } = this.props;

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={onPress} underlayColor="transparent">
          <View style={styles.item}>
            <Text style={styles.itemTitle}>
              {title}
            </Text>
            <Text style={styles.button}>
              &gt;
            </Text>
          </View>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    borderColor: '#EBEBEB',
    borderBottomWidth: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 18,
  },
  button: {
    color: '#EBEBEB',
    fontWeight: '700',
    fontSize: 24,
  },
});

export default SelectItem;
