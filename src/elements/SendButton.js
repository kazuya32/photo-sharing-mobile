import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

class SendButton extends React.Component {
  render() {
    const { onPress, style, textStyle } = this.props;

    return (
      <TouchableHighlight style={[styles.container, style]} onPress={onPress} underlayColor="transparent">
        <View style={styles.sendButton}>
          <Text style={[styles.sendButtonTitle, textStyle]}>
            {this.props.children}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    alignSelf: 'center',
  },
  sendButton: {
    backgroundColor: '#DB4D5E',
    borderRadius: 21,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  sendButtonTitle: {
    color: '#fff',
  },
});

export default SendButton;
