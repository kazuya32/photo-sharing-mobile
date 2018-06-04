import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

import { Avatar } from 'react-native-elements';

import SendButton from '../elements/SendButton';
import HeartIcon from '../../assets/icon/valentines-heart-white.png';

class LoginScreen extends React.Component {
  state = {
    photo: require('../../assets/image/athlete/sample3.jpg'),
    likes: 1919,
    userName: 'YoSasaki',
    comment: ''
  }

  onPressTest() {
    Alert.alert('button pressed')
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.photo}
          source={this.state.photo}
          resizeMode="cover"
        />
        <View style={styles.bar}>
          <View style={styles.likes}>
            <Image
              style={styles.heart}
              source={HeartIcon}
            />
            <Text style={styles.likesNumber}>
              {this.state.likes}
            </Text>
          </View>
          <View style={styles.userItem}>
            <Text style={styles.userBy}>
              by
            </Text>
            <TouchableHighlight onPress={this.onPressTest} underlayColor="transparent">
              <Text style={styles.userName}>
                {this.state.userName}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.inputBar}>
          <Avatar
            size="small"
            rounded
            title="YS"
            onPress={this.onPressTest}
            activeOpacity={0.7}
          />
          <TextInput
            style={styles.input}
            value={ this.state.comment }
            onChangeText={(text) => { this.setState({ pass: text }); }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="コメントを書く"
            returnKeyType="send"
            multiline={false}
            numberOfLines={2}
          />
          <SendButton onPress={this.onPressTest}>
            投稿
          </SendButton>
        </View>
        <View style={styles.commentItem}>
          <Avatar
            size="small"
            rounded
            title="DO"
            onPress={this.onPressTest}
            activeOpacity={0.7}
          />
          <View style={styles.commentBox}>
            <Text style={styles.commentText}>
              いい写真ですね！サインしますので僕に送ってください！
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  photo: {
    alignSelf: 'center',
    height: '60%',
    marginTop: 12,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  likes: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  likesNumber: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  heart: {
  },
  userItem: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  userBy: {
    marginRight: 4,  
  },
  userName: {
    color: '#DB4D5E',
  },
  inputBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  input: {
    flex: 1,
    alignSelf: 'center',
    height: 34, // avatar heigh
    padding: 10,
    marginLeft: 12,
    borderColor: '#F9FAFC',
    borderWidth: 2,
    borderRadius: 21,
  },
  commentItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 12,
  },
  commentBox: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignSelf: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 12,
    // borderColor: '#F9FAFC',
    // borderWidth: 2,
    borderRadius: 21,
  },
  commentText: {
    alignSelf: 'center',
    padding: 10,
  },
});

export default LoginScreen;
