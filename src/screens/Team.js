import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import firebase from 'firebase';

import Header from '../components/Header.js';
import ListItem from '../components/ListItem.js';
// import BackgroundImage from '../../assets/image/background/sample7.jpg';
import BackgroundImage from '../../assets/image/background/sample3.jpg';

class Team extends React.Component {
  state = {
    teams: [],
  }

  componentDidMount() {
    this.fetchTeams();
  }

  fetchTeams = () => {
    const db = firebase.firestore();
    // const teams = { this.state.teams };
    const teams = [];
    db.collection('teams').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        teams.push({ id: doc.id, data: doc.data() });
      });
      this.setState({ teams });
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    return (
      <ListItem
        onPress={() => {
          this.props.navigation.navigate({
            routeName: 'Feed',
            params: {
              feedType: 'team',
              itemId: item.id,
            },
          });
        }}
        text={item.data.name}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          onPressLeft={() => { this.props.navigation.navigate({ routeName: 'MyPageFun' }); }}
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
            data={this.state.teams}
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

export default Team;
