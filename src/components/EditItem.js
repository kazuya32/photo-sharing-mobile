import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

class EditItem extends React.Component {
  render() {
    const { onChangeText, title, value } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {title}
        </Text>
        <TextInput
          style={styles.input}
          title={title}
          value={value}
          onChangeText={(text) => { onChangeText(text); }}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontSize: 12,
    paddingTop: 12,
    paddingBottom: 12,
    color: '#C4C4C4',
  },
  input: {
    fontSize: 16,
    borderColor: '#808080',
    color: '#808080',
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
});

export default EditItem;
