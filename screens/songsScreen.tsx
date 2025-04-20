import React, { useContext, useEffect, useState } from "react";
import { StyleSheet,Image, View, Text,ScrollView,FlatList} from "react-native";
import { Video,ResizeMode } from "expo-av";
import { ComponentSongAllMusic } from "../components/componentSong";
import { ContextAlbumReproducing } from "../context/context";
import {allSongsAllAlbums, Song } from "../types";
import SearchComponent from "../components/searchComponent";
import ControllerSong from "../components/controllerSong";
import RandomSongBtn from "../components/randomSongBtn";

const SongsScreen = () => {

  const context = useContext(ContextAlbumReproducing)
  if(!context){
    console.log("El contexto no esta envuelto en su provider")
    return null
  }
  const {loadingNewSong,actualSongReproducing,actualAlbumReproducing} = context
  const video = React.useRef(null);
  const [textSearch,setTextSearch] = useState('')
  const [songs,setSongs] = useState<Song[]>([])
  const [songsSearch,setSongsSearch] = useState<Song[]>([])
  const [isLoading, setLoading] = useState(true)

  //album exclusivo para esta screen, -2 significa que no es un album, 
  // siginifica que esta reproduciendo la playlist de todas las canciones
  const [dataAlbum,setDataAlbum] = useState({
    id: -2,
    name: "Todas las canciones",
    routeImage: "null"
  })

  useEffect(() => {
    if (!songs) return
  
    const filteredSongs = songs.filter(song =>
      song.name.toLowerCase().includes(textSearch.toLowerCase())
    )
  
    setSongsSearch(filteredSongs)
  }, [textSearch])
  
  useEffect(() => {
    const listSongs = [];
    let id = 1;
  
    for (const songList of allSongsAllAlbums) {
      for (const song of songList) {
        const songCopy = { ...song, id }; 
        listSongs.push(songCopy);
        id++;
      }
    }
  
    setSongs(listSongs);
  }, []);
  

  useEffect(() => {
    setLoading(false)
  }, [isLoading])

  const renderComponentSong = ({ item }: { item: Song }) => {
    return <ComponentSongAllMusic song={item} dataAlbum={dataAlbum} allSongs={songs}/>;
  };
  
  return (
    
    <ScrollView style={styles.container}>
      {
        !loadingNewSong
        ?
            actualSongReproducing.id != -1
            ?   
             
              <Video
                  ref={video}
                  source={actualSongReproducing.routeVideo}
                  style={styles.video}
                  shouldPlay
                  isLooping
                  isMuted={true}
                  resizeMode={ResizeMode.COVER}   
              />
            
            :   <Image
                    source={require("../assets/noVideo.webp")}
                    style={styles.image}
                />
        : 
        <View
            style={styles.image}>
        </View>
        
      }
     
      <Text style = {[styles.text]}>Reproducción Actual</Text>
      <Text style = {[styles.textActualAlbum]}>Album {actualAlbumReproducing.name}</Text>
     
      <ControllerSong />
    
     <View style = {styles.containerBtnStartAlbum}>
        <Text style ={{fontSize: 20, color: "white"}}>Más Canciones</Text>
       

     </View>

        {/* barra de busqueda */}
        <SearchComponent functionSearchText={setTextSearch} valueTextSearch={textSearch} textPlaceHolder={"Busca una canción..."}/>
        <RandomSongBtn />
     {
        textSearch != ""
        ? 
          <View style = {styles.containerMoreMusic}>
            <FlatList
                data={songsSearch}
                keyExtractor={(item, index) => (item.id + Math.random()).toString()}
                renderItem={renderComponentSong}
                scrollEnabled={false}
            />
         </View>
        :
          !isLoading
          ?  
              <View style = {styles.containerMoreMusic}>
                  <FlatList
                      data={songs}
                      keyExtractor={(item, index) => (item.id + Math.random()).toString()}
                      renderItem={renderComponentSong}
                      scrollEnabled={false}
                  />
              </View>
          : <Text>Cargando...</Text>
     }

    </ScrollView>
  );
};

export default SongsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(16, 16, 16)"
  },
  title: {
    fontSize: 30,
    color: "white",
    marginLeft: 12
  },
  containerInfo: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: "absolute",
    backgroundColor: "rgba(42, 42, 42, 0.5)",
    width: "100%",
    marginTop: 450,
    height: 50,
    //borderRadius: 20
  },
  text: {
    color: "white",
    marginTop: 30,
    fontSize: 17,
    paddingLeft: 10
  },
  textActualAlbum: {
    fontSize: 14,
    marginTop: 5,
    color: "white",
    paddingLeft: 10
  },
  video: {
    height: 500,
    width: "100%",
    //borderEndEndRadius: 40
  },
  containerMoreMusic: {
    width: "100%",
    marginBottom: 100,
    padding: 10
  },
  btnStartAlbum: {
    backgroundColor: "rgb(227, 168, 255)",
    borderRadius: 20,
    height: 35,
    width: "40%",
    alignItems: "center",
    justifyContent:"center"
  },
  containerBtnStartAlbum: {
    marginTop: 30,
    alignItems:"center",
    justifyContent:"space-around",
    width: "100%",
    flexDirection: "row",
  },
  image: {
    height: 500,
    width: "100%",
  },

});
