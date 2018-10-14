import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import designLanguage from '../../designLanguage.json';

const IconBadge = (props) => {
  // const isAndroid = Platform.OS === 'android';
  // if (isAndroid) { return null; }

  const {
    style,
    badgeNumber,
    notify,
  } = props;

  if (notify) {
    return (
      <View
        style={[
          styles.badge,
          { backgroundColor: 'transparent', borderWidth: 0 },
          style,
        ]}
      >
        <Icon
          style={[
            styles.notification,
          ]}
          name="alert-box"
          size={18}
        />
      </View>
    );
  }

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
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: designLanguage.colorPrimary,
    alignSelf: 'center',
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: designLanguage.colorPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTitle: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 10,
    textAlign: 'center',
  },
  notification: {
    color: designLanguage.colorPrimary,
    // backgroundColor: '#fff',
  },
});

export default IconBadge;
