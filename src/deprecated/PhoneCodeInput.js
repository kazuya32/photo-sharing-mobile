import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  View,
} from 'react-native';

import CodeInput from 'react-native-confirmation-code-input';

class PhoneCodeInput extends React.Component {
  state = {
  }

  componentWillMount() {

  }

  render() {
    const {
      style,
      show,
      codeLength,
      onFulfill,
    } = this.props;

    if (!show) { return null; }

    return (
      <CodeInput
        containerStyle={[styles.container, style]}
        // ref="codeInputRef2"
        keyboardType="numeric"
        codeLength={codeLength}
        className="border-circle"
        autoFocus={false}
        codeInputStyle={{ fontWeight: '800' }}
        onFulfill={(isValid, code) => onFulfill(isValid, code)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    // alignSelf: 'center',
    // margin: 16,
    backgroundColor: '#fff',
  },
  text: {
    margin: 16,
    flex: 1,
    fontSize: 16,
  },
  footer: {
    // position: 'absolute',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#C4C4C4',
    // paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 0,
    height: 80,
  },
});

export default PhoneCodeInput;
