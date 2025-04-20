import songsBeegees from "./beegees";
import songsKiss from "./kiss";
import songsLauraBranigan from "./laura_branigan";
import songsMichaelJackson from "./michael_jackson";
import songsModernTalking from "./modern_talking";
import songsQueen from "./queen";
import songsStarship from "./starship";
import songsTheOutfield from "./the_outflied";
import songsTheBeatles from "./theBeatles";

export type TypeAlbumn = {
    id: number;
    name: string;
    routeImage: string; 
};

export type Song = {
  id: number;
  name: string;
  routeSong: any;
  routeVideo: any;
};

export type ListAllSongsAllAlbums = {
  song: Song[]
}
  
  const Albums: TypeAlbumn[] = [
    {
      id: 1,
      name: "Beegees",
      routeImage: "BeeGees-credit-Michael-Ochs.webp"
    },
    {
      id: 2,
      name: "Modern Talking",
      routeImage: "modernTalkingImage.webp"
    },
    {
      id: 3,
      name: "Bon jovi",
      routeImage: "bon-jovi.webp"
    },
    {
      id: 4,
      name: "Kiss",
      routeImage: "kiss.webp"
    },
    {
      id: 5,
      name: "Laura Branigan",
      routeImage: "laura_branigan.webp"
    },
    {
      id: 6,
      name: "Michael Jackson",
      routeImage: "michael_jackson.webp"
    },
    {
      id: 7,
      name: "Queen",
      routeImage: "queen.webp"
    },
    {
      id: 8,
      name: "Starship",
      routeImage: "starship.webp"
    },
    {
      id: 9,
      name: "The Beatles",
      routeImage: "the_beatles.webp"
    },
    {
      id: 10,
      name: "The Outfield",
      routeImage: "the_outfield.webp"
    },
  ];

export const allSongsAllAlbums = [
  [...songsBeegees.songs],
  [...songsKiss.songs],
  [...songsLauraBranigan.songs],
  [...songsMichaelJackson.songs],
  [...songsModernTalking.songs],
  [...songsQueen.songs],
  [...songsStarship.songs],
  [...songsTheBeatles.songs],
  [...songsTheOutfield.songs]
]


export const imageMap: Record<string, any> = {
  "BeeGees-credit-Michael-Ochs.webp": require("../assets/beegees/image/BeeGees-credit-Michael-Ochs.webp"),
  "modernTalkingImage.webp": require("../assets/modern_talking/image/modernTalkingImage.webp"),
  "bon-jovi.webp": require("../assets/bon_jovi/image/bon-jovi.webp"),
  "kiss.webp": require("../assets/kiss/image/kiss.webp"),
  "laura_branigan.webp": require("../assets/laura_branigan/image/laura_branigan.webp"),
  "michael_jackson.webp": require("../assets/michael_jackson/image/michael_jackson.webp"),
  "queen.webp": require("../assets/queen/image/queen.jpg"),
  "starship.webp": require("../assets/starship/image/starship.webp"),
  "the_beatles.webp": require("../assets/the_beatles/image/the_beatles.webp"),
  "the_outfield.webp": require("../assets/the_outfield/image/the_outfield.webp"),
};
  
  export default Albums;
  