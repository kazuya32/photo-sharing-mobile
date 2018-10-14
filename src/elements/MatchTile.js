import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import firebase from 'firebase';

class MatchTile extends React.Component {
  state = {}

  componentDidMount() {
    const {
      matchId,
    } = this.props;

    if (matchId) {
      this.fetchMatch(matchId);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }
  
  // eslint-disable-next-line
  fetchMatch = (matchId) => {
    let match;
    const db = firebase.firestore();
    const matchRef = db.collection('matches').doc(matchId);
    matchRef.get().then((doc) => {
      match = { id: doc.id, data: doc.data() };
      this.setState({ match });
    });
  }

  onPress = () => {
    this.props.onPress(this.state.match);
  }

  render() {
    const {
      style,
    } = this.props;

    if (!this.state.match) { return null; }

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.matchPrefix}>
          In
        </Text>
        <TouchableHighlight
          onPress={this.onPress}
          underlayColor="transparent"
        >
          <Text style={styles.matchTitle}>
            {`${this.state.match.data.homeTeam.fullname} vs ${this.state.match.data.awayTeam.fullname}`}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-end',
  },
  matchTitle: {
    alignSelf: 'center',
    color: '#DB4D5E',
    // fontSize: 12,
  },
  matchPrefix: {
    marginRight: 4,
    alignSelf: 'center',
  },
});

export default MatchTile;
