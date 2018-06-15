import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import firebase from 'firebase';

import ListItem from '../components/ListItem.js';
import BackgroundImage from '../../assets/image/background/sample3.jpg';
import Header from '../components/Header.js';

class Schedule extends React.Component {
  state = {
    schedules: [],
  }

  componentDidMount() {
    this.fetchSchedules();
  }

  fetchSchedules = () => {
    const db = firebase.firestore();
    // const teams = { this.state.teams };
    const schedules = [];
    db.collection('matchSchedules').get().then((querySnapshot) => {
      // console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().name);
        schedules.push(doc.data());
      });
      console.log(schedules);
      this.setState({ schedules });
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    return (
      <ListItem
        onPress={() => {
          this.props.navigation.navigate({
            routeName: 'Match',
            params: item,
          });
        }}
        text={item.date.toString()}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          onPressLeft={() => { this.props.navigation.navigate({ routeName: 'MyPageFun' }); }}
          onPressRight={() => { this.props.navigation.navigate({ routeName: 'Nortification' }); }}
          headerTitle="Match Schedule"
        />
        <Image
          style={styles.bgImage}
          // source={this.state.backgroundImage}
          source={BackgroundImage}
          resizeMode="cover"
        />
        <View style={styles.feedArea}>
          <FlatList
            data={this.state.schedules}
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
