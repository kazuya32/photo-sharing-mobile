import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  // Dimensions,
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
    // const dia = Dimensions.get('window').width / 6;
    const dia = 32;

    const title = `${match.data.homeTeam.fullname} vs ${match.data.awayTeam.fullname}`;
    // `${this.state.homeTeam.data.name} vs ${this.state.awayTeam.data.name}`

    if (!(this.state.homeTeam && this.state.awayTeam)) {
      return (
        <TouchableHighlight style={styles.container} onPress={onPress} underlayColor="transparent">
          <View style={styles.item}>
            <View style={{ alignSelf: 'center' }}>
              <ActivityIndicator />
            </View>
            <Text style={styles.text}>
              {title}
            </Text>
          </View>
        </TouchableHighlight>
      );
    }

    const homeLogoURL = this.state.homeTeam && this.state.homeTeam.data.logoURL;
    const awayLogoURL = this.state.awayTeam && this.state.awayTeam.data.logoURL;

    return (
      <TouchableHighlight style={styles.container} onPress={onPress} underlayColor="transparent">
        <View style={styles.item}>
          <Image
            style={[
              styles.logo,
              { width: dia, height: dia },
            ]}
            source={{ uri: homeLogoURL }}
            resizeMode="cover"
          />
          <Text style={styles.text}>
            {title}
          </Text>
          <Image
            style={[
              styles.logo,
              { width: dia, height: dia },
            ]}
            source={{ uri: awayLogoURL }}
            resizeMode="cover"
          />
        </View>
      </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    // marginTop: 12,
    backgroundColor: '#fff',
    marginBottom: 4,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    // padding: 12,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
    borderBottomWidth: 1,
    borderColor: '#EBEBEB',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 8,
    marginRight: 8,
    // fontSize: 20,
    // fontWeight: '500',
  },
  logo: {
    marginLeft: 8,
    marginRight: 8,
  },
});

export default MatchItem;
