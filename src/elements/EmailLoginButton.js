import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class EmailLoginButton extends React.Component {
  render() {
    const {
      onPress,
      style,
      title,
    } = this.props;

    return (
      <TouchableHighlight style={[style]} onPress={onPress} underlayColor="transparent">
        <View style={[styles.container, styles.shadow, style]}>
          <Icon
            color="#fff"
            name="email"
            size={24}
          />
          <View style={[styles.buttonTitle]}>
            <Text
              style={[
                styles.title,
              ]}
            >
              {title}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#DB4D5E',
    borderRadius: 30,
    paddingTop: 14,
    paddingBottom: 14,
    paddingRight: 16,
    paddingLeft: 16,
    width: Dimensions.get('window').width * 0.8,
    marginTop: 12,
    marginBottom: 12,
  },
  shadow: {
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  buttonTitle: {
    marginLeft: 15,
    width: 150,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EmailLoginButton;
