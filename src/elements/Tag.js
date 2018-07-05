import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

class Tag extends React.Component {
  render() {
    const {
      onPress,
      style,
      textStyle,
      text,
      withDelete,
    } = this.props;

    return (
      <TouchableHighlight style={[styles.container, style]} onPress={onPress} underlayColor="transparent">
        <View style={styles.tag}>
          <Text style={[styles.text, textStyle]}>
            {text}
          </Text>
          <Entypo
            name="cross"
            color="black"
            style={[styles.icon, !withDelete && { display: 'none' }]}
            size={16}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
    alignContent: 'center',
  },
  tag: {
    flexDirection: 'row',
    height: 20,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 4,
    paddingLeft: 4,
    backgroundColor: '#EBEBEB',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    alignContent: 'center',
    alignSelf: 'center',
    // justifyContent: 'center',
  },
  text: {
    // color: '#fff',
    alignSelf: 'center',
  },
  icon: {
    // backgroundColor: 'pink',
    alignSelf: 'center',
  },
});

export default Tag;
