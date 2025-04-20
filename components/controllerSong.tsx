import { View,Text,Pressable } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import stylesControllerMusic from "../styles/components/controllerMusic";
import Slider from '@react-native-community/slider'; 
import { ContextAlbumReproducing } from "../context/context";
import { useContext } from "react";

const ControllerSong = () => {
    const context = useContext(ContextAlbumReproducing)
    if(!context){
        console.log("El contexto no se esta usando dentro de un provider")
        return
    }
    const {
        actualSongReproducing,
        loadingNewSong,
        duration,
        position,
        onSlide,
        formatTime,
        backSong,
        togglePlayback,
        isPlaying,
        nextSong
    } = context

    const validatonsToControllerSong = () => {
        if(!loadingNewSong){
            if(actualSongReproducing.id != -1){
                return true
            }
        }
        return false
      }
     
    return (
        <View style = {{width: "100%", padding: 10}}>
      <Text style={stylesControllerMusic.songName}>
        {
           !loadingNewSong
            ?
                actualSongReproducing.name != "null"
                ? actualSongReproducing.name
                : <Text>Sin canción actual</Text>
            : null

        }
      </Text>

      <Slider
        style={stylesControllerMusic.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#1DB954"
        onSlidingComplete={onSlide}
      />

      <View style={stylesControllerMusic.timeRow}>
        <Text style={stylesControllerMusic.time}>{formatTime(position)}</Text>
        <Text style={stylesControllerMusic.time}>{formatTime(duration)}</Text>
      </View>

        <View style ={{flexDirection: "row", width: "100%", justifyContent: "space-around"}}>
             <Pressable onPress={() => {
                if(validatonsToControllerSong()){
                  backSong()
                }
             }} style={stylesControllerMusic.playButton}>
                <Ionicons
                    name="chevron-back-circle" 
                    size={40}
                    color="#fff"
                />
            </Pressable>
            <Pressable onPress={() => {
                if(validatonsToControllerSong()){
                    togglePlayback()
                }
            }} style={stylesControllerMusic.playButton}>
                <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={40}
                color="#fff"
                />
            </Pressable>
            <Pressable onPress={() => {
                if(validatonsToControllerSong()){
                    nextSong()
                }
            }} style={stylesControllerMusic.playButton}>
                <Ionicons
                    name="chevron-forward-circle" 
                    size={40}
                    color="#fff"
                />
            </Pressable>
        </View>    
    </View>
    )
  }

  export default ControllerSong