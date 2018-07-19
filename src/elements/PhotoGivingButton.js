import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

class PhotoGivingButton extends React.Component {
  render() {
    const {
      style,
      buttonStyle,
      textStyle,
      isMyPage,
      // isAthlete,
      onPress,
    } = this.props;

    const text = '写真を届ける';

    return (
      <TouchableHighlight
        style={[
          styles.container,
          style,
          // (!isAthlete || isMyPage) && { display: 'none' },
          isMyPage && { display: 'none' },
        ]}
        onPress={onPress}
        underlayColor="transparent"
      >
        <View
          style={[
            styles.button,
            buttonStyle,
          ]}
        >
          <Text
            style={[
              styles.buttonTitle,
              textStyle,
            ]}
          >
            {text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    zIndex: 100,
    // height: 30,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#DB4D5E',
    borderRadius: 21,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 12,
    paddingLeft: 12,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    // width: 88,
    // height: 28,
    shadowColor: '#102330',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
  buttonTitle: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default PhotoGivingButton;
