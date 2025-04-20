import { StyleSheet } from "react-native"

const stylesControllerMusic = StyleSheet.create({
    title: {
        color: '#888',
        fontSize: 16,
        marginBottom: 5,
      },
      songName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      slider: {
        width: '100%',
        marginTop: 20,
      },
      timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      time: {
        color: '#ccc',
        fontSize: 12,
      },
      playButton: {
        
        marginTop: 20,
        backgroundColor: '#1DB954',
        padding: 5,
        borderRadius: 50,
        width: 50
      },
})

export default stylesControllerMusic