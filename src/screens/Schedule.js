import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  FlatList,
} from 'react-native';

class Schedule extends React.Component {
  state = {
    data: [
      { date: Date() },
      { date: Date() },
      { date: Date() },
      { date: Date() },
      { date: Date() },
    ],
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.navigation.navigate({
            routeName: 'Game',
            params: item,
          });
        }}
        underlayColor="transparent"
      >
        <Text style={styles.scheduleItem}>
          {item.date}
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

export default Schedule;
