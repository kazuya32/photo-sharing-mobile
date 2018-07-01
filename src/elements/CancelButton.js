import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

class SendButton extends React.Component {
  render() {
    const { onPress, style } = this.props;

    return (
      <TouchableHighlight style={[styles.container, style]} onPress={onPress} underlayColor="transparent">
        <View style={styles.sendButton}>
          <Text style={styles.sendButtonTitle}>
            {this.props.children}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    right: 16,
    height: 30,
    alignSelf: 'center',
  },
  sendButton: {
    borderRadius: 21,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 12,
    paddingLeft: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderColor: '#C4C4C4',
    borderWidth: 1,
  },
  sendButtonTitle: {
    color: '#C4C4C4',
  },
});

export default SendButton;
