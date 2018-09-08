import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  // Dimensions,
} from 'react-native';
import firebase from 'firebase';
// import { FileSystem } from 'expo';

class TeamItem extends React.Component {
  state = {
  }

  componentDidMount() {
    if (!this.props.team && this.props.teamId) {
      this.fetchTeam(this.props.teamId);
    }

    // if (this.props.team) {
    //   this.cacheLogoImage();
    // }
  }

  fetchTeam = async (teamId) => {
    const db = firebase.firestore();
    const Ref = db.collection('teams').doc(teamId);
    Ref.get().then((doc) => {
      const team = { id: doc.id, data: doc.data() };
      this.setState({ team });
    });
  }

  // cacheLogoImage = async () => {
  //   const { team } = this.props;
  //   const path = FileSystem.documentDirectory + 'logo' + team.id + '.jpg';
  //   const info = await FileSystem.getInfoAsync(path);
  //   if (!info.exists) {
  //     await FileSystem.downloadAsync(team.data.logoURL, path);
  //   }
  //   this.setState({ logoURL: path });
  // };

  render() {
    const {
      onPress,
      // team,
      numColumns,
      style,
    } = this.props;

    const team = this.props.team || this.state.team;

    if (!team) {
      return null;
    }

    // const dia = Dimensions.get('window').width / numColumns; // 画質が悪すぎた
    // const dia = Dimensions.get('window').width / 6;
    const dia = 44;

    return (
      <TouchableHighlight style={[styles.container, style]} onPress={onPress} underlayColor="transparent">
        <View style={styles.item}>
          <Image
            style={[
              styles.logo,
              { width: dia, height: dia },
            ]}
            source={{ uri: team.data.logoURL, cache: 'force-cache' }}
            resizeMode="cover"
          />
          <Text style={styles.text}>
            {team.data.name}
          </Text>
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
    marginLeft: 16,
    marginRight: 16,
    fontSize: 18,
    fontWeight: '500',
  },
  logo: {
    marginLeft: 16,
    marginRight: 16,
  },
});

export default TeamItem;
