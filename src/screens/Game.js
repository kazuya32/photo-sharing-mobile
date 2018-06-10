import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  FlatList,
} from 'react-native';

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
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.navigation.navigate({
            routeName: 'Home',
            params: item,
          });
        }}
        underlayColor="transparent"
      >
        <Text style={styles.scheduleItem}>
          {item.home} vs {item.away}
        </Text>
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
  scheduleItem: {
    margin: 12,
    borderColor: '#EBEBEB',
    borderBottomWidth: 3,
    borderRadius: 21,
  },
});

export default Game;
