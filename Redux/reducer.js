import * as actionType from "./actionTypes";

let playerState = {
  maxOpen: false,
  playerRunning: false,
  playerPlay: false,
  openPlayer: false,
  songsfetched: false,
  playerLoaded: false,
  artwork: "",
  webSongsLoaded: false,
  downloadedSongsLoaded: false,
  playerMode: "",
  openQueue: false,
  playerQueue: [],
  onlineLibrary: [],
  bottomNavBar: null,
  /// like song
  likeSongState: "",
  unlikeSongState: "",
  ///Hymns State
  hymns: [],
  loadingHymns: false,
  loadingHymnsError: false,
  hymnsFetched: false,
  /// Choral Blues
  choralBlues: [],
  loadingChoralBlues: false,
  loadingChoralBluesError: false,
  choralBluesFetched: false,
  /// Kelencha State
  kelencha: [],
  loadingKelencha: false,
  loadingKelenchaError: false,
  kelenchaFetched: false,
  //Anthems State
  anthems: [],
  loadingAnthems: false,
  loadingAnthemsError: false,
  anthemsFetched: false,
  ///Christmas Anthems
  christmasAnthems: [],
  loadingChristmasAnthems: false,
  loadingChristmasAnthemsError: false,
  christmasAnthemsFetched: false,
  ///Easter Anthems
  easterAnthems: [],
  loadingEasterAnthems: false,
  loadingEasterAnthemsError: false,
  easterAnthemsFetched: false,
  ///Classicals State
  classicals: [],
  loadingClassicals: false,
  loadingClassicalsError: false,
  classicalsFetched: false,
  searchKeyword: "",
  /// Download State
  downloadingSong: false,
  downloadingSuccess: false,
  downloadingError: false,
  downloads: [],
  downloadProgress: 0,
  /// Deleting Song State
  openDelete: false,
  deleteSong: false,
  songDeleted: false,
  fileToDelete: {
    id: 0,
    title: "",
    artist: "",
    genre: "",
    duration: "",
    composer: "",
    likes: 0,
    artwork: "",
  },
  playlist1: {
    name: "",
    data: [],
  },
};

/*
For Downloads
*/
// export const playlistReducer = (state = playerState, action) => {
//   if (action.type == actionType.CREATE_PLAYLIST) {
//     return {
//       ...state,
//       playlist1: {
//         name:action.payload.name,
//       }
//     };
//   }
//  else if(action.type == actionType.RENAME_PLAYLIST){
//       return{
//         ...state,
//         playlist1: {
//         ...state.playlist1,
//         name: action.payload
//         }
//       }
//   }
//  else if(action.type == actionType.DELETE_PLAYLIST){
//    return {
//      ...state,
//      playlist1: {
//        name:'',
//        data: []
//      }
//    }
//  }
//  else if(action.type == actionType.ADD_SONG_TO_PLAYLIST){
//    return {
//      ...state,
//      playlist1: {
//        ...state.playlist1,
//        data: action.payload.data
//     }
//    }
//  }
//   return state;
// };

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

/*
For Hymns
*/

export const hymnReducer = (state = playerState, action) => {
  if (action.type === actionType.FETCH_HYMNS_REQUEST) {
    return {
      ...state,
      loadingHymns: true,
      loadingHymnsError: false,
    };
  } else if (action.type === actionType.FETCH_HYMNS_FAILUER) {
    return {
      ...state,
      loadingHymns: false,
      loadingHymnsError: true,
    };
  } else if (action.type === actionType.FETCH_HYMNS_SUCCESS) {
    return {
      ...state,
      loadingHymns: false,
      hymns: action.payload,
      loadingHymnsError: false,
      hymnsFetched: true,
    };
  }
  return state;
};

/*
For Kelencha
*/

export const kelenchaReducer = (state = playerState, action) => {
  if (action.type === actionType.FETCH_KELENCHA_REQUEST) {
    return {
      ...state,
      loadingKelencha: true,
      loadingKelenchaError: false,
    };
  } else if (action.type === actionType.FETCH_KELENCHA_FAILUER) {
    return {
      ...state,
      loadingKelencha: false,
      loadingKelenchaError: true,
    };
  } else if (action.type === actionType.FETCH_KELENCHA_SUCCESS) {
    return {
      ...state,
      loadingKelencha: false,
      kelencha: action.payload,
      loadingKelenchaError: false,
      kelenchaFetched: true,
    };
  }
  return state;
};

/*
For Anthems
*/
export const anthemReducer = (state = playerState, action) => {
  if (action.type === actionType.FETCH_ANTHEMS_REQUEST) {
    return {
      ...state,
      loadingAnthems: true,
      loadingAnthemsError: false,
    };
  } else if (action.type === actionType.FETCH_ANTHEMS_FAILUER) {
    return {
      ...state,
      loadingAnthems: false,
      loadingAnthemsError: true,
    };
  } else if (action.type === actionType.FETCH_ANTHEMS_SUCCESS) {
    return {
      ...state,
      loadingAnthems: false,
      anthems: action.payload,
      loadingAnthemsError: false,
      anthemsFetched: true,
    };
  }
  return state;
};

/*
For Classicals
*/

export const classicalsReducer = (state = playerState, action) => {
  if (action.type === actionType.FETCH_CLASSICALS_REQUEST) {
    return {
      ...state,
      loadingClassicals: true,
      loadingClassicalsError: false,
    };
  } else if (action.type === actionType.FETCH_CLASSICALS_FAILUER) {
    return {
      ...state,
      loadingClassicals: false,
      loadingClassicalsError: true,
    };
  } else if (action.type === actionType.FETCH_CLASSICALS_SUCCESS) {
    return {
      ...state,
      loadingClassicals: false,
      classicals: action.payload,
      loadingClassicalsError: false,
      classicalsFetched: true,
    };
  }
  return state;
};

/*
For Player
*/
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
  } else if (action.type == actionType.OPEN_DELETE) {
    return {
      ...state,
      openDelete: true,
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
      openDelete: false,
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

export const easterAnthemsReducer = (state = playerState, action) => {
  if (action.type == actionType.FETCH_EASTER_ANTHEMS_FAILURE) {
    return {
      ...state,
      loadingEasterAnthemsError: true,
      loadingEasterAnthems: false,
    };
  } else if (action.type == actionType.FETCH_EASTER_ANTHEMS_SUCCESS) {
    return {
      ...state,
      loadingEasterAnthems: false,
      loadingEasterAnthemsError: false,
      easterAnthemsFetched: true,
      easterAnthems: action.payload,
    };
  } else if (action.type == actionType.FETCH_EASTER_ANTHEMS_REQUEST) {
    return {
      ...state,
      loadingEasterAnthems: true,
      loadingEasterAnthemsError: false,
    };
  }
  return state;
};

export const christmasAnthemsReducer = (state = playerState, action) => {
  if (action.typ == actionType.FETCH_CHRISTMAS_ANTHEMS_REQUEST) {
    return {
      ...state,
      loadingChristmasAnthemsError: false,
      loadingChristmasAnthems: true,
    };
  } else if (action.type == actionType.FETCH_CHRISTMAS_ANTHEMS_SUCCESS) {
    return {
      ...state,
      loadingChristmasAnthems: false,
      loadingChristmasAnthemsError: false,
      christmasAnthemsFetched: true,
      christmasAnthems: action.payload,
    };
  } else if (action.type == actionType.FETCH_CHRISTMAS_ANTHEMS_FAILURE) {
    return {
      ...state,
      loadingChristmasAnthemsError: true,
      loadingChristmasAnthems: false,
    };
  }
  return state;
};

export const choralBluesReducer = (state = playerState, action) => {
  if (action.type == actionType.FETCH_CHORAL_BLUES_REQUEST) {
    return {
      ...state,
      loadingChoralBlues: true,
      loadingChoralBluesError: false,
    };
  } else if (action.type == actionType.FETCH_CHORAL_BLUES_SUCCESS) {
    return {
      ...state,
      choralBlues: action.payload,
      choralBluesFetched: true,
      loadingChoralBluesError: false,
      loadingChoralBlues: false,
    };
  } else if (action.type == actionType.FETCH_CHORAL_BLUES_FAILURE) {
    return {
      ...state,
      loadingChoralBlues: false,
      loadingChoralBluesError: true,
    };
  }
  return state;
};
