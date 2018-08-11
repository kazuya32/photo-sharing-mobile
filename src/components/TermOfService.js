import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  View,
} from 'react-native';

import TEXT from '../../TermOfService.json';
import SaveButton from '../elements/SaveButton.js';
import CancelButton from '../elements/CancelButton.js';

class TermOfService extends React.Component {
  state = {
    // eslint-disable-next-line
    isAgreed: false,
    isUploading: false,
  }

  componentWillMount() {

  }

  render() {
    const { style, onPressDisagree, onPressAgree } = this.props;

    return (
      <ScrollView
        style={[styles.container, style]}
      >
        <Text style={styles.text}>
          {TEXT.text}
        </Text>
        <View style={styles.footer}>
          <CancelButton
            onPress={onPressDisagree}
            style={{ marginRight: 12 }}
          >
            同意しない
          </CancelButton>
          <SaveButton
            onPress={() => {
              if (!this.state.isUploading) { onPressAgree(); }
            }}
          >
            同意
          </SaveButton>
        </View>
      </ScrollView>
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

export default TermOfService;
