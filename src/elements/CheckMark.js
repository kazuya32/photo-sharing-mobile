import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class CheckMark extends React.Component {
  render() {
    const {
      style,
    } = this.props;

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
          <Icon
            name="check"
            size={8}
            style={[
              styles.menuButtonTitle,
            ]}
          />
          <View
            style={[
              styles.badge,
              { right: 10, top: -3 },
            ]}
          />
          <View
            style={[
              styles.badge,
              { left: 10, top: -3 },
            ]}
          />
          <View
            style={[
              styles.badge,
              { right: 10, bottom: -3 },
            ]}
          />
          <View
            style={[
              styles.badge,
              { left: 10, bottom: -3 },
            ]}
          />
          <View
            style={[
              styles.badge,
              { top: 10, right: -3 },
            ]}
          />
          <View
            style={[
              styles.badge,
              { bottom: 10, right: -3 },
            ]}
          />
          <View
            style={[
              styles.badge,
              { top: 10, left: -3 },
            ]}
          />
          <View
            style={[
              styles.badge,
              { bottom: 10, left: -3 },
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
//     { top: 10, right: -3 },
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
//     { left: 14, top: -3 },
//   ]}
// />
// <View
//   style={[
//     styles.badge,
//     { right: 14, bottom: -3 },
//   ]}
// />

const styles = StyleSheet.create({
  menuButton: {
    borderRadius: 10,
    height: 20,
    width: 20,
    backgroundColor: '#DB4D5E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonTitle: {
    color: '#fff',
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    // fontSize: 8,
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
