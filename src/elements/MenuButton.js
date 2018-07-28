import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class MenuButton extends React.Component {
  render() {
    const {
      onPress,
      style,
    } = this.props;

    return (
      <TouchableHighlight
        style={[styles.menuButton, style]}
        onPress={onPress}
        underlayColor="transparent"
      >
        <Icon
          name="dots-horizontal"
          size={24}
          style={styles.menuButtonTitle}
        />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    right: 16,
    // height: 30,
    alignSelf: 'center',
  },
  menuButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 40,
    width: 40,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#DB4D5E',
    paddingTop: 2, 
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
  },
  menuButtonTitle: {
    color: '#DB4D5E',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    // fontSize: 8,
  },
  followButton: {
    position: 'absolute',
    right: 16,
    // height: 30,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
});

export default MenuButton;
