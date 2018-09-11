import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class EmailLoginButton extends React.Component {
  render() {
    const {
      onPress,
      style,
      title,
      show,
    } = this.props;

    if (!show) { return null; }

    return (
      <TouchableHighlight style={[style]} onPress={onPress} underlayColor="transparent">
        <View style={[styles.container, styles.shadow, style]}>
          <Icon
            color="#fff"
            name="facebook"
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
    backgroundColor: '#3b5998',
    borderRadius: 30,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
    paddingLeft: 16,
    width: Dimensions.get('window').width * 0.8,
    marginTop: 16,
    marginBottom: 16,
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
