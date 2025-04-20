import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ContextAlbumReproducing } from '../context/context';
import { useContext } from 'react';
import { Song, TypeAlbumn } from '../types';

interface ComponentSongProps {
  song: Song; 
  dataAlbum: TypeAlbumn,
  allSongs: Song[]
}

const ComponentSong = ({ song, dataAlbum, allSongs }: ComponentSongProps) => {
  const context = useContext(ContextAlbumReproducing);
  if (!context) {
    console.log("El contexto no está envuelto en su provider");
    return null;
  }

  const { playAudio,actualAlbumReproducing,stopAndUnloadVideo, setActualSongReproducing,changeAlbumReproducing } = context;

  const changeSong = async () => {
    await stopAndUnloadVideo()
    if(actualAlbumReproducing.id != dataAlbum.id){
      changeAlbumReproducing(dataAlbum,allSongs)
    }
    playAudio(song.routeSong);
    setActualSongReproducing(song);
  };

  return (
    <TouchableOpacity onPress={() => changeSong()} style={styles.container}>
      <Text>{song.name}</Text>
    </TouchableOpacity>
  );
};

export const ComponentSongAllMusic = ({ song, dataAlbum, allSongs }: ComponentSongProps) => {
  const context = useContext(ContextAlbumReproducing);
  if (!context) {
    console.log("El contexto no está envuelto en su provider");
    return null;
  }

  const { playAudio,actualAlbumReproducing,stopAndUnloadVideo, setActualSongReproducing,changeAlbumReproducing } = context;

  const changeSong = async () => {
    await stopAndUnloadVideo()
    if(actualAlbumReproducing.id != dataAlbum.id){
      changeAlbumReproducing(dataAlbum,allSongs)
    }
    playAudio(song.routeSong);
    setActualSongReproducing(song);
  };

  return (
    <TouchableOpacity onPress={() => changeSong()} style={styles.container}>
      <Text>{song.name}</Text>
    </TouchableOpacity>
  );
};

export default ComponentSong;

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    backgroundColor: "rgb(232, 255, 227)",
    padding: 7,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
