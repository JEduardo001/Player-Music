import { Dimensions, StyleSheet } from "react-native"

const { width } = Dimensions.get('window'); 

const stylesSearch = StyleSheet.create({
    searchContainer: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-around",
        width: width    
    },
    input: {
        borderRadius: 30,
        padding: 7,
        width: "60%",
        backgroundColor: "white",
        borderColor: "rgb(189, 236, 148)",
        borderWidth: 3,
    },
    btnSearch: {
        backgroundColor: "white",
        borderRadius: 30,
        padding: 10,
        justifyContent: "center",
        borderColor: "rgb(189, 236, 148)",
        borderWidth: 3,
    }
})

export default stylesSearch