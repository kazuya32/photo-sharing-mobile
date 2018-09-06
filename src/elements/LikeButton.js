import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import designLanguage from '../../designLanguage.json';

class LikeButton extends React.Component {
  // eslint-disable-next-line
  handleViewtRef = (ref) => {
    this.animationRef = ref;
  }

  onPress = () => {
    const { onPressButton, userLiked } = this.props;
    if (!userLiked) {
      this.animationRef.swing(600);
    }
    onPressButton(!userLiked);
  }

  render() {
    const {
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
      <Animatable.View
        ref={this.handleViewtRef}
      >
        <View style={styles.likes}>
          <TouchableHighlight
            onPress={this.onPress}
            underlayColor="transparent"
            style={styles.heart}
          >
            <Icon
              name={iconName}
              size={26}
              style={[styles.heart]}
              color={designLanguage.color600}
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
      </Animatable.View>
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
