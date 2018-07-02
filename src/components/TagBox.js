import React from 'react';
import {
  // Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';

class TagBox extends React.Component {
  state = { value: this.props.value }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.value !== nextState.value) {
      return false;
    }

    return true;
  }

  // shouldComponentUpdate(nextProps) {
  //   return Platform.OS !== 'ios' || this.props.value === nextProps.value;
  // }

  render() {
    const {
      onChangeText,
      // onBlur,
      value,
      maxLength,
      placeholder,
    } = this.props;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(text) => { onChangeText(text); }}
          // onBlur={() => { console.log(this.state.value); }}
          autoCapitalize="none"
          autoCorrect={false}
          multiline={false}
          maxLength={maxLength}
          placeholder={placeholder}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 8,
    paddingRight: 8,
  },
  input: {
    fontSize: 16,
    color: '#808080',
    paddingBottom: 4,
  },
});

export default TagBox;
