import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';

import { Avatar } from 'react-native-elements';

import SendButton from '../elements/SendButton';
import PhotoTile from '../components/PhotoTile';

class LoginScreen extends React.Component {
  state = {
    likes: 1919,
    userName: 'YoSasaki',
    comment: '',
  }

  onPressTest() {
    Alert.alert('button pressed')
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <PhotoTile
          photo={this.props.navigation.state.params.source}
          likes={this.state.likes}
          userName={this.state.userName}
          onPressUser={this.onPressTest}
          photoStyle={styles.photo}
        />
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
            value={this.state.comment}
            onChangeText={(text) => { this.setState({ comment: text }); }}
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  photo: {
    marginTop: 12,
    height: Dimensions.get('window').height * 0.6,
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
