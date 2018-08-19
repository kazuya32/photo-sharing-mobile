import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';
import firebase from 'firebase';

class MatchItem extends React.Component {
  state = {}

  componentDidMount() {
    const { match } = this.props;
    this.fetchHomeTeam(match.data.homeTeam.id);
    this.fetchAwayTeam(match.data.awayTeam.id);
  }

  fetchHomeTeam = (teamId) => {
    let team;
    const db = firebase.firestore();
    const Ref = db.collection('teams').doc(teamId);
    Ref.get().then((doc) => {
      team = { id: doc.id, data: doc.data() };
      this.setState({ homeTeam: team });
    });
  }

  fetchAwayTeam = (teamId) => {
    let team;
    const db = firebase.firestore();
    const Ref = db.collection('teams').doc(teamId);
    Ref.get().then((doc) => {
      team = { id: doc.id, data: doc.data() };
      this.setState({ awayTeam: team });
    });
  }

  render() {
    const { onPress, match } = this.props;
    const dia = 32;

    if (!(this.state.homeTeam && this.state.awayTeam)) {
      return (
        <TouchableHighlight style={styles.container} onPress={onPress} underlayColor="transparent">
          <View style={styles.item}>
            <View style={styles.team}>
              <Text style={styles.name}>
                {match.data.homeTeam.fullname}
              </Text>
            </View>
            <Text style={styles.text}>
              vs
            </Text>
            <View style={styles.team}>
              <Text style={styles.name}>
                {match.data.awayTeam.fullname}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    }

    const homeLogoURL = this.state.homeTeam && this.state.homeTeam.data.logoURL;
    const awayLogoURL = this.state.awayTeam && this.state.awayTeam.data.logoURL;

    return (
      <TouchableHighlight style={styles.container} onPress={onPress} underlayColor="transparent">
        <View style={styles.item}>
          <View style={styles.team}>
            <Image
              style={[
                styles.logo,
                { width: dia, height: dia },
              ]}
              source={{ uri: homeLogoURL }}
              resizeMode="cover"
            />
            <Text style={styles.name}>
              {match.data.homeTeam.fullname}
            </Text>
          </View>
          <View style={styles.vs}>
            <Text style={styles.text}>
              vs
            </Text>
          </View>
          <View style={styles.team}>
            <Image
              style={[
                styles.logo,
                { width: dia, height: dia },
              ]}
              source={{ uri: awayLogoURL }}
              resizeMode="cover"
            />
            <Text style={styles.name}>
              {match.data.awayTeam.fullname}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#EBEBEB',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  team: {
    width: (Dimensions.get('window').width / 2) - 10,
    alignItems: 'center',
  },
  name: {
    marginTop: 4,
    fontWeight: '400',
  },
  vs: {
    width: 20,
    alignItems: 'center',
    // fontWeight: '500',
  },
  text: {
    fontSize: 16,
    // fontWeight: '500',
  },
  logo: {
    marginLeft: 8,
    marginRight: 8,
  },
});

export default MatchItem;
