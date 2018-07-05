import React from 'react';
import {
  // Platform,
  StyleSheet,
  View,
  TextInput,
  FlatList,
} from 'react-native';

import Tag from '../elements/Tag.js';

class TagBox extends React.Component {
  state = {
    tags: [],
    text: '',
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.value !== nextState.value) {
      return false;
    }

    return true;
  }

  keyExtractor = (item, index) => index.toString();

  addTag = () => {
    const { setter } = this.props;
    const { tags } = this.state;
    tags.push(this.state.text);
    const text = '';
    this.setState({ tags, text });
    setter(tags);
    console.log(tags);
    // this._textInput.setNativeProps({text: ''});
    this.attendee.setNativeProps({ text: ' ' });
    // this.attendee.clear();
  };

  deleteTag = (text) => {
    const { setter } = this.props;
    const { tags } = this.state;
    this.setState({ tags, text });
    const index = tags.indexOf(text);

    if (index >= 0) {
      tags.splice(index, 1);
    }

    setter(tags);
    console.log(tags);
  };

  renderItem = ({ item }) => (
    <Tag
      onPress={() => { this.deleteTag(item); }}
      text={item}
      withDelete
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
      value,
      maxLength,
      placeholder,
    } = this.props;

    return (
      <View style={[styles.container, style]}>
        <TextInput
          // ref={component => this._textInput = component}
          ref={(element) => { this.attendee = element; }}
          style={[styles.input]}
          value={value}
          onChangeText={(text) => { this.setState({ text }); }}
          onBlur={this.addTag}
          autoCapitalize="none"
          autoCorrect={false}
          // multiline
          // textShadowColor="gray"
          maxLength={maxLength}
          placeholder={placeholder}
        />
        <FlatList
          data={this.state.tags}
          extraData={this.state}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          style={styles.tags}
          // horizontal
          numColumns={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    width: '100%',
    // height: '100%',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 16,
    color: '#808080',
  },
  tags: {
    width: '100%',
    // height: '100%',
    paddingLeft: 8,
    paddingRight: 8,
    flexWrap: 'wrap',
    // backgroundColor: 'blue',
  },
});

export default TagBox;
