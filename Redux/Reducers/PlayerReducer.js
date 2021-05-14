import * as actionType from '../ActionTypes'
import {playerState} from '../MainAppState'

export const playerReducer = (state = playerState, action) => {
    if (action.type == actionType.PLAY_SONG) {
      return {
        ...state,
        playerPlay: true,
        playerRunning: true,
      };
    } else if (action.type == actionType.PAUSE_SONG) {
      return {
        ...state,
        playerPlay: false,
        playerRunning: true,
      };
    } else if (action.type == actionType.RUN_PLAYER) {
      return {
        ...state,
        playerRunning: true,
        playerPlay: true,
      };
    } else if (action.type == actionType.LOAD_APP) {
      return {
        ...state,
        openPlayer: true,
      };
    } else if (action.type == actionType.SET_SEARCH_KEYWORD) {
      return {
        ...state,
        searchKeyword: action.payload,
      };
    } else if (action.type == actionType.OPEN_DOWNLOADED_SONG_OPTION) {
      return {
        ...state,
        openCardOptions: true,
        fileToDelete: {
          ...state.fileToDelete,
          id: action.payload.id,
          title: action.payload.title,
          artist: action.payload.artist,
          genre: action.payload.genre,
          duration: action.payload.duration,
          composer: action.payload.composer,
          likes: action.payload.likes,
          artwork: action.payload.artwork,
        },
      };
    } else if (action.type == actionType.CLOSE_DELETE) {
      return {
        ...state,
        openCardOptions: false,
      };
    } else if (action.type == actionType.SET_ARTWORK) {
      return {
        ...state,
        artwork: action.payload,
      };
    } else if (action.type == actionType.LIKE_SONG) {
      return {
        ...state,
        likeSong: true,
      };
    } else if (action.type == actionType.UNLIKE_SONG) {
      return {
        ...state,
        likeSong: false,
      };
    } else if (action.type == actionType.LOAD_DOWNLOADED_SONGS) {
      return {
        ...state,
        downloadedSongsLoaded: true,
      };
    } else if (action.type == actionType.LOAD_WEB_SONGS) {
      return {
        ...state,
        webSongsLoaded: true,
      };
    } else if (action.type == actionType.RESET_PLAYER_LOADED_STATES) {
      return {
        ...state,
        downloadedSongsLoaded: false,
        webSongsLoaded: false,
      };
    } else if (action.type == actionType.OPEN_MAX) {
      return {
        ...state,
        maxOpen: !state.maxOpen,
      };
    } else if (action.type == actionType.CLOSE_MAX) {
      return {
        ...state,
        maxOpen: false,
      };
    } else if (action.type == actionType.LAUNCH_ONLINE) {
      return {
        ...state,
        playerMode: "online",
      };
    } else if (action.type == actionType.LAUNCH_OFFLINE) {
      return {
        ...state,
        playerMode: "offline",
      };
    } else if (action.type == actionType.LIKE_SONG_SUCCESS) {
      return {
        ...state,
        likeSongState: "success",
        unlikeSongState: "",
      };
    } else if (action.type == actionType.LIKE_SONG_FAILURE) {
      return {
        ...state,
        likeSongState: "failed",
      };
    } else if (action.type == actionType.UNLIKE_SONG_FAILURE) {
      return {
        ...state,
        unlikeSongState: "failed",
      };
    } else if (action.type == actionType.UNLIKE_SONG_SUCCESS) {
      return {
        ...state,
        unlikeSongState: "success",
      };
    } else if (action.type == actionType.RESET_LIKE_UNLIKE) {
      return {
        ...state,
        likeSongState: "",
        unlikeSongState: "",
      };
    } else if (action.type == actionType.OPEN_QUEUE) {
      return {
        ...state,
        openQueue: true,
      };
    } else if (action.type == actionType.CLOSE_QUEUE) {
      return {
        ...state,
        openQueue: false,
      };
    } else if (action.type == actionType.UPDATE_QUEUE) {
      return {
        ...state,
        playerQueue: action.payload,
      };
    } else if (action.type == actionType.UPDATE_NAVBAR_STATE) {
      return {
        ...state,
        bottomNavBar: action.payload,
      };
    }
    return state;
  };
  