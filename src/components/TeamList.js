import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';

import TeamItem from '../components/TeamItem.js';

class TeamList extends React.Component {
  state = {
    teams: [],
    numColumns: 1,
  }

  componentDidMount() {
    this.fetchTeams();
  }

  fetchTeams = () => {
    const db = firebase.firestore();
    // const teams = { this.state.teams };
    const teams = [];
    const { league } = this.props;

    db.collection('teams').where('league', '==', league).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          teams.push({ id: doc.id, data: doc.data() });
        });
        this.setState({ teams });
      });
  }

  sortNameAsc = (array) => {
    array.sort((a, b) => (a.data.name - b.data.name));
    // array.reverse();
    return array;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <TeamItem
      team={item}
      numColumns={this.state.numColumns}
      onPress={() => { this.props.onPressTeam(item); }}
    />
  )

  render() {
    if (!this.state.teams) {
      return (
        <View style={styles.container}>
          <View style={{ flex: 1, padding: 100, alignSelf: 'center' }}>
            <ActivityIndicator />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.feedArea}>
          <FlatList
            data={this.sortNameAsc(this.state.teams)}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            numColumns={this.state.numColumns}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedArea: {
    marginTop: 12,
    marginBottom: 12,
  },
});

export default TeamList;
