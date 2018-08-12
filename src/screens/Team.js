import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Header from '../components/Header.js';
import TeamTabView from '../components/TeamTabView.js';

class Team extends React.Component {
  state = {
  }

  onPressTeam = (team) => {
    this.props.navigation.navigate({
      routeName: 'TeamFeed',
      params: {
        feedType: 'team',
        itemId: team.id,
      },
      key: 'TeamFeed' + team.id,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          logInUser={this.state.logInUser}
          headerTitle="Team"
        />
        <TeamTabView
          onPressTeam={this.onPressTeam}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  teams: {
    // zIndex: 100,
  },
  header: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginTop: 16,
  },
  underline: {
    // backgroundColor: '#DB4D5E',
    backgroundColor: '#fff',
    borderWidth: 0,
    // height: 0,
    // borderBottomColor: '#DB4D5E',
  },
  activeTab: {
    borderColor: '#fff',
    borderWidth: 1,
  },
  tabBarText: {
    // alignSelf: 'center',
    // fontSize: 14,
    // borderWidth: 1,
  },
});

export default Team;
