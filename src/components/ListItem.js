import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

class ListItem extends React.Component {
  render() {
    const { onPress, text } = this.props;

    return (
      <TouchableHighlight onPress={onPress} underlayColor="transparent">
        <View style={styles.item}>
          <Text style={styles.text}>
            {text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 20,
    marginRight: 20,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  text: {
    marginLeft: 8,
    marginRight: 8,
    // borderColor: '#EBEBEB',
    // borderWidth: 2,
  },
});

export default ListItem;
