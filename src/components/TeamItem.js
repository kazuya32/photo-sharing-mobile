import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  // Dimensions,
} from 'react-native';

class TeamItem extends React.Component {
  render() {
    const { onPress, team, numColumns } = this.props;
    // const dia = Dimensions.get('window').width / numColumns; // 画質が悪すぎた
    // const dia = Dimensions.get('window').width / 6;
    const dia = 44;

    return (
      <TouchableHighlight style={styles.container} onPress={onPress} underlayColor="transparent">
        <View style={styles.item}>
          <Image
            style={[
              styles.logo,
              { width: dia, height: dia },
            ]}
            source={{ uri: team.data.logoURL }}
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
    fontSize: 20,
    fontWeight: '500',
  },
  logo: {
    marginLeft: 16,
    marginRight: 16,
  },
});

export default TeamItem;
