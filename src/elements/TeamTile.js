import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import firebase from 'firebase';

class TeamTile extends React.Component {
  state = {}

  componentDidMount() {
    const {
      teamId,
    } = this.props;

    if (teamId) {
      this.fetchTeam(teamId);
    }
  }
  // eslint-disable-next-line
  fetchTeam = (teamId) => {
    let team;
    const db = firebase.firestore();
    const Ref = db.collection('teams').doc(teamId);
    Ref.get().then((doc) => {
      team = { id: doc.id, data: doc.data() };
      this.setState({ team });
    });
  }

  onPress = () => {
    this.props.onPress(this.state.team);
  }

  render() {
    const {
      style,
    } = this.props;

    if (!this.state.team) { return null; }

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.teamPrefix}>
          For
        </Text>
        <TouchableHighlight
          onPress={this.onPress}
          underlayColor="transparent"
          style={styles.teamName}
        >
          <Text style={styles.teamTitle}>
            {this.state.team && `${this.state.team.data.name}`}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  teamName: {
    justifyContent: 'flex-end',
  },
  teamTitle: {
    color: '#DB4D5E',
    fontSize: 12,
  },
  teamPrefix: {
    marginRight: 4,
    fontSize: 12,
  },
});

export default TeamTile;
