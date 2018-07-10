import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Text,
} from 'react-native';

class PhotoCollection extends React.Component {
  state = {
    photos: this.props.photos,
    logInUser: this.props.logInUser,
  }


  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate({
          routeName: 'PhotoDetail',
          params: {
            photo: item,
            logInUser: this.state.logInUser,
          },
        });
      }}
    >
      <Image
        style={styles.photoItem}
        source={{ uri: item.data.downloadURL }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );


  render() {
    if (!this.state.photos || !this.state.photos.length) {
      return (
        <Text style={styles.alert}>
           投稿画像はありません.
        </Text>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.photos}
          renderItem={this.renderItem}
          numColumns={3}
          // horizontal={true}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 70,
  },
  photoItem: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderWidth: 1,
    borderColor: '#fff',
  },
  alert: {
    padding: 16,
    // alignSelf: 'center',
  },
});

export default PhotoCollection;
