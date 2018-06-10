import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  FlatList,
} from 'react-native';

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
          {item.name}
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

export default Team;
