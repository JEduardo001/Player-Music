import {  useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet,View,Text,TouchableOpacity } from "react-native"
import { StackParamList } from '../App'; 
import { Video,ResizeMode } from "expo-av";
import React, { useContext } from "react";
import { ContextAlbumReproducing } from "../context/context";

type NavigationProp = StackNavigationProp<StackParamList, 'artistSongs'>;


const TarjetAlbumReproducing = (artist: any) => {
    const navigation = useNavigation<NavigationProp>();
    const context = useContext(ContextAlbumReproducing)
    if(!context){
        console.log("El contexto no se esta usando dentro de un provider")
        return
    }
    const {actualSongReproducing,videoRef,actualAlbumReproducing} = context

    return (
        <TouchableOpacity onPress={() => navigation.navigate('artistSongs', {dataAlbum: actualAlbumReproducing})}  style = {styles.container}>
           <Video
                ref={videoRef}
                source={actualSongReproducing.routeVideo}
                style={styles.video}
                //useNativeControls
                isMuted={true}
                shouldPlay
                isLooping
                resizeMode={ResizeMode.COVER}    
            />
    
         <View style = {styles.containerInfo}>
            <Text style = {styles.nameArtist}>Reproduciendo álbum</Text>
         </View>

           <View style = {[styles.containerInfo, {marginTop: "30%"}]}>
                <Text style = {styles.nameArtist}>{actualAlbumReproducing.name}</Text>
            </View>

        </TouchableOpacity>
    )
}

export default TarjetAlbumReproducing

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgb(38, 37, 37)",
        borderRadius: 30,
        shadowColor: "white",
        shadowOpacity: 1,
        marginTop: 50,
        height: 200
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
        borderRadius: 20,
        backgroundColor: "rgba(0, 0, 0,0.2)"
    },
    video: {
        height: "100%",
        borderRadius: 30,

    }
}) 