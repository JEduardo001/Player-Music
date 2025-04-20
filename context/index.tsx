
import { Audio } from 'expo-av';
import type { Video as VideoType } from 'expo-av';
import { AppState } from "react-native";
import React from "react";
import { Song, TypeAlbumn } from "../types";

import songsBeegees from '../types/beegees/index';
import songsModernTalking from "../types/modern_talking";
import songsBonJovi from "../types/bon_jovi";
import songsKiss from "../types/kiss";
import songsLauraBranigan from "../types/laura_branigan";
import songsMichaelJackson from "../types/michael_jackson";
import songsQueen from "../types/queen";
import songsStarship from "../types/starship";
import songsTheOutfield from "../types/the_outflied";
import songsTheBeatles from "../types/theBeatles";

import albumReproducing from "./interface";

export {
  Audio,
  AppState,
  React,
  Song,
  TypeAlbumn,
  songsBeegees,
  songsModernTalking,
  songsBonJovi,
  songsKiss,
  songsLauraBranigan,
  songsMichaelJackson,
  songsQueen,
  songsStarship,
  songsTheOutfield,
  songsTheBeatles,
  albumReproducing,
};

export type {
  VideoType
};
