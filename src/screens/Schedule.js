import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import firebase from 'firebase';

import ListItem from '../components/ListItem.js';
import BackgroundImage from '../../assets/image/background/sample1.jpg';
import Header from '../components/Header.js';

class Schedule extends React.Component {
  state = {
    logInUser: this.props.navigation.state.params && this.props.navigation.state.params.logInUser,
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
        schedules.push({ id: doc.id, data: doc.data() });
      });
      this.setState({ schedules });
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <ListItem
      onPress={() => {
        this.props.navigation.navigate({
          routeName: 'Match',
          params: {
            id: item.id,
            data: item.data,
            logInUser: this.state.logInUser,
          },
        });
      }}
      text={item.data.date.toDateString()}
    />
  );

  render() {
    if (!this.state.schedules) {
      return (
        <View style={styles.container}>
          <Header
            navigation={this.props.navigation}
            logInUser={this.state.logInUser}
            headerTitle="Match Schedule"
          />
          <View style={{ flex: 1, padding: 100, alignSelf: 'center' }}>
            <ActivityIndicator />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Header
          headerTitle="Match Schedule"
          navigation={this.props.navigation}
          logInUser={this.state.logInUser}
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
            renderItem={this.renderItem}
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
    paddingTop: 80,
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
