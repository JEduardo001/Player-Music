import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StackParamList } from '../App';
import { imageMap, TypeAlbumn } from '../types';

type NavigationProp = StackNavigationProp<StackParamList, 'artistSongs'>;

type Props = {
  dataAlbum: TypeAlbumn;
};

const TarjetArtist = ({ dataAlbum }: Props) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('artistSongs', {dataAlbum: dataAlbum})}
      style={styles.container}
    >
      <Image
        source={imageMap[dataAlbum.routeImage]}
        style={styles.image}
      />

      <View style={styles.containerInfo}>
        <Text style={styles.nameArtist}>{dataAlbum.name}</Text>
     </View>
    </TouchableOpacity>
  );
};

export default TarjetArtist;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(38, 37, 37)",
    borderRadius: 30,
    shadowColor: "white",
    shadowOpacity: 1,
    marginTop: 50
  },
  image: {
    borderRadius: 30,
    height: 200,
    width: "100%"
  },
  nameArtist: {
    fontSize: 22,
    paddingLeft: 15,
    color: "white"
  },
  totalSongs: {
    padding: 15,
    fontSize: 15,
    color: "white"
  },
  containerInfo: {
    position: "absolute",
    marginTop: "30%",
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0,0.2)"
  }
});
