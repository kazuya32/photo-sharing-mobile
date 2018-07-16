import React from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';

import Header from '../components/Header.js';
import UserSectionHeader from '../components/UserSectionHeader.js';
import UserSectionItem from '../components/UserSectionItem.js';


class Nortification extends React.Component {
  state = {
    logInUser: this.props.navigation.state.params && this.props.navigation.state.params.logInUser,
  }

  componentDidMount() {
    this.fetchAthletes();
  }

  // eslint-disable-next-line
  fetchAthletes = async () => {
    const db = firebase.firestore();
    // const maxResults = 3;

    const ref = db.collection('users').orderBy('name');
    // .limit(maxResults);

    const users = [];
    ref.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        const athletes = this.extractAthletes(users);
        const sections = this.makeSection(athletes);
        this.setState({ sections });
      });
  }

  // eslint-disable-next-line
  extractAthletes = (users) => {
    const athletes = [];

    users.forEach((user) => {
      if (user.data.isAthlete) { athletes.push(user); }
    });

    return athletes;
  }

  // eslint-disable-next-line
  makeSection = (athletes) => {
    const sections = [];
    // eslint-disable-next-line
    athletes.forEach((athlete) => {

      const title = athlete.data.name[0];
      const index = this.checkTitle(title, sections);

      if (typeof index !== 'undefined') {
        sections[index].data.push(athlete);
      } else {
        const section = {};
        section.title = title;
        section.data = [athlete];
        sections.push(section);
      }
    // eslint-disable-next-line
    });

    return sections;
  }

  // eslint-disable-next-line
  checkTitle = (title, sections) => {
    let index;
    sections.forEach((section) => {
      if (section.title === title) {
        index = sections.indexOf(section);
      }
    });
    return index;
  }

  onPressUser = (item) => {
    this.props.navigation.navigate({
      routeName: 'UserPage',
      params: {
        uid: item.id,
        logInUser: this.state.logInUser,
        // user: item,
      },
      key: 'UserPage' + item.id,
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <UserSectionItem
      user={item}
      onPress={() => {
        if (this.props.navigation.state.params && this.props.navigation.state.params.onPress) {
          this.props.navigation.state.params.onPress(item);
        } else {
          this.onPressUser(item);
        }
      }}
    />
  );

  renderSectionHeader = ({ section }) => (
    <UserSectionHeader
      title={section.title}
    />
  );

  render() {
    if (!this.state.sections) {
      return (
        <View style={styles.container}>
          <Header
            headerTitle="FLEGO"
            navigation={this.props.navigation}
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
          headerTitle="FLEGO"
          navigation={this.props.navigation}
        />
        <SectionList
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          sections={this.state.sections}
          keyExtractor={this.keyExtractor}
          extraData={this.state}
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
});

export default Nortification;
