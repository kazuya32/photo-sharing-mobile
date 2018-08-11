import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

import PenTile from '../elements/PenTile.js';

class PenSelector extends React.Component {
  state = {
    pens: [
      { width: 20, iconName: 'grease-pencil' },
      { width: 5, iconName: 'lead-pencil' },
    ],
    selectedWidth: this.props.selectedWidth,
  }

  onPress = (width) => {
    this.props.onPress(width);
    this.setState({ selectedWidth: width });
  }


  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <PenTile
      iconName={item.iconName}
      onPress={() => { this.onPress(item.width); }}
      selected={(item.width === this.state.selectedWidth)}
    />
  );

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <FlatList
          data={this.state.pens}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 134,
  },
});

export default PenSelector;
