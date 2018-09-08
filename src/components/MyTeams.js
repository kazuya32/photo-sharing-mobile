import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

import designLanguage from '../../designLanguage.json';
import TeamItem from '../components/TeamItem.js';

class MyTeams extends React.Component {
  state = {
    numColumns: 1,
  }

  // componentDidMount() {
  //   if (this.props.teams) {
  //     this.makeListFromObject(this.props.teams);
  //   }
  // }

  // eslint-disable-next-line
  makeListFromObject = (obj) => {
    const array = [];
    Object.keys(obj).forEach((prop) => {
      if (obj[prop]) {
        array.push(prop);
      }
    });
    return array;
    // this.setState({ temas: array });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <TeamItem
      teamId={item}
      numColumns={this.state.numColumns}
      // onPress={this.addTeam}
      style={styles.myTeam}
    />
  )

  render() {
    if (!(this.props.teams && this.props.teams.length)) {
      return null;
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.teams}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          numColumns={this.state.numColumns}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  myTeam: {
    marginTop: 8,
    marginBottom: 16,
    borderBottomWidth: 2,
    borderColor: designLanguage.color300,
    alignSelf: 'center',
    paddingBottom: 16,
  },
});

export default MyTeams;
