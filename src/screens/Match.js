import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import firebase from 'firebase';

import Header from '../components/Header.js';
import ListItem from '../components/ListItem.js';
import BackgroundImage from '../../assets/image/background/sample1.jpg';

class Match extends React.Component {
  state = {
    logInUser: this.props.navigation.state.params && this.props.navigation.state.params.logInUser,
    matches: [],
  }

  componentDidMount() {
    this.fetchMatches();
  }

  fetchMatches = () => {
    const { id, data } = this.props.navigation.state.params;
    const db = firebase.firestore();
    const matches = [];

    const matchRef = db.collection(`matchSchedules/${id}/matches`)
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       matches.push({ id: doc.id, data: doc.data() });
    //     });
    //     this.setState({ matches });
    //   });
    // const matchRef = db.collection('matches')
    //   .where('date', '==', this.state.uid);

    matchRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          matches.push({ id: doc.id, data: doc.data() });
        });
        this.setState({ matches });
      });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <ListItem
      onPress={() => {
        this.props.navigation.navigate({
          routeName: 'MatchFeed',
          params: {
            feedType: 'match',
            itemId: item.id,
            logInUser: this.state.logInUser,
            // scheduleId: this.props.navigation.state.params.id,
          },
        });
      }}
      text={`${item.data.home.teamName} vs ${item.data.away.teamName}`}
    />
  );

  render() {
    if (!this.state.matches) {
      return (
        <View style={styles.container}>
          <Header
            navigation={this.props.navigation}
            logInUser={this.state.logInUser}
            headerTitle="Match"
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
          headerTitle="Match"
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
            data={this.state.matches}
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

export default Match;
