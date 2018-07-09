import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class RequestButton extends React.Component {
  render() {
    const {
      onPress,
      style,
      hasRequest,
    } = this.props;

    return (
      <TouchableHighlight
        style={[
          styles.menuButton,
          hasRequest && styles.hasRequest,
          style,
        ]}
        onPress={onPress}
        underlayColor="transparent"
      >
        <Icon
          name="card-giftcard"
          size={24}
          style={[
            styles.menuButtonTitle,
            hasRequest && styles.hasRequestTitle,
          ]}
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
  hasRequest: {
    backgroundColor: '#DB4D5E',
    borderWidth: 2,
  },
  menuButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 40,
    width: 40,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#DB4D5E',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
  },
  hasRequestTitle: {
    color: '#fff',
  },
  menuButtonTitle: {
    color: '#DB4D5E',
    alignSelf: 'center',
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

export default RequestButton;
