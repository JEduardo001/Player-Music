import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { Sound } from "expo-av/build/Audio";
import { Audio } from 'expo-av';
import * as Imports from './index';

const ContextAlbumReproducing = createContext<Imports.albumReproducing | undefined>(undefined)

const ProviderAlbumReproducing: React.FC<{ children: ReactNode }> = ({ children }) => {
  //Audio
  const [songs, setSongs] = useState<Imports.Song[]>([]);
  const songsRef = useRef(songs);
  const randomSongRef = useRef<boolean>()
  const [randomSong,setActiveRandomSong] = useState(false)
  const songIndexRef = useRef<number>()
  const [songIndex,setSongIndex] = useState<number>(-1)
  const [sound, setSound] = useState<Sound | null>(null);
  //controller audio
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(1); 
  const [loadingNewSong,setLoadingNewSong] = useState(false)
  //video
  const videoRef = useRef<Imports.VideoType>(null);
  //variables para contenido que se este reproduciendo
  const [actualAlbumReproducing,setActualAlbumReproducing] = useState({
    id: -1,
    name: "Sin reproducción",
    routeImage: "null"
  })
  const [actualSongReproducing, setActualSongReproducing] = useState<Imports.Song>({
    id:  -1,
    name:  "null",
    routeSong:  "null",
    routeVideo:  "null"
  });
  const actualSongReproducingRef = useRef(actualSongReproducing);

  const changeAlbumReproducing = (dataAlbum: Imports.TypeAlbumn, allSongs: Imports.Song[]) => {
    if(dataAlbum.id){
      switch(dataAlbum.id){
          case -2:
              setSongs(allSongs)
              setActualAlbumReproducing(dataAlbum)
          break
          case 1: 
              setSongs(Imports.songsBeegees.songs)
              setActualAlbumReproducing(dataAlbum)
          break
          case 2: 
            setSongs(Imports.songsModernTalking.songs)
            setActualAlbumReproducing(dataAlbum)
          break
          case 3: 
            setSongs(Imports.songsBonJovi.songs)
            setActualAlbumReproducing(dataAlbum)
          break
          case 4: 
            setSongs(Imports.songsKiss.songs)
            setActualAlbumReproducing(dataAlbum)
          break
          case 5: 
            setSongs(Imports.songsLauraBranigan.songs)
            setActualAlbumReproducing(dataAlbum)
          break
          case 6: 
            setSongs(Imports.songsMichaelJackson.songs)
            setActualAlbumReproducing(dataAlbum)
          break
          case 7: 
            setSongs(Imports.songsQueen.songs)
            setActualAlbumReproducing(dataAlbum)
          break
          case 8: 
            setSongs(Imports.songsStarship.songs)
            setActualAlbumReproducing(dataAlbum)
          break
          case 9: 
            setSongs(Imports.songsTheOutfield.songs)
            setActualAlbumReproducing(dataAlbum)
          break
          case 10: 
            setSongs(Imports.songsTheBeatles.songs)
            setActualAlbumReproducing(dataAlbum)
          break
          default: 
           console.log("Error al cambiar el album a reproducir, no hay album con id: ",dataAlbum.id)
      }
    }else{
      console.log("la variable idAlbum no tiene valor, es: ",dataAlbum.id)
    }
  }

  
  useEffect(() => {
    songsRef.current = songs
  },[songs])

  useEffect(() => {
    songIndexRef.current = songIndex
  },[songIndex])

  useEffect(() => {
    randomSongRef.current = randomSong
  },[randomSong])

  useEffect(() => {
    setLoadingNewSong(false)
    actualSongReproducingRef.current = actualSongReproducing
  },[actualSongReproducing])

  useEffect(() => {
    const enableBackgroundPlayback = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: 0, 
        playsInSilentModeIOS: true,
  
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: 1, 
        playThroughEarpieceAndroid: false,
      });
    };
  
    enableBackgroundPlayback();
  
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    const appStateListener = Imports.AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        if (sound && !isPlaying) {
          sound.playAsync();
          setIsPlaying(true);
        }
      }
    });

    return () => {
      appStateListener.remove();
    };
  }, [sound, isPlaying]);


  const stopAndUnloadVideo = async () => {
    try {
      if (videoRef.current) {
        const status = await videoRef.current.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          await videoRef.current.stopAsync();
          await videoRef.current.unloadAsync();
        } else {
          await videoRef.current.unloadAsync();
        }
      } else {
        console.log("no hay video");
      }
      return 
    } catch (error) {
      console.log("Error al intentar detener el video:", error);
    }
  };
  
  const togglePlayback = async () => {
    if (!sound) {
      await playAudio(actualSongReproducing?.routeSong);
    } else {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
      }
    }
  };

  const onSlide = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  const playAudio = async (routeSong: any) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      routeSong,
      { shouldPlay: true },
      (status) => {
        if (status.isLoaded) {
          setIsPlaying(status.isPlaying ?? false);
          setPosition(status.positionMillis ?? 0);
          setDuration(status.durationMillis ?? 1);
            
          if (status.didJustFinish) {
            nextSong(); 
          }
        }
      }
    );
  
    setSound(newSound);
  };

  const nextSong = () => {

    setLoadingNewSong(true)
    const songs = songsRef.current
    if(randomSongRef.current){
      var newSongIndex = genRandomIndex()
      while(newSongIndex == songIndexRef.current){
        newSongIndex = genRandomIndex()
        //console.log("index repetido, Generando nuevo index para cancion aleatoria, index: ",newSongIndex)
      }
      //console.log("index generado: ",newSongIndex, " tamano songs ",songsRef.current.length)
      setSongIndex(newSongIndex)
      setActualSongAndPlayAudio(newSongIndex)
    }else{
      const indexSong =  actualSongReproducingRef.current.id - 1
      if(indexSong + 1 < songs.length){
        setActualSongAndPlayAudio(indexSong + 1)
      }else{
        setActualSongAndPlayAudio(0)
      }
    }
   
  }

  const genRandomIndex = ():number => {
    return Math.floor(Math.random() * songs.length)
  }

  const setActualSongAndPlayAudio = (indexSong: number) => {
    setActualSongReproducing(songsRef.current[indexSong])
    playAudio(songsRef.current[indexSong].routeSong)
  }

  const startAlbum = async (dataAlbum: Imports.TypeAlbumn,song: Imports.Song) => {
    await stopAndUnloadVideo()
    changeAlbumReproducing(dataAlbum, [])
    playAudio(song.routeSong);
    setActualSongReproducing(song);
  }

  const backSong = () => {
    setLoadingNewSong(true)
    const songs = songsRef.current
    const indexSong =  actualSongReproducingRef.current.id - 1
    if(indexSong - 1 < 0){
        setActualSongReproducing(songs[songs.length - 1])
        playAudio(songs[songs.length - 1].routeSong)
    }else{
        setActualSongReproducing(songs[indexSong - 1])
        playAudio(songs[indexSong - 1].routeSong)
    }
  } 
  
  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  return (
    <ContextAlbumReproducing.Provider
      value={{
        songs,
        setSongs,
        playAudio,
        duration,
        position,
        isPlaying,
        actualAlbumReproducing,
        loadingNewSong,
        onSlide,
        togglePlayback,
        formatTime,
        actualSongReproducing,
        setActualSongReproducing,
        nextSong,
        backSong,
        changeAlbumReproducing,
        startAlbum,
        videoRef,
        stopAndUnloadVideo,
        setActualAlbumReproducing,
        randomSong,
        setActiveRandomSong
      }}
    >
      {children}
    </ContextAlbumReproducing.Provider>
  );
};

export { ContextAlbumReproducing, ProviderAlbumReproducing };
