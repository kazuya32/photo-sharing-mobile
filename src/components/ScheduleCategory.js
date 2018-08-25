import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  SectionList,
} from 'react-native';
import firebase from 'firebase';

import MatchItem from '../components/MatchItem.js';
import UserSectionHeader from '../components/UserSectionHeader.js';

class ScheduleCategory extends React.Component {
  state = {
  }

  componentDidMount() {
    this.fetchSchedules();
  }

  // eslint-disable-next-line
  fetchSchedules = async () => {
    // const maxResults = 100;
    const db = firebase.firestore();

    const ref = db.collection('matches')
      .where('category', '==', this.props.category);
      // .limit(maxResults);

    const matches = [];
    ref.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          matches.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        const pastMatches = this.extractPastSchedules(matches);
        const sections = this.makeSection(pastMatches);
        this.setState({ sections: sections.reverse() });
      });
  }

  // eslint-disable-next-line
  extractPastSchedules = (matches) => {
    const currentTimestamp = Date.now();
    const day = 1000 * 60 * 60 * 24;
    const searchTime = currentTimestamp + (day * 2);
    const pastMatches = [];

    matches.forEach((match) => {
      if (match.data.time.timestamp < searchTime) {
        pastMatches.push(match);
      }
    });
    return pastMatches;
  }

  // eslint-disable-next-line
  makeSection = (matches) => {
    const sections = [];
    // eslint-disable-next-line
    matches.forEach((match) => {
      const title = match.data.section.section;
      const index = this.checkTitle(title, sections);

      if (typeof index !== 'undefined') {
        sections[index].data.push(match);
      } else {
        const section = {};
        section.title = title;
        section.data = [match];
        sections.push(section);
      }
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

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <MatchItem
      onPress={() => { this.props.onPressMatch(item); }}
      match={item}
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
          <View style={{ flex: 1, padding: 100, alignSelf: 'center' }}>
            <ActivityIndicator />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SectionList
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          sections={this.state.sections}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScheduleCategory;
