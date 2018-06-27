import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';


class SearchItem extends React.Component {
  render() {
    const { onPress, title } = this.props;

    return (
      <TouchableHighlight onPress={onPress} underlayColor="transparent">
        <View style={styles.item}>
          <Text style={styles.itemTitle}>
            {title}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  itemTitle: {
    fontSize: 18,
  },
});

export default SearchItem;
