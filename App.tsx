  import { StyleSheet, Text, View } from 'react-native';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator, Header } from '@react-navigation/stack';
  import Home from './screens/home'
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import { StatusBar } from 'react-native';
  import ArtistSongs from './screens/artistSongs';
import { ProviderAlbumReproducing } from './context/context';
import { TypeAlbumn } from './types';
import SongsScreen from './screens/songsScreen';

// Definir el tipo de parámetros de las pantallas
export type StackParamList = {
  home: undefined; // No pasa parámetros a Home
  artistSongs: { dataAlbum: TypeAlbumn }; // artistSongs espera un parámetro `idAlbum` de tipo `number`
};


  const Tabs = () => {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator>
        <Tab.Screen options={{ headerShown: false }}  name="Home" component={Home}/>
        <Tab.Screen options={{ headerShown: false }}  name="Canciones" component={SongsScreen}/>
      </Tab.Navigator>
    )
  }

  export default function App() {
    const Stack = createStackNavigator<StackParamList>();
    
    return (
      <ProviderAlbumReproducing>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="black" />
          <Stack.Navigator initialRouteName='home'>
              <Stack.Screen name="home" component={Tabs} options={{headerShown: false}}/>
              <Stack.Screen name="artistSongs" component={ArtistSongs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
      </ProviderAlbumReproducing>
    );
  }
