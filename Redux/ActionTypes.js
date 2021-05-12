export const PLAY_SONG = "songPlay";
export const PAUSE_SONG = "songPause";
export const RUN_PLAYER = "runPlayer";
export const SONG_STOP = "songStop";
export const LOAD_APP = "loadapp";
export const LOAD_PLAYER = "loadPlayer";
export const REFRESH_PLAYER = "playerRefresh";
export const SET_ARTWORK = "setArtwork";
export const LIKE_SONG = "likeSong";
export const UNLIKE_SONG = "unlikeSong";
export const LOAD_DOWNLOADED_SONGS = "loadDowloadedSongs";
export const LOAD_WEB_SONGS = "loadWebSongs";
export const RESET_PLAYER_LOADED_STATES = "resetLoadedStates";
export const OPEN_MAX = "openMaxPlayer";
export const CLOSE_MAX = "closeMaxPlayer";
export const LAUNCH_ONLINE = "launchPlayerOnline";
export const LAUNCH_OFFLINE = "launchPlayerOffline";
export const LIKE_SONG_SUCCESS = "songLikedSuccessfully";
export const LIKE_SONG_FAILURE = "songLikeFailed";
export const UNLIKE_SONG_SUCCESS = "songUnlikedSuccessfully";
export const UNLIKE_SONG_FAILURE = "songUnlikeFailed";
export const RESET_LIKE_UNLIKE = "resetLikeAdUnlike";
export const OPEN_QUEUE = "openPlayerQueue";
export const CLOSE_QUEUE = "closePlayerQueue";
export const UPDATE_QUEUE = "updateSongQueue";
export const UPDATE_ONLINE_LIB = "updateOnlineLibrary";
export const UPDATE_NAVBAR_STATE = "updateBottomNavBarState";

/**
 * 
 * Fetching genre action types
 * 
 */

//Hymns
export const FETCH_HYMNS_REQUEST = "fetchHymnsRequest";
export const FETCH_HYMNS_SUCCESS = "fetchHymnsSuccess";
export const FETCH_HYMNS_FAILUER = "fetchHymnsfailure";
//Highlifes
export const FETCH_KELENCHA_REQUEST = "fetchKelenchaRequest";
export const FETCH_KELENCHA_SUCCESS = "fetchKelenchaSuccess";
export const FETCH_KELENCHA_FAILUER = "fetchKelenchafailure";
//Anthems
export const FETCH_ANTHEMS_REQUEST = "fetchAnthemsRequest";
export const FETCH_ANTHEMS_SUCCESS = "fetchAnthemsSuccess";
export const FETCH_ANTHEMS_FAILURE = "fetchAnthemsfailure";
//Classicals
export const FETCH_CLASSICALS_REQUEST = "fetchClassicalsRequest";
export const FETCH_CLASSICALS_SUCCESS = "fetchClassicalsSuccess";
export const FETCH_CLASSICALS_FAILUER = "fetchClassicalsfailure";
//Christmas anthems
export const FETCH_CHRISTMAS_ANTHEMS_REQUEST = "fetchChristmasAnthemsRequest";
export const FETCH_CHRISTMAS_ANTHEMS_SUCCESS = "fetchChristmasAnthemsSuccess";
export const FETCH_CHRISTMAS_ANTHEMS_FAILURE = "fetchChristmasAnthemsFailure";
//Easter anthems
export const FETCH_EASTER_ANTHEMS_REQUEST = "fetchEasterAnthemsRequest";
export const FETCH_EASTER_ANTHEMS_SUCCESS = "fetchEasterAnthemsSuccess";
export const FETCH_EASTER_ANTHEMS_FAILURE = "fetchEasterAnthemsFailure";
//choral blues(slow rock)
export const FETCH_CHORAL_BLUES_REQUEST = "fetchChoralBluesRequest";
export const FETCH_CHORAL_BLUES_SUCCESS = "fetchChoralBluesSuccess";
export const FETCH_CHORAL_BLUES_FAILURE = "fetchChoralBluesFailure";

export const SET_SEARCH_KEYWORD = "setSearchKeyword";
///DOWNLOAD ACTIONS
export const DOWNLOAD_SONG_REQUEST = "downloadSongRequest";
export const DOWNLOAD_SONG_SUCCESS = "downloadSongSuccess";
export const DOWNLOAD_SONG_FAILURE = "downloadSongFailure";
export const ADD_TO_DOWNLOADS = "addSongsToDownloads";
export const ON_INITIAL_LOAD_DOWNLOAD = "onInitialLoadDownloads";
export const INITIAL_LOAD_REQ = "initialLoadRequest";
export const INITIAL_LOAD_SUCCESS = "initialLoadFinisshed";
export const AFTER_DOWNLOAD_SUCCESS = "afterDownloadSuccess";
export const SET_DOWNLOAD_PROGRESS = "setDownloadProgress";
///DELETE ACTIONS
export const DELETE_SONG_REQUEST = "deletSongRequest";
export const DELETE_SONG_SUCCESS = "deleteSongSuccess";
export const OPEN_DELETE = "openDelete";
export const CLOSE_DELETE = "closeDelete";
export const AFTER_DELETE_SUCESS = "afterDeleteSuccess";
