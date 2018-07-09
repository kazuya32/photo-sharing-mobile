import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

class SaveButton extends React.Component {
  render() {
    const {
      onPress,
      style,
      buttonStyle,
      textStyle,
      shadow,
    } = this.props;

    return (
      <TouchableHighlight style={[styles.container, style]} onPress={onPress} underlayColor="transparent">
        <View style={[styles.sendButton, buttonStyle]}>
          <Text
            style={[
              styles.sendButtonTitle,
              shadow && styles.shadow,
              textStyle,
            ]}
          >
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
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  sendButtonTitle: {
    color: '#fff',
  },
});

export default SaveButton;
