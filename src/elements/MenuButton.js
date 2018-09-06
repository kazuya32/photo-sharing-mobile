import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class MenuButton extends React.Component {
  render() {
    const {
      onPress,
      style,
      isMyPage,
      show,
      border,
    } = this.props;

    if (!show) {
      return null;
    }

    const color = isMyPage ? '#DB4D5E' : '#000000';

    return (
      <TouchableHighlight
        style={[
          styles.menuButton,
          { borderColor: color },
          border && { borderWidth: 2 },
          isMyPage && styles.menuButtonMyPage,
          style,
        ]}
        onPress={onPress}
        underlayColor="transparent"
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Icon
            name="dots-horizontal"
            size={24}
            style={[
              styles.menuButtonTitle,
              { color },
              isMyPage && styles.menuButtonTitleMyPage,
            ]}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  menuButton: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
  },
  menuButtonTitle: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default MenuButton;
