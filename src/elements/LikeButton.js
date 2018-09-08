import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
// import { DangerZone } from 'expo';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import designLanguage from '../../designLanguage.json';

// const { Lottie } = DangerZone;

class LikeButton extends React.Component {
  state = {
    // animation: null,
  }

  componentWillMount() {
    // this.playAnimation();
  }

  // eslint-disable-next-line
  handleViewtRef = (ref) => {
    this.animationRef = ref;
  }

  onPress = () => {
    const { onPressButton, userLiked } = this.props;
    if (!userLiked) {
      this.animationRef.swing(600);
      // this.playAnimation();
    }
    onPressButton(!userLiked);
  }

  // playAnimation = () => {
  //   if (!this.state.animation) {
  //     this.loadAnimationAsync();
  //   } else {
  //     this.animation.reset();
  //     this.animation.play();
  //   }
  // };
  //
  // loadAnimationAsync = async () => {
  //   let result = await fetch(
  //     'https://cdn.rawgit.com/airbnb/lottie-react-native/635163550b9689529bfffb77e489e4174516f1c0/example/animations/TwitterHeart.json'
  //   )
  //     .then(data => {
  //       return data.json();
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  //   this.setState({ animation: result }, this.playAnimation);
  // };

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

    // const icon = this.state.animation ? (
    //   <View style={styles.heart}>
    //     <Lottie
    //       ref={animation => {
    //         this.animation = animation;
    //       }}
    //       style={{
    //         width: 40,
    //         height: 40,
    //         padding: 8,
    //       }}
    //       source={this.state.animation}
    //       loop={false}
    //     />}
    //   </View>
    // ) : (
    //   <TouchableHighlight
    //     onPress={this.onPress}
    //     underlayColor="transparent"
    //     style={styles.heart}
    //   >
    //     <Icon
    //       name={iconName}
    //       size={26}
    //       style={[styles.heart]}
    //       color={designLanguage.color600}
    //     />
    //   </TouchableHighlight>
    // );
    //
    // return (
    //   <View style={styles.likes}>
    //     {icon}
    //     <TouchableHighlight
    //       onPress={onPressNumber}
    //       underlayColor="transparent"
    //       style={styles.likesNumber}
    //     >
    //       <Text style={styles.likesNumberText}>
    //         {likes && likes.length}
    //       </Text>
    //     </TouchableHighlight>
    //   </View>
    // );

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
