import React from 'react';
import {
  // Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';

class EditItem extends React.Component {
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
      // onBlur,
      onChangeText,
      title,
      maxLength,
      style,
    } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.title}>
          {title}
        </Text>
        <TextInput
          style={styles.input}
          title={title}
          value={this.state.value}
          onChangeText={(value) => {
            this.setState({ value });
            onChangeText(value);
          }}
          // onBlur={() => { onChangeText(this.state.value); }}
          autoCapitalize="none"
          autoCorrect={false}
          multiline={false}
          maxLength={maxLength}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontSize: 12,
    paddingTop: 12,
    paddingBottom: 12,
    color: '#AAAAAA',
  },
  input: {
    fontSize: 16,
    borderColor: '#808080',
    // color: '#808080',
    color: 'black',
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
});

export default EditItem;
