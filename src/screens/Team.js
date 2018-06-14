import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';

import Header from '../components/Header.js';
import ListItem from '../components/ListItem.js';
import BackgroundImage from '../../assets/image/background/sample7.jpg';

class Team extends React.Component {
  state = {
    data: [
      { name: 'ジェフ千葉' },
      { name: 'ガンバ大阪' },
      { name: 'FC東京' },
      { name: 'レノファ山口' },
      { name: '名古屋グランパス' },
    ],
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    return (
      <ListItem
        onPress={() => {
          this.props.navigation.navigate({
            routeName: 'Home',
          });
        }}
        text={item.name}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          onPressLeft={() =>  { this.props.navigation.navigate({ routeName: 'MyPageFun' }); }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle="Team"
        />
        <Image
          style={styles.bgImage}
          // source={this.state.backgroundImage}
          source={BackgroundImage}
          resizeMode="cover"
        />
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
    paddingTop: 70,
  },
  bgImage: {
    opacity: 0.9,
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  feedArea: {
    marginTop: 12,
    marginBottom: 12,
  },
});

export default Team;
