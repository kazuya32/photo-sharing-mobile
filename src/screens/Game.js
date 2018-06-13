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
import BackgroundImage from '../../assets/image/stadium/sample.jpg';

class Game extends React.Component {
  state = {
    data: [
      { home: 'ジェフ千葉', away: 'コンサドーレ札幌' },
      { home: 'ガンバ大阪', away: 'セレッソ大阪' },
      { home: 'FC東京', away: '湘南ベルマーレ' },
      { home: '柏レイソル', away: '水戸ホーリーホック' },
      { home: '名古屋グランパス', away: 'レノファ山口' },
    ],
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    const text = item.home + ' vs ' + item.away;

    return (
      <ListItem
        onPress={() => {
          this.props.navigation.navigate({
            routeName: 'Home',
          });
        }}
        text={text}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          onPressLeft={() =>  { this.props.navigation.navigate({ routeName: 'MyPageFun' }); }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle="FLEGO"
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
    opacity: 0.8,
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

export default Game;
