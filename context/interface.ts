import { Song, TypeAlbumn } from "../types"

interface albumReproducing {
    songs: Song[],
    actualSongReproducing: Song,
    actualAlbumReproducing: TypeAlbumn,
    duration: number,
    position: number,
    isPlaying: boolean,
    loadingNewSong: boolean,
    //actualVideoUri: number,
    randomSong: boolean,
    setActualSongReproducing: React.Dispatch<React.SetStateAction<Song>>,
    setSongs: React.Dispatch<React.SetStateAction<Song[]>>,
    playAudio: (routeSong: string) => void,
    togglePlayback: () => void,
    onSlide: (value: number) => void,
    formatTime: (millis: number) => string,
    nextSong: () => void,
    changeAlbumReproducing: (dataAlbum: TypeAlbumn, allSongs: Song[]) => void,
    backSong: () => void,
    startAlbum: (dataAlbum: TypeAlbumn, song: Song) => void,
    videoRef: any
    stopAndUnloadVideo: () => void,
    setActualAlbumReproducing: (album: TypeAlbumn) => void,
    setActiveRandomSong: (active: boolean) => void
}

export default albumReproducing