import { TouchableOpacity, View,StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { useContext } from "react";
import { ContextAlbumReproducing } from "../context/context";
import stylesSearch from "../styles/components/search";

const RandomSongBtn = () => {
    const context = useContext(ContextAlbumReproducing)
    if(!context){
        console.log("El contexto no se esta usando dentro de un provider")
        return
    }
    const {setActiveRandomSong,randomSong} = context
    
    return (
         <View style = {styles.containerSongRandom}>
            <TouchableOpacity onPress={() => setActiveRandomSong(!randomSong)} style = {[stylesSearch.btnSearch, {backgroundColor: randomSong == false ? "white" : "rgb(107, 255, 74)"}]}>
                <Ionicons name="shuffle" size={24} color={randomSong == false ? "black" : "white"} />
            </TouchableOpacity>
        </View>
        
    )
}

export default RandomSongBtn

const styles = StyleSheet.create({
    containerSongRandom: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: 20,
        paddingTop: 10
      }
})