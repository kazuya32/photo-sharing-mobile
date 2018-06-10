import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Alert,
  FlatList,
} from 'react-native';

import PhotoTile from '../components/PhotoTile.js';

class Home extends React.Component {
  state = {
    data: [
      { likes: 32, userName: 'sasaki', source: require('../../assets/image/athlete/naoya_kondo.jpg') },
      { likes: 32, userName: 'sasaki', source: require('../../assets/image/athlete/masaki_yamamoto.jpg') },
      { likes: 32, userName: 'sasaki', source: require('../../assets/image/athlete/takayuki_funayama.jpg') },
      { likes: 32, userName: 'sasaki', source: require('../../assets/image/athlete/yuya_sato.jpg') },
      { likes: 32, userName: 'sasaki', source: require('../../assets/image/athlete/yushi_mizobuchi.jpg') },
    ],
  }

  onPressTest() {
    Alert.alert('button pressed')
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.navigation.navigate({
            routeName: 'PhotoDetail',
            params: item,
          });
        }}
        underlayColor="transparent"
      >
        <PhotoTile
          photo={item.source}
          likes={item.likes}
          userName={item.userName}
          onPressUser={this.onPressTest}
          photoStyle={styles.photoItem}
        />
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.feedArea}>
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={this.keyExtractor}
          />
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
  feedArea: {
    marginTop: 12,
    marginBottom: 12,
  },
  photoItem: {
    // width: Dimensions.get('window').width / 3,
    // height: Dimensions.get('window').width / 3,
  },
});

export default Home;
