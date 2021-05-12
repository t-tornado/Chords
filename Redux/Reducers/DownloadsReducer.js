import * as actionType from '../ActionTypes'
import {playerState} from '../MainAppState'

export const downlaodsReducer = (state = playerState, action) => {
    if (action.type == actionType.DOWNLOAD_SONG_REQUEST) {
      return {
        ...state,
        downloadingSong: true,
        downloadingError: false,
      };
    } else if (action.type == actionType.DOWNLOAD_SONG_SUCCESS) {
      return {
        ...state,
        downloadingSong: false,
        downloadingError: false,
        downloadingSuccess: true,
        downloads: state.downloads.concat(action.payload),
      };
    } else if (action.type == actionType.DOWNLOAD_SONG_FAILURE) {
      return {
        ...state,
        downloadingSong: false,
        downloadingError: true,
        downloadingSuccess: false,
      };
    } else if (action.type == actionType.INITIAL_LOAD_SUCCESS) {
      return {
        ...state,
        downloads: action.payload,
      };
    } else if (action.type == actionType.LOAD_PLAYER) {
      return {
        ...state,
        playerLoaded: true,
      };
    } else if (action.type == actionType.REFRESH_PLAYER) {
      return {
        ...state,
        playerLoaded: false,
      };
    } else if (action.type == actionType.DELETE_SONG_REQUEST) {
      return {
        ...state,
        deleteSong: true,
        songDeleted: false,
      };
    } else if (action.type == actionType.DELETE_SONG_SUCCESS) {
      return {
        ...state,
        deleteSong: false,
        songDeleted: true,
        downloads: state.downloads.filter((file) => file.id != action.payload),
      };
    } else if (action.type == actionType.AFTER_DELETE_SUCESS) {
      return {
        ...state,
        songDeleted: false,
      };
    } else if (action.type == actionType.INITIAL_LOAD_REQ) {
      return {
        ...state,
      };
    } else if (action.type == actionType.AFTER_DOWNLOAD_SUCCESS) {
      return {
        ...state,
        downloadingSuccess: false,
      };
    } else if (action.type == actionType.SET_DOWNLOAD_PROGRESS) {
      return {
        ...state,
        downloadProgress: action.payload,
      };
    } else if (action.type == actionType.UPDATE_ONLINE_LIB) {
      return {
        ...state,
        onlineLibrary: action.payload,
      };
    }
    return state;
  };