import React from 'react';
import {
  StyleSheet,
  Modal,
  // TouchableHighlight,
  Platform,
} from 'react-native';
import { BlurView } from 'expo';

import ActionSheetBody from '../components/ActionSheetBody.js';

class ActionSheet extends React.Component {
  state = {
    childModalVisible: false,
  }

  setChildModalVisible(visible) {
    this.setState({ childModalVisible: visible });
  }

  render() {
    const {
      visible,
      setModalVisible,
      options,
    } = this.props;

    const isAndroid = Platform.OS === 'android';

    const tint = 'dark';
    const intensity = 30;

    return (
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        onShow={() => {
          this.setChildModalVisible(true);
        }}
      >
        <BlurView tint={tint} intensity={intensity} style={styles.blur}>
          <Modal
            animationType="slide"
            transparent
            visible={this.state.childModalVisible}
            onRequestClose={() => setModalVisible(false)}
            onDismiss={() => setModalVisible(false)}
          >
            <ActionSheetBody
              // style={styles.container}
              options={options}
              onPressCancel={() => {
                if (isAndroid) { setModalVisible(false); }
                this.setChildModalVisible(false);
              }}
            />
          </Modal>
        </BlurView>
      </Modal>
    );
  }
}

// <TouchableHighlight
//   onPress={this.onPressCancel}
//   underlayColor="transparent"
// >
// </TouchableHighlight>

const styles = StyleSheet.create({
  blur: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 32,
  },
  sheet: {
  },
  cancelButton: {
    padding: 12,
    borderRadius: 12,
    width: '95%',
    backgroundColor: '#fff',
    alignItems: 'center',
    opacity: 0.9,
  },
  cancelButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'blue',
  },
});

export default ActionSheet;
