import { TextInput, TouchableOpacity, View } from "react-native"
import stylesSearch from "../styles/components/search"
import { Ionicons } from '@expo/vector-icons';

type PropsSearchComponent = {
    functionSearchText: any,
    valueTextSearch: any,
    textPlaceHolder:  string
}

const SearchComponent = ({functionSearchText,valueTextSearch,textPlaceHolder}: PropsSearchComponent) => {
    return (
        <View style = {stylesSearch.searchContainer}>
            <TextInput
                style={stylesSearch.input}
                placeholder={textPlaceHolder}
                placeholderTextColor="black"
                value={valueTextSearch}
                onChangeText={(value) => functionSearchText(value)}
            />
            <TouchableOpacity onPress={() => functionSearchText('')} style = {stylesSearch.btnSearch}>
                <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity>
        </View>
    )
}

export default SearchComponent