import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

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
    this.setState({ isFollowing: nextValue });
    this.props.handleFollowButton(nextValue);
  }

  render() {
    const {
      style,
      buttonStyle,
      textStyle,
      // isFollowing,
    } = this.props;

    let isFollowing;
    if (typeof this.state.isFollowing === 'undefined') {
      // eslint-disable-next-line
      isFollowing = this.props.isFollowing;
    } else {
      // eslint-disable-next-line
      isFollowing = this.state.isFollowing;
    }

    const text = isFollowing ? 'Following' : 'Follow';

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
    backgroundColor: '#DB4D5E',
    borderRadius: 20,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 12,
    paddingLeft: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: 88,
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