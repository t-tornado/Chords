import { createSelector } from "reselect";
///Selectors for redux-store
export const playSelector = (state) => state.playerPlay;
export const openPlayerSelector = (state) => state.openPlayer;
export const runSelector = (state) => state.playerRunning;
const storeSongs = (state) => state;
const loadPlayerSelector = (state) => state.playerLoaded;
const artworkSelector = (state) => state.artwork;
const webSongsLoadedSelecetor = (state) => state.webSongsLoaded;
const downloadsLoadedSelecetor = (state) => state.downloadedSongsLoaded;
const storeMaxStateSelector = (state) => state.maxOpen;
const storePlayerModeSelector = (state) => state.playerMode;
const storeLikeSongSelector = (state) => state.likeSongState;
const storeUnlikeStateSelector = (state) => state.unlikeSongState;
const storeOpenQueueSelector = (state) => state.openQueue;
const storeQueueSelector = (state) => state.playerQueue;
const storeOnlineLibSelector = (state) => state.onlineLibrary;
const storeBottomNavBarSelector = (state) => state.bottomNavBar;

/// Selectors for loading songs error
const errorLoadingHymnsSelector = (state) => state.loadingHymnsError;
const errorLoadingKelenchaSelector = (state) => state.loadingKelenchaError;
const errorLoadingAnthemsSelector = (state) => state.loadingAnthemsError;
const errorLoadingClassicalsSelector = (state) => state.loadingClassicalsError;
const errorLoadingChristmasAnthemsSelector = (state) =>
  state.loadingChristmasAnthemsError;
const errorLoadingEasterAnthemsSelector = (state) =>
  state.loadingEasterAnthemsError;
const errorLoadingChoralBluesSelector = (state) =>
  state.loadingChoralBluesError;

/// selectors for songs fetched state
const fetchedHymnsSelector = (state) => state.hymnsFetched;
const anthemsFetchedSelector = (state) => state.anthemsFetched;
const classicalsFetchedSelector = (state) => state.classicalsFetched;
const kelencahFetchedSelector = (state) => state.kelenchaFetched;
const easterAnthemsFetchedSelector = (state) => state.easterAnthemsFetched;
const christmasAnthemsFetchedSelector = (state) =>
  state.christmasAnthemsFetched;
const choralBluesFetchedSelector = (state) => state.choralBluesFetched;

/// Store Selectors
const kelenchaSelector = (state) => state.kelencha;
const hymnsSelector = (state) => state.hymns;
const anthemsSelector = (state) => state.anthems;
const classicalsSelector = (state) => state.classicals;
const christmasAnthemsSelector = (state) => state.christmasAnthems;
const easterAnthemsSelector = (state) => state.easterAnthems;
const choralBlesSelector = (state) => state.choralBlues;
/// Loading Songs Selectors
const loadingKelenchaSelector = (state) => state.loadingKelencha;
const loadingHymnsSelector = (state) => state.loadingHymns;
const loadingAnthemsSelector = (state) => state.loadingAnthems;
const loadingClassicalsSelector = (state) => state.loadingClassicals;
const loadingChristmasAnthems = (state) => state.loadingChristmasAnthems;
const loadingEasterAnthems = (state) => state.loadingEasterAnthems;
const loadingChoralBluesSelector = (state) => state.loadingChoralBlues;

/// reselect Funcs for Fetching Songs
export const getAnthems = createSelector(anthemsSelector, (anthems) => anthems);
export const getHymns = createSelector(hymnsSelector, (hymns) => hymns);
export const getKelencha = createSelector(
  kelenchaSelector,
  (kelencha) => kelencha
);
export const getClassicals = createSelector(
  classicalsSelector,
  (classicals) => classicals
);
export const getChristmasAnthems = createSelector(
  christmasAnthemsSelector,
  (christmasAnthems) => christmasAnthems
);
export const getEasterAnthems = createSelector(
  easterAnthemsSelector,
  (easterAnthems) => easterAnthems
);
export const getChoralBlues = createSelector(
  choralBlesSelector,
  (choralBlues) => choralBlues
);

/// reselect Funcs for Player state
export const getPlayerPlaying = createSelector(playSelector, (play) => play);
export const getPlayerRunning = createSelector(
  runSelector,
  (running) => running
);
export const getPlayerLoaded = createSelector(
  loadPlayerSelector,
  (loaded) => loaded
);
export const getArtwork = createSelector(artworkSelector, (work) => work);
export const getWebLoadedState = createSelector(
  webSongsLoadedSelecetor,
  (state) => state
);
export const getDownloadsLoadedState = createSelector(
  downloadsLoadedSelecetor,
  (state) => state
);
export const getStoreMaxState = createSelector(
  storeMaxStateSelector,
  (state) => state
);
export const getStorePlayerMode = createSelector(
  storePlayerModeSelector,
  (mode) => mode
);
export const getLikeSongState = createSelector(
  storeLikeSongSelector,
  (state) => state
);
export const getUnlikeSongState = createSelector(
  storeUnlikeStateSelector,
  (state) => state
);
export const getQueueState = createSelector(
  storeOpenQueueSelector,
  (state) => state
);
export const getStoreQueue = createSelector(
  storeQueueSelector,
  (queue) => queue
);
export const getStoreOnlineLib = createSelector(
  storeOnlineLibSelector,
  (lib) => lib
);
export const getStoreNavBarState = createSelector(
  storeBottomNavBarSelector,
  (state) => state
);

/// RESELECT FOR SONGS FETCHED STATE
export const getAnthemsFetchedState = createSelector(
  anthemsFetchedSelector,
  (state) => state
);
export const getKelenchaFetchedState = createSelector(
  kelencahFetchedSelector,
  (state) => state
);
export const getClassicalsFetchedState = createSelector(
  classicalsFetchedSelector,
  (state) => state
);
export const getHymnsFetchedState = createSelector(
  fetchedHymnsSelector,
  (state) => state
);
export const getChristmasAnthemsFetchedState = createSelector(
  christmasAnthemsFetchedSelector,
  (state) => state
);
export const getEasterAnthemsFetchedState = createSelector(
  easterAnthemsFetchedSelector,
  (state) => state
);
export const getChoralBluesFetchedState = createSelector(
  choralBluesFetchedSelector,
  (state) => state
);

//// reselect Funcs for songs State
export const getLoadingHymns = createSelector(
  loadingHymnsSelector,
  (loading) => loading
);
export const getLoadingAnthems = createSelector(
  loadingAnthemsSelector,
  (loading) => loading
);
export const getLoadingKelencha = createSelector(
  loadingKelenchaSelector,
  (loading) => loading
);
export const getLoadingClassicals = createSelector(
  loadingClassicalsSelector,
  (loading) => loading
);
export const getLoadingChristmasAnthems = createSelector(
  loadingChristmasAnthems,
  (loading) => loading
);
export const getLoadingEasterAnthems = createSelector(
  loadingEasterAnthems,
  (loading) => loading
);
export const getLoadingChoralBlues = createSelector(
  loadingChoralBluesSelector,
  (loading) => loading
);

/// reselect Funcs for Song Error
export const getErrorLoadingHymns = createSelector(
  errorLoadingHymnsSelector,
  (error) => error
);
export const getErrorLoadingKelencha = createSelector(
  errorLoadingKelenchaSelector,
  (error) => error
);
export const getErrorLoadingAnthems = createSelector(
  errorLoadingAnthemsSelector,
  (error) => error
);
export const getErrorLoadingClassicals = createSelector(
  errorLoadingClassicalsSelector,
  (error) => error
);
export const getErrorLoadingChristmasAnthems = createSelector(
  errorLoadingChristmasAnthemsSelector,
  (error) => error
);
export const getErrorLoadingEasterAnthems = createSelector(
  errorLoadingEasterAnthemsSelector,
  (error) => error
);
export const getErrorLoadingChoralBlues = createSelector(
  errorLoadingChoralBluesSelector,
  (error) => error
);

/// reselect Func for all songs
export const getAllSongs = createSelector(storeSongs, (state) => {
  let anthems = state.anthems.anthems;
  let hymns = state.hymns.hymns;
  let kelencha = state.kelencha.kelencha;
  let classicals = state.classicals.classicals;
  let easterAnthems = state.easterAnthems.easterAnthems;
  let christmasAnthems = state.christmasAnthems.christmasAnthems;
  let choralBlues = state.choralBlues.choralBlues;
  let allSongs = anthems.concat(
    kelencha,
    classicals,
    hymns,
    easterAnthems,
    christmasAnthems,
    choralBlues
  );

  return allSongs;
});

/// SEARCH SELECTORS AND RESELECT FUNCS
export const getSearchedSongs = (state, keyword) => {
  const songs = getAllSongs(state);
  const newSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(keyword.toLowerCase())
  );
  return newSongs;
};

const searchKeywordSelector = (state) => state.searchKeyword;
export const getSearchKeyword = createSelector(
  searchKeywordSelector,
  (keyword) => keyword
);

/// FETCH DOWNLOADS SELECTOR AND RESELECT FUNCS
export const getDownloadsSelector = (state) => state.downloads;
const downloadSuccessStateSelector = (state) => state.downloadingSuccess;
const downloadProgressSelector = (state) => state.downloadProgress;
const downloadingSongStateSelector = (state) => state.downloadingSong;
export const getAllDownloads = createSelector(
  getDownloadsSelector,
  (downloads) => downloads
);
export const getDownloadSuccessState = createSelector(
  downloadSuccessStateSelector,
  (state) => state
);
export const getDownloadProgress = createSelector(
  downloadProgressSelector,
  (progress) => progress
);
export const getDownloadingSongState = createSelector(
  downloadingSongStateSelector,
  (state) => state
);

/// DELETE SELECTORS AND RESELECT FUNCTIONS
const openDeleteSelector = (state) => state.openDelete;
const songDeletedSelector = (state) => state.songDeleted;
const fileToDeleteSelector = (state) => state.fileToDelete;
export const getSongDeleted = createSelector(
  songDeletedSelector,
  (delState) => delState
);
export const getOpenDeleteState = createSelector(
  openDeleteSelector,
  (openDel) => openDel
);
export const getFileToDelete = createSelector(
  fileToDeleteSelector,
  (file) => file
);

/**
 * offline selectors and Funcs
 */

export const getOfflineSearchedSongs = (state, keyword) => {
  const songs = getAllDownloads(state.downloads);
  const newSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(keyword.toLowerCase())
  );
  return newSongs;
};
