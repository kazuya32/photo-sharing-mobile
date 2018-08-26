import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

import ActionSheetItem from '../elements/ActionSheetItem.js';

class ActionSheet extends React.Component {
  state = {
    options: this.props.options,
  }
  // componentWillMount() {
  //   const option = {
  //     title: 'テスト',
  //     onPress: this.props.onPressCancel,
  //     cancel: false,
  //     destructive: false,
  //   };
  //
  //   const options = [option, option];
  //   this.setState({ options });
  // }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ index, item }) => (
    <ActionSheetItem
      style={styles.button}
      onPress={() => {
        item.onPress();
        this.props.onPressCancel();
      }}
      title={item.title}
      cancel={item.cancel}
      destructive={item.destructive}
      border
      top={index === 0}
      bottom={index === (this.state.options.length - 1)}
    />
  );

  render() {
    const {
      onPressCancel,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.sheet}>
          <FlatList
            listKey="ActionSheet"
            data={this.state.options}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </View>
        <ActionSheetItem
          style={styles.cancelbutton}
          onPress={onPressCancel}
          title="キャンセル"
          cancel
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  sheet: {
    width: '100%',
    marginBottom: 8,
    borderRadius: 12,
  },
  button: {
  },
  cancelbutton: {
    borderRadius: 12,
  },
});

export default ActionSheet;
