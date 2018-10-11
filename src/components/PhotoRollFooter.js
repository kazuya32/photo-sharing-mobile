import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import designLanguage from '../../designLanguage.json';

class PhotoRollFooter extends React.Component {
  state = {
  }

  componentWillMount() {
  }

  render() {
    const {
      onPressBack,
      onPressFastBack,
      onPressNext,
      onPressFastNext,
      style,
    } = this.props;

    return (
      <View style={[styles.container, style]}>
        <TouchableHighlight
          onPress={onPressFastBack}
          style={[
            styles.button,
            { backgroundColor: designLanguage.color100 },
          ]}
          underlayColor="transparent"
        >
          <Icon name="step-backward-2" size={24} style={[styles.buttonText, { color: designLanguage.color300 }]} />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={onPressBack}
          style={[
            styles.button,
            { backgroundColor: designLanguage.color100 },
          ]}
          underlayColor="transparent"
        >
          <Icon name="step-backward" size={24} style={[styles.buttonText, { color: designLanguage.color300 }]} />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={onPressNext}
          style={[
            styles.button,
            { backgroundColor: designLanguage.color300 },
          ]}
          underlayColor="transparent"
        >
          <Icon name="step-forward" size={24} style={[styles.buttonText, { color: designLanguage.color100 }]} />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={onPressFastNext}
          style={[
            styles.button,
            { backgroundColor: designLanguage.color300 },
          ]}
          underlayColor="transparent"
        >
          <Icon name="step-forward-2" size={24} style={[styles.buttonText, { color: designLanguage.color100 }]} />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    // fontSize: 24,
    fontWeight: '500',
    color: '#fff',
  },
});

export default PhotoRollFooter;
