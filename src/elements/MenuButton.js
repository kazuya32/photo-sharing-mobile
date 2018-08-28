import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class MenuButton extends React.Component {
  render() {
    const {
      onPress,
      style,
      isMyPage,
      show,
    } = this.props;

    if (!show) {
      return null;
    }

    return (
      <TouchableHighlight
        style={[
          styles.menuButton,
          isMyPage && styles.menuButtonMyPage,
          style,
        ]}
        onPress={onPress}
        underlayColor="transparent"
      >
        <Icon
          name="dots-horizontal"
          size={24}
          style={[
            styles.menuButtonTitle,
            isMyPage && styles.menuButtonTitleMyPage,
          ]}
        />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  menuButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 40,
    width: 40,
    justifyContent: 'center',
    paddingTop: 2,
    borderWidth: 2,
    borderColor: 'black',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
  },
  menuButtonMyPage: {
    borderColor: '#DB4D5E',
  },
  menuButtonTitle: {
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    // fontSize: 8,
  },
  menuButtonTitleMyPage: {
    color: '#DB4D5E',
  },
});

export default MenuButton;
