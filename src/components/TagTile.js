import React from 'react';
import {
  // Platform,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

import Tag from '../elements/Tag.js';

class TagTile extends React.Component {
  state = {
  }

  componentWillMount() {
    const {
      tags,
    } = this.props;
    if (tags) {
      this.makeTagArray(tags);
    }
  }

  makeTagArray = (tags) => {
    const tagArray = [];
    Object.entries(tags).map(([key, value]) => {
      if (value) {
        tagArray.push(key);
      }
    });
    this.setState({ tags: tagArray });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <Tag
      // onPress={() => { this.deleteTag(item); }}
      text={item}
    />
  );

  // shouldComponentUpdate(nextProps) {
  //   return Platform.OS !== 'ios' || this.props.value === nextProps.value;
  // }

  render() {
    const {
      // setter,
      // onBlur,
      style,
      // tags,
    } = this.props;

    if (!(this.state.tags && this.state.tags.length)) {
      return null;
    }

    return (
      <View style={[styles.container, style]}>
        <FlatList
          data={this.state.tags}
          extraData={this.state}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          style={styles.tags}
          // horizontal
          numColumns={3}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignContent: 'center',
  },
  tags: {
    width: '100%',
    alignContent: 'center',
  },
});

export default TagTile;
