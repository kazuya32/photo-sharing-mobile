import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import designLanguage from '../../designLanguage.json';

class CheckMark extends React.Component {
  render() {
    const {
      style,
      show,
    } = this.props;

    if (!show) {
      return null;
    }
    // const dia = 3;

    return (
      <View
        style={[
          style,
        ]}
      >
        <View
          style={[
            styles.menuButton,
          ]}
        >
          <FontAwesomeIcon
            name="certificate"
            size={16}
            style={[
              styles.back,
            ]}
          />
          <Icon
            name="check"
            size={8}
            style={[
              styles.check,
            ]}
          />

        </View>
      </View>
    );
  }
}

// <View
//   style={[
//     styles.badge,
//     { right: 10, top: -3 },
//   ]}
// />
// <View
//   style={[
//     styles.badge,
//     { left: 10, top: -3 },
//   ]}
// />
// <View
//   style={[
//     styles.badge,
//     { right: 10, bottom: -3 },
//   ]}
// />
// <View
//   style={[
//     styles.badge,
//     { left: 10, bottom: -3 },
//   ]}
// />
// <View
//   style={[
//     styles.badge,
//     { top: 10, right: -3 },
//   ]}
// />
// <View
//   style={[
//     styles.badge,
//     { bottom: 10, right: -3 },
//   ]}
// />
// <View
//   style={[
//     styles.badge,
//     { top: 10, left: -3 },
//   ]}
// />
// <View
//   style={[
//     styles.badge,
//     { bottom: 10, left: -3 },
//   ]}
// />

const styles = StyleSheet.create({
  menuButton: {
    borderRadius: 10,
    height: 20,
    width: 20,
    // backgroundColor: '#DB4D5E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    position: 'absolute',
    color: designLanguage.color300,
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  check: {
    position: 'absolute',
    color: '#fff',
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    zIndex: 20,
  },
  badge: {
    position: 'absolute',
    backgroundColor: '#fff',
    alignSelf: 'center',
    height: 8,
    width: 8,
    borderRadius: 3,
    zIndex: 20,
  },
});

export default CheckMark;
