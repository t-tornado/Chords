import * as actionType from "../actionTypes"

export function playSong() {
  return {
    type: actionType.PLAY_SONG,
  };
}


export function pauseSong() {
  return {
    type: actionType.PAUSE_SONG,
  };
}

export function runPlayer() {
    return {
        type: actionType.RUN_PLAYER,
    }
}

export function loadApp() {
  return {
    type: actionType.LOAD_APP
  }
}

export function setKeyword(keyword) {
  return {
    type: actionType.SET_SEARCH_KEYWORD,
    payload: keyword
  }
}

export function loadPlayer(){
  return {
    type: actionType.LOAD_PLAYER
  }
}

export function refreshPlayer() {
  return {
    type: actionType.REFRESH_PLAYER
  }
}

export const setArtwork = (artwork) => {
  return {
    type: actionType.SET_ARTWORK,
    payload: artwork
  }
}



export const loadWebSongs = () => {
  return {
    type: actionType.LOAD_WEB_SONGS
  }
}


export const loadDownloadedSongs = () => {
  return {
    type: actionType.LOAD_DOWNLOADED_SONGS
  }
}

export const resetLoadedStates = () => {
  return {
    type: actionType.RESET_PLAYER_LOADED_STATES
  }
}

export const openMax = () => {
  return {
    type :actionType.OPEN_MAX
  }
}

export const closeMax = () => {
  return {
    type :actionType.CLOSE_MAX
  }
}

export const launchOnline = () => {
  return {
    type: actionType.LAUNCH_ONLINE
  }
}

export const launchOffline = () => {
  return {
    type: actionType.LAUNCH_OFFLINE
  }
}

export const likeSongSuccess = () => {
  return {
    type: actionType.LIKE_SONG_SUCCESS
  }
}

export const likeSongFailed = () => {
  return {
    type: actionType.LIKE_SONG_FAILURE
  }
}

export const unlikeSongSuccess = () => {
  return {
    type: actionType.UNLIKE_SONG_SUCCESS
  }
}
 
export const unlikeSongFailed = () => {
  return {
    type: actionType.UNLIKE_SONG_FAILURE
  }
}

export const resetLikeUnlike = () => {
  return {
    type: actionType.RESET_LIKE_UNLIKE
  }
}

export const openQueue = () => {
  return {
    type: actionType.OPEN_QUEUE 
  }
}

export const closeQueue = () => {
  return {
    type: actionType.CLOSE_QUEUE
  }
}

export const updateQueue = (queue) => {
  return {
    type:actionType.UPDATE_QUEUE,
    payload: queue
  }
}