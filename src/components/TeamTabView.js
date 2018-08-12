import React from 'react';
import { StyleSheet } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import TeamList from './TeamList.js';

class TeamTabView extends React.Component {
  state = {
  }

  render() {
    const { onPressTeam } = this.props;
    return (
      <ScrollableTabView
        // renderTabBar={this.renderTabBar}
        style={[
          styles.header,
        ]}
        tabBarUnderlineStyle={styles.underline}
        tabBarBackgroundColor="#fff"
        tabBarActiveTextColor="black"
        tabBarInactiveTextColor="black"
        tabBarTextStyle={styles.tabBarText}
        tabStyle={{ paddingBottom: 0 }}
        // initialPage={initialPage}
      >
        <TeamList
          tabLabel="J1"
          league="J1"
          style={styles.teams}
          navigation={this.props.navigation}
          onPressTeam={onPressTeam}
        />
        <TeamList
          tabLabel="J2"
          league="J2"
          style={styles.teams}
          navigation={this.props.navigation}
          onPressTeam={onPressTeam}
        />
        <TeamList
          tabLabel="J3"
          league="J3"
          style={styles.teams}
          navigation={this.props.navigation}
          onPressTeam={onPressTeam}
        />
      </ScrollableTabView>
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

export default TeamTabView;
