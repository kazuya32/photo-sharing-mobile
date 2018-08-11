import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';

// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class ColorTile extends React.Component {
  render() {
    const {
      onPress,
      color,
      dia,
      selected,
      style,
    } = this.props;

    const borderWidth = this.props.borderWidth || 2;
    const borderColor = this.props.borderColor || '#fff';
    // const borderColor = (color === '#000000') ? 'black' : '#fff';

    return (
      <TouchableHighlight
        style={[
          styles.container,
          { width: dia, height: dia, borderRadius: dia * 0.5 },
          style,
        ]}
        onPress={onPress}
        underlayColor="transparent"
      >
        <View>
          <View
            style={[
              styles.tile,
              { backgroundColor: color },
              { width: dia, height: dia, borderRadius: dia * 0.5 },
              selected && { borderWidth, borderColor },
              selected && styles.shadow,
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
    margin: 8,
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

export default ColorTile;
