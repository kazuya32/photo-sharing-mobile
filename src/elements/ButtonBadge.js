import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class ButtonBadge extends React.Component {
  render() {
    const {
      style,
      badgeNumber,
    } = this.props;

    if (!badgeNumber) { return null; }

    return (
      <View
        style={[
          styles.badge,
          style,
        ]}
      >
        <Text
          style={[
            styles.badgeTitle,
          ]}
        >
          {badgeNumber}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DB4D5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTitle: {
    color: '#DB4D5E',
    alignSelf: 'center',
    fontSize: 10,
  },
});

export default ButtonBadge;
