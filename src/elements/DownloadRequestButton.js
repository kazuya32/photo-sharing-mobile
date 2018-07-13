import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

class DownloadRequestButton extends React.Component {
  onPress = () => {
    const { isPending, onPress } = this.props;
    if (!isPending) { onPress(); }
  }

  render() {
    const {
      style,
      buttonStyle,
      textStyle,
      hasAccess,
      isPending,
      isMyPage,
    } = this.props;

    const text = isPending ? 'リクエスト送信済み' : 'ダウンロードリクエスト';

    return (
      <TouchableHighlight
        style={[
          styles.container,
          style,
          (hasAccess || isMyPage) && { display: 'none' },
        ]}
        onPress={this.onPress}
        underlayColor="transparent"
      >
        <View
          style={[
            styles.button,
            isPending && styles.followingButton,
            buttonStyle,
          ]}
        >
          <Text
            style={[
              styles.buttonTitle,
              isPending && styles.followingButtonTitle,
              textStyle,
            ]}
          >
            {text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: 30,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#DB4D5E',
    borderRadius: 21,
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 12,
    paddingLeft: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    // width: 88,
    // height: 28,
    borderColor: '#DB4D5E',
    borderWidth: 1,
  },
  followingButton: {
    backgroundColor: '#fff',
    shadowColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonTitle: {
    color: '#fff',
    alignSelf: 'center',
  },
  followingButtonTitle: {
    color: 'black',
  },
});

export default DownloadRequestButton;
