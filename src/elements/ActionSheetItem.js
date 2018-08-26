import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

class ActionSheet extends React.Component {
  state = {}

  render() {
    const {
      onPress,
      title,
      cancel,
      destructive,
      style,
      border,
      top,
      bottom,
    } = this.props;

    return (
      <TouchableHighlight
        style={[
          styles.button,
          (border && !bottom) && { borderColor: '#E7E7E9', borderBottomWidth: 1 },
          style,
          top && styles.top,
          bottom && styles.bottom,
        ]}
        onPress={onPress}
        underlayColor="transparent"
      >
        <Text
          style={[
            styles.title,
            cancel && { fontWeight: '500' },
            destructive && { color: '#FB2327' },
          ]}
        >
          {title}
        </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    width: '95%',
    backgroundColor: '#fff',
    alignItems: 'center',
    opacity: 0.9,
    alignSelf: 'center',
    // borderColor: '#E7E7E9',
    // borderWidth: 1,
  },
  title: {
    fontSize: 20,
    color: '#0A60FF',
    // color: "#1F70FF",
  },
  top: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  bottom: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export default ActionSheet;
