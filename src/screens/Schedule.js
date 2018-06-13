import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';

import ListItem from '../components/ListItem.js';
import BackgroundImage from '../../assets/image/stadium/sample3.jpg';
import Header from '../components/Header.js';

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
      <ListItem
        onPress={() => {
          this.props.navigation.navigate({
            routeName: 'Game',
            params: item,
          });
        }}
        text={item.date}
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

export default Schedule;
