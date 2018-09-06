import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ActionSheetIOS,
  Platform,
  Alert,
} from 'react-native';

import designLanguage from '../../designLanguage.json';

class SendButton extends React.Component {
  state = {
    isFollowing: this.props.isFollowing,
  }

  onPress = () => {
    let nextValue;
    if (typeof this.state.isFollowing === 'undefined') {
      nextValue = !this.props.isFollowing;
    } else {
      nextValue = !this.state.isFollowing;
    }

    if (nextValue) {
      this.setState({ isFollowing: nextValue });
      this.props.handleFollowButton(nextValue);
    } else {
      const isAndroid = Platform.OS === 'android';
      if (isAndroid) {
        Alert.alert(
          'フォローをやめます。',
          '本当によろしいですか？',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            {
              text: 'OK',
              onPress: () => {
                this.setState({ isFollowing: nextValue });
                this.props.handleFollowButton(nextValue);
              },
            },
          ],
          { cancelable: false },
        );
      } else {
        const options = ['キャンセル', 'フォローを外す'];
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options,
            destructiveButtonIndex: 1,
            cancelButtonIndex: 0,
          },
          (buttonIndex) => {
            if (buttonIndex === 1) {
              this.setState({ isFollowing: nextValue });
              this.props.handleFollowButton(nextValue);
            }
          },
        );
      }
    }
  }

  render() {
    const {
      style,
      buttonStyle,
      textStyle,
      show,
    } = this.props;

    if (!show) {
      return null;
    }

    let isFollowing;
    if (typeof this.state.isFollowing === 'undefined') {
      // eslint-disable-next-line
      isFollowing = this.props.isFollowing;
    } else {
      // eslint-disable-next-line
      isFollowing = this.state.isFollowing;
    }

    const text = isFollowing ? 'フォロー中' : 'フォロー';

    return (
      <TouchableHighlight style={[styles.container, style]} onPress={this.onPress} underlayColor="transparent">
        <View
          style={[
            styles.button,
            isFollowing && styles.followingButton,
            buttonStyle,
          ]}
        >
          <Text
            style={[
              styles.buttonTitle,
              isFollowing && styles.followingButtonTitle,
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
    // alignSelf: 'flex-start',
  },
  button: {
    backgroundColor: designLanguage.color400,
    borderRadius: 20,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 12,
    paddingLeft: 12,
    shadowColor: '#102330',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: 105,
    height: 28,
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

export default SendButton;
