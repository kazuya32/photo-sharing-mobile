import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


class IconBadge extends React.Component {
  render() {
    // const isAndroid = Platform.OS === 'android';
    // if (isAndroid) { return null; }

    const {
      style,
      badgeNumber,
    } = this.props;

    if (!badgeNumber) { return null; }

    let num = badgeNumber;
    if (num > 99) { num = 99; }

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
          {num}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#DB4D5E',
    alignSelf: 'center',
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#DB4D5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTitle: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default IconBadge;
