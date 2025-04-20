import React, { useContext, useEffect, useState } from "react";
import { StyleSheet,Image, View, Text,ScrollView,FlatList, TouchableOpacity } from "react-native";
import { Video,ResizeMode } from "expo-av";
import ComponentSong from "../components/componentSong";
import { RouteProp } from "@react-navigation/native";
import { StackParamList } from "../App";
import { ContextAlbumReproducing } from "../context/context";
import songsBeegees from "../types/beegees";
import { Song } from "../types";
import songsModernTalking from "../types/modern_talking";
import songsBonJovi from "../types/bon_jovi";
import songsKiss from "../types/kiss";
import songsLauraBranigan from "../types/laura_branigan";
import songsMichaelJackson from "../types/michael_jackson";
import songsQueen from "../types/queen";
import songsStarship from "../types/starship";
import songsTheOutfield from "../types/the_outflied";
import songsTheBeatles from "../types/theBeatles";
import SearchComponent from "../components/searchComponent";
import RandomSongBtn from "../components/randomSongBtn";
import ControllerSong from "../components/controllerSong";

type ArtistSongsRouteProp = RouteProp<StackParamList, 'artistSongs'>;

interface Props {
  route: ArtistSongsRouteProp;
}


const ArtistSongs = ({ route }: Props) => {
  const { dataAlbum } = route.params;

  const context = useContext(ContextAlbumReproducing)
  if(!context){
    console.log("El contexto no esta envuelto en su provider")
    return null
  }
  const {
    songs,
    startAlbum,
    loadingNewSong,
    actualSongReproducing,
    actualAlbumReproducing
  } = context

  const video = React.useRef(null);
  const [textSearch,setTextSearch] = useState('')
  const [songsThisScreen,setSongs] = useState<Song[]>()
  const [songsSearch,setSongsSearch] = useState<Song[]>([])
  //const [videoUri,setVideoUri] = useState<any>()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (!songsThisScreen) return
  
    const filteredSongs = songsThisScreen.filter(songsThisScreen =>
      songsThisScreen.name.toLowerCase().includes(textSearch.toLowerCase())
    )
  
    setSongsSearch(filteredSongs)
  }, [textSearch])
  

 useEffect(() => {
    switch(dataAlbum.id){
        case -2: 
            setSongs(songs)
        break
        case 1: 
            setSongs(songsBeegees.songs)
        break
        case 2: 
          setSongs(songsModernTalking.songs)
        break
        case 3: 
          setSongs(songsBonJovi.songs)
        break
        case 4: 
          setSongs(songsKiss.songs)
        break
        case 5: 
          setSongs(songsLauraBranigan.songs)
        break
        case 6: 
          setSongs(songsMichaelJackson.songs)
        break
        case 7: 
          setSongs(songsQueen.songs)
        break
        case 8: 
          setSongs(songsStarship.songs)
        break
        case 9: 
          setSongs(songsTheBeatles.songs)
        break
        case 10: 
          setSongs(songsTheOutfield.songs)
        break
        default: 
          console.log("No hay un album con el id ",dataAlbum.id)
        break
    }
  },[]) 

  useEffect(() => {
    setLoading(false)
  },[songsThisScreen])

  const renderComponentSong = ({ item }: { item: Song }) => {
    return <ComponentSong song={item} dataAlbum={dataAlbum} allSongs={[]} />;
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
      <View style = {styles.containerInfo}>
        <Text style = {[styles.title]}>{dataAlbum.name}</Text>
      </View>
      <Text style = {[styles.text]}>Reproducción Actual</Text>
      <Text style = {[styles.textActualAlbum]}>Album {actualAlbumReproducing.name}</Text>
     
      <ControllerSong />
    
     <View style = {styles.containerBtnStartAlbum}>
        <Text style ={{fontSize: 20, color: "white"}}>Más Canciones</Text>
        {songsThisScreen && songsThisScreen.length > 0 && (
            <TouchableOpacity onPress={() => startAlbum(dataAlbum, songsThisScreen[0])} style={styles.btnStartAlbum}>
              <Text>Iniciar álbum</Text>
            </TouchableOpacity>
          )}

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
                keyExtractor={item => item.id.toString()}
                renderItem={renderComponentSong}
                scrollEnabled={false}
            />
         </View>
        :
          !isLoading
          ?  
              <View style = {styles.containerMoreMusic}>
                  <FlatList
                      data={songsThisScreen}
                      keyExtractor={item => item.id.toString()}
                      renderItem={renderComponentSong}
                      scrollEnabled={false}
                  />
              </View>
          : <Text style = {{color: "white"}}>Cargando...</Text>
     }

    </ScrollView>
  );
};

export default ArtistSongs;

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
  }
});
