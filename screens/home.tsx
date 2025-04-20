import { useContext, useEffect, useState } from "react";
import { StyleSheet,View,Text, FlatList,ScrollView } from "react-native"
import { Dimensions } from 'react-native';
import TarjetArtist from '../components/tarjetArtist'
import Albums, { TypeAlbumn } from "../types/index"
import TarjetAlbumReproducing from "../components/tarjetAlbumReproducing"
import { ContextAlbumReproducing } from "../context/context";
import SearchComponent from "../components/searchComponent";


const { width } = Dimensions.get('window'); 
const Home = () => {

    const context = useContext(ContextAlbumReproducing)
    if(!context){
        console.log("El contexto no se esta usando dentro de un provider")
        return
    }
    const {actualSongReproducing} = context
    
    const [textSearch,setTextSearch] = useState('')
    const [albumSearch,setAlbumSearch] = useState<TypeAlbumn[]>([])
    const renderTarjetArtist = ({ item }: { item: TypeAlbumn }) => {
        return <TarjetArtist dataAlbum={item} />;
    };

    useEffect(() => {
        if (!Albums) return
      
        const searchAlbums = Albums.filter(album =>
          album.name.toLowerCase().includes(textSearch.toLowerCase())
        )
      
        setAlbumSearch(searchAlbums)
      }, [textSearch])
    
      const getAlbums = (): TypeAlbumn[] => {
        if(textSearch != ''){
            return albumSearch
        }
        return Albums
      }

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Mi música</Text>
            {/* barra de busqueda */}
            <SearchComponent functionSearchText={setTextSearch} valueTextSearch={textSearch} textPlaceHolder={"Busca un album..."}/>

            <ScrollView>

            {
            actualSongReproducing.id != -1
            ?  <TarjetAlbumReproducing artist={{}} />
            : null
            }
            
            <FlatList
                data={getAlbums()}
                keyExtractor={item => item.id.toString()}
                renderItem={renderTarjetArtist}
                scrollEnabled={false}

            />
        
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 15
    },
    title: {
        color: "white",
        marginTop: 50,
        fontSize: width * 0.1
    },

})