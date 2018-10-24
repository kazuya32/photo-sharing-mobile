import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

import designLanguage from '../../designLanguage.json';
import ColorTile from '../elements/ColorTile.js';

class ColorPanel extends React.Component {
  state = {
    colors: [
      '#FFFFFF', // white
      '#F7B42E', // trnspt yellow
      designLanguage.color300, // flego color
      designLanguage.colorPrimary, // lyft pink
      '#1DE1D5', // tiktok sky blue
      '#0A5EA2', // linkdin blue
      // '#000000', // black
    ],
    selectedColor: this.props.selectedColor.replace(/0x/g, '#'),
  }

  onPress = (color) => {
    this.props.onPress(color);
    this.setState({ selectedColor: color });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <ColorTile
      color={item}
      dia={36}
      onPress={() => { this.onPress(item); }}
      selected={(item === this.state.selectedColor)}
    />
  );

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <FlatList
          data={this.state.colors}
          renderItem={this.renderItem}
          horizontal
          keyExtractor={this.keyExtractor}
          extraData={this.state}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: 52,
  },
});

export default ColorPanel;
