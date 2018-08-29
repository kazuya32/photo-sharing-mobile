import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class LikeButton extends React.Component {
  render() {
    const {
      onPressButton,
      onPressNumber,
      likes,
      userLiked,
      show,
    } = this.props;

    if (!show) {
      return null;
    }

    const iconName = userLiked ? 'heart' : 'heart-outline';

    return (
      <View style={styles.likes}>
        <TouchableHighlight
          onPress={() => { onPressButton(!userLiked); }}
          underlayColor="transparent"
          style={styles.heart}
        >
          <Icon
            name={iconName}
            size={26}
            style={[styles.heart]}
            color="#D0364C"
          />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={onPressNumber}
          underlayColor="transparent"
          style={styles.likesNumber}
        >
          <Text style={styles.likesNumberText}>
            {likes && likes.length}
          </Text>
        </TouchableHighlight>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  heart: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  likes: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  likesNumber: {
    paddingLeft: 12,
    paddingRight: 32,
    // paddingBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likesNumberText: {
    fontSize: 18,
  },
});

export default LikeButton;
