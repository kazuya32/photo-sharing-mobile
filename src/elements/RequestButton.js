import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ButtonBadge from '../elements/ButtonBadge.js';

class RequestButton extends React.Component {
  render() {
    const {
      onPress,
      style,
      badgeNumber,
    } = this.props;

    let num = badgeNumber;
    if (num > 99) { num = 99; }

    return (
      <TouchableHighlight
        style={[
          style,
        ]}
        onPress={onPress}
        underlayColor="transparent"
      >
        <View
          style={[
            styles.menuButton,
            badgeNumber && styles.hasRequest,
          ]}
        >
          <Icon
            name="card-giftcard"
            size={24}
            style={[
              styles.menuButtonTitle,
              badgeNumber && styles.hasRequestTitle,
            ]}
          />
          <ButtonBadge
            style={[styles.badge]}
            badgeNumber={badgeNumber}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
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
  badge: {
    position: 'absolute',
    right: -8,
    top: -8,
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
