import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class PenTile extends React.Component {
  render() {
    const {
      onPress,
      iconName,
      selected,
    } = this.props;

    const borderWidth = this.props.borderWidth || 2;
    const color = selected ? 'white' : 'white';
    const size = selected ? 36 : 24;
    const dia = selected ? 36 : 24;

    return (
      <TouchableHighlight
        style={[
          styles.container,
          selected && { borderBottomWidth: borderWidth, borderBottomColor: color },
        ]}
        onPress={onPress}
        underlayColor="transparent"
      >
        <View>
          <Icon
            color={color}
            name={iconName}
            size={size}
            style={[
              styles.tile,
            ]}
          />
          <View
            style={[
              styles.innerTile,
              { width: dia - 4, height: dia - 4, borderRadius: (dia - 4) * 0.5 },
              (selected && color === '#FFFFFF') && { borderWidth: 2, borderColor: 'black', zIndex: 30 },
            ]}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingBottom: 6,
    marginLeft: 20,
    marginRight: 20,
    alignContent: 'center',
    alignSelf: 'center',
    // width: 60,
  },
  tile: {
  },
  innerTile: {
    position: 'absolute',
    alignSelf: 'center',
    top: 2,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});

export default PenTile;
