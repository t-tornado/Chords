import React, { useContext, useState } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import {
  getPlayerPlaying,
  getPlayerRunning,
  getAllSongs,
  getAllDownloads,
  getPlayerLoaded,
  getSongDeleted,
  getOpenDeleteState,
  getFileToDelete,
  getDownloadSuccessState,
  getDownloadProgress,
  getDownloadingSongState,
  getLikeSongState,
  getDownloadsLoadedState,
  getWebLoadedState,
  getStoreMaxState,
  getStorePlayerMode,
  getUnlikeSongState,
  getQueueState,
  getStoreQueue,
  getStoreOnlineLib,
  getAnthemsFetchedState,
  getHymnsFetchedState,
  getClassicalsFetchedState,
  getKelenchaFetchedState,
  getEasterAnthems,
  getEasterAnthemsFetchedState,
  getChristmasAnthemsFetchedState,
  getChoralBluesFetchedState,
  getAnthems,
  getKelencha,
  getClassicals,
  getHymns,
  getChristmasAnthems,
  getChoralBlues,
  getStoreNavBarState,
} from "../Redux/Selector/PlaySelector";

import {
  playSong,
  pauseSong,
  setKeyword,
  loadPlayer,
  loadDownloadedSongs,
  loadWebSongs,
  unloadDownloadedSongs,
  unloadWebSongs,
  openMax,
  closeMax,
  launchOnline,
  launchOffline,
  addFavorite,
  removeFromFav,
  likeSongSuccess,
  likeSongFailed,
  unlikeSongSuccess,
  unlikeSongFailed,
  resetLikeUnlike,
  openQueue,
  closeQueue,
  updateQueue,
  refreshPlayer,
  resetLoadedStates,
  updateBottomNavBarState,
} from "../Redux/Actions/MainPlayerActions";
import TrackPlayer, {
  useTrackPlayerProgress,
  CAPABILITY_PLAY,
  CAPABILITY_PAUSE,
  CAPABILITY_SKIP_TO_NEXT,
  CAPABILITY_SKIP_TO_PREVIOUS,
  CAPABILITY_STOP,
  CAPABILITY_PLAY_FROM_ID,
  CAPABILITY_SKIP,
} from "react-native-track-player";
import {
  downloadSong,
  initialLoad,
  downloadSongSuccess,
  afterDownloadSuccess,
  onlineLoadFromDir,
  updateStoreOnlineLib,
} from "../Redux/Actions/DownloadActions";
import {
  deleteSong,
  openDelete,
  closeDelete,
  deleteFileSuccess,
  afterDeleteSuccess,
} from "../Redux/Actions/DeleteActions";

// import {
//   PauseIcon,
//   PlayIcon,
//   PreviousIcon,
//   NextIcon,
//   StopIcon,
// } from "../Components/Notifications/Icons";
import { db } from "../Config/Firebase";
var RNFS = require("react-native-fs");
const downloadsPath = RNFS.DocumentDirectoryPath + "/DownloadedSongs";

const TrackContext = React.createContext();
const TrackUpdateContext = React.createContext();
const TrackPlayContext = React.createContext();
export const TrackPauseContext = React.createContext();
const allSongsContext = React.createContext();
const SearchDispatchContext = React.createContext();
const DownloadContext = React.createContext();
const DownloadedSongsContext = React.createContext();
const DownloadingSongSuccessContext = React.createContext();
const LoadFromDirContext = React.createContext();
const LoadPlayerStateContext = React.createContext();
const LoadPlayerActionContext = React.createContext();
const RefreshPlayerActionContext = React.createContext();
const OpenDeleteStateContext = React.createContext();
const DeleteSongActionContext = React.createContext();
const SongDeletedStateContext = React.createContext();
const openDeletContext = React.createContext();
const closeDeleteContext = React.createContext();
const FileToDeleteContext = React.createContext();
const afterDownloadSuccessAcion = React.createContext();
const afterDeleteSuccessAction = React.createContext();
const getDownloadProgressContext = React.createContext();
const DownloadingSongState = React.createContext();
const WebLoadedContext = React.createContext();
const DownloadsLoadedContext = React.createContext();
const ResetWebAndDownloadsLoadedContext = React.createContext();
const dispatchDownloadsLoaded = React.createContext();
const dispatchWebSongsLoaded = React.createContext();
const SongsFetchedStatesContext = React.createContext();
const FetchedSongsContext = React.createContext();
const updateStoreNavBarContext = React.createContext();
const StoreBottomNavBarStateContext = React.createContext();
/// PLAYER OPTIONS
const GetLikeSongStateContext = React.createContext();
const GetUnlikeSongStateContext = React.createContext();
const openMaxPlayer = React.createContext();
const StoreMaxState = React.createContext();
const likeSongActionsContext = React.createContext();
const queueActionContext = React.createContext();
const QueueStateContext = React.createContext();
const CurrentQueueContext = React.createContext();
const onlineLoadFromDirContext = React.createContext();
const updateOnlineLibCOntext = React.createContext();
const StoreOnlineLibContext = React.createContext();
/// PLAYER MODE
const StorePlayerModeContext = React.createContext();
const dispatchPlayerOnline = React.createContext();
const dispatchPlayerOffline = React.createContext();

const TrackContextProvider = (props) => {
  const [play, setPlay] = useState(false);

  return (
    <TrackContext.Provider value={play}>
      <TrackUpdateContext.Provider value={setPlay}>
        <TrackPlayContext.Provider value={props.playerState}>
          <TrackPauseContext.Provider value={props.playerStore}>
            <allSongsContext.Provider value={props.allSongs}>
              <SearchDispatchContext.Provider value={props.setSearchKeyword}>
                <DownloadContext.Provider value={props.downloadSongAction}>
                  <DownloadedSongsContext.Provider
                    value={props.downloadedSongs}
                  >
                    <LoadFromDirContext.Provider value={props.loadFromDir}>
                      <LoadPlayerActionContext.Provider
                        value={props.loadPlayer}
                      >
                        <LoadPlayerStateContext.Provider
                          value={props.playerLoaded}
                        >
                          <OpenDeleteStateContext.Provider
                            value={props.openDeleteState}
                          >
                            <DeleteSongActionContext.Provider
                              value={props.deleteSongAction}
                            >
                              <SongDeletedStateContext.Provider
                                value={props.songDeletedState}
                              >
                                <openDeletContext.Provider
                                  value={props.openDeleteAction}
                                >
                                  <closeDeleteContext.Provider
                                    value={props.closeDeleteAction}
                                  >
                                    <FileToDeleteContext.Provider
                                      value={props.filetoDelete}
                                    >
                                      <DownloadingSongSuccessContext.Provider
                                        value={props.downloadingSuccessState}
                                      >
                                        <afterDownloadSuccessAcion.Provider
                                          value={props.afterDownloadSuccess}
                                        >
                                          <afterDeleteSuccessAction.Provider
                                            value={props.afterDeleteSuccess}
                                          >
                                            <getDownloadProgressContext.Provider
                                              value={props.downloadProgress}
                                            >
                                              <DownloadingSongState.Provider
                                                value={
                                                  props.downloadingSongState
                                                }
                                              >
                                                {/*SONG OPTIONS */}
                                                <GetLikeSongStateContext.Provider
                                                  value={props.likeSongState}
                                                >
                                                  <GetUnlikeSongStateContext.Provider
                                                    value={
                                                      props.unlikeSongState
                                                    }
                                                  >
                                                    <DownloadsLoadedContext.Provider
                                                      value={
                                                        props.getDownlaodsLoaded
                                                      }
                                                    >
                                                      <WebLoadedContext.Provider
                                                        value={
                                                          props.getWebLoaded
                                                        }
                                                      >
                                                        <dispatchDownloadsLoaded.Provider
                                                          value={
                                                            props.downloadsLoaded
                                                          }
                                                        >
                                                          <dispatchWebSongsLoaded.Provider
                                                            value={
                                                              props.webSongsLoaded
                                                            }
                                                          >
                                                            <openMaxPlayer.Provider
                                                              value={
                                                                props.openMax
                                                              }
                                                            >
                                                              <StoreMaxState.Provider
                                                                value={
                                                                  props.storeMaxState
                                                                }
                                                              >
                                                                <StorePlayerModeContext.Provider
                                                                  value={
                                                                    props.playerMode
                                                                  }
                                                                >
                                                                  <dispatchPlayerOnline.Provider
                                                                    value={
                                                                      props.playerOnline
                                                                    }
                                                                  >
                                                                    <dispatchPlayerOffline.Provider
                                                                      value={
                                                                        props.playerOffline
                                                                      }
                                                                    >
                                                                      <likeSongActionsContext.Provider
                                                                        value={
                                                                          props.likeSong
                                                                        }
                                                                      >
                                                                        <QueueStateContext.Provider
                                                                          value={
                                                                            props.queueState
                                                                          }
                                                                        >
                                                                          <queueActionContext.Provider
                                                                            value={
                                                                              props.queueAction
                                                                            }
                                                                          >
                                                                            <CurrentQueueContext.Provider
                                                                              value={
                                                                                props.storeQueue
                                                                              }
                                                                            >
                                                                              <onlineLoadFromDirContext.Provider
                                                                                value={
                                                                                  props.loadDirToOnline
                                                                                }
                                                                              >
                                                                                <updateOnlineLibCOntext.Provider
                                                                                  value={
                                                                                    props.updateOnlineLib
                                                                                  }
                                                                                >
                                                                                  <StoreOnlineLibContext.Provider
                                                                                    value={
                                                                                      props.storeOnlineLib
                                                                                    }
                                                                                  >
                                                                                    <SongsFetchedStatesContext.Provider
                                                                                      value={
                                                                                        props.fetchedStates
                                                                                      }
                                                                                    >
                                                                                      <FetchedSongsContext.Provider
                                                                                        value={
                                                                                          props.fetchedSongs
                                                                                        }
                                                                                      >
                                                                                        <RefreshPlayerActionContext.Provider
                                                                                          value={
                                                                                            props.refreshPlayer
                                                                                          }
                                                                                        >
                                                                                          <ResetWebAndDownloadsLoadedContext.Provider
                                                                                            value={
                                                                                              props.resetLoadedStates
                                                                                            }
                                                                                          >
                                                                                            <StoreBottomNavBarStateContext.Provider
                                                                                              value={
                                                                                                props.storeNavBarState
                                                                                              }
                                                                                            >
                                                                                              <updateStoreNavBarContext.Provider
                                                                                                value={
                                                                                                  props.updateStoreNavBarState
                                                                                                }
                                                                                              >
                                                                                                {
                                                                                                  props.children
                                                                                                }
                                                                                              </updateStoreNavBarContext.Provider>
                                                                                            </StoreBottomNavBarStateContext.Provider>
                                                                                          </ResetWebAndDownloadsLoadedContext.Provider>
                                                                                        </RefreshPlayerActionContext.Provider>
                                                                                      </FetchedSongsContext.Provider>
                                                                                    </SongsFetchedStatesContext.Provider>
                                                                                  </StoreOnlineLibContext.Provider>
                                                                                </updateOnlineLibCOntext.Provider>
                                                                              </onlineLoadFromDirContext.Provider>
                                                                            </CurrentQueueContext.Provider>
                                                                          </queueActionContext.Provider>
                                                                        </QueueStateContext.Provider>
                                                                      </likeSongActionsContext.Provider>
                                                                    </dispatchPlayerOffline.Provider>
                                                                  </dispatchPlayerOnline.Provider>
                                                                </StorePlayerModeContext.Provider>
                                                              </StoreMaxState.Provider>
                                                            </openMaxPlayer.Provider>
                                                          </dispatchWebSongsLoaded.Provider>
                                                        </dispatchDownloadsLoaded.Provider>
                                                      </WebLoadedContext.Provider>
                                                    </DownloadsLoadedContext.Provider>
                                                  </GetUnlikeSongStateContext.Provider>
                                                </GetLikeSongStateContext.Provider>
                                              </DownloadingSongState.Provider>
                                            </getDownloadProgressContext.Provider>
                                          </afterDeleteSuccessAction.Provider>
                                        </afterDownloadSuccessAcion.Provider>
                                      </DownloadingSongSuccessContext.Provider>
                                    </FileToDeleteContext.Provider>
                                  </closeDeleteContext.Provider>
                                </openDeletContext.Provider>
                              </SongDeletedStateContext.Provider>
                            </DeleteSongActionContext.Provider>
                          </OpenDeleteStateContext.Provider>
                        </LoadPlayerStateContext.Provider>
                      </LoadPlayerActionContext.Provider>
                    </LoadFromDirContext.Provider>
                  </DownloadedSongsContext.Provider>
                </DownloadContext.Provider>
              </SearchDispatchContext.Provider>
            </allSongsContext.Provider>
          </TrackPauseContext.Provider>
        </TrackPlayContext.Provider>
      </TrackUpdateContext.Provider>
    </TrackContext.Provider>
  );
};

/*
Player Mode Toggle
*/

export const usePlayerMode = () => {
  const state = useContext(StorePlayerModeContext);
  return state;
};

export const useSetPlayerOffline = () => {
  const dispatch = useContext(dispatchPlayerOffline);
  const Func = React.useCallback(() => {
    dispatch();
  }, [dispatch]);
  return Func;
};

export const useSetPlayerOnline = () => {
  const dispatch = useContext(dispatchPlayerOnline);
  const Func = React.useCallback(() => {
    dispatch();
  }, [dispatch]);
  return Func;
};

export const useQueueState = () => {
  const state = useContext(QueueStateContext);
  return state;
};

export const useOpenQueue = () => {
  const dispatch = useContext(queueActionContext);
  const Func = React.useCallback(
    (state) => {
      dispatch.openQueue();
    },
    [dispatch]
  );
  return Func;
};

export const useCloseQueue = () => {
  const dispatch = useContext(queueActionContext);
  const Func = React.useCallback(() => {
    dispatch.closeQueue();
  }, [dispatch]);
  return Func;
};

export const useStoreBottomNavBarState = () => {
  const state = useContext(StoreBottomNavBarStateContext);
  return state;
};

export const useUpdateBottomNavBarState = () => {
  const func = useContext(updateStoreNavBarContext);
  const Funct = React.useCallback(
    (state) => {
      func(state);
    },
    [func]
  );
  return Funct;
};

export const useSetPlayerQueue = () => {
  const dispatch = useContext(queueActionContext);
  const Func = React.useCallback(
    async (lstate) => {
      await TrackPlayer.getQueue()
        .then((queue) => {
          if (lstate) {
            dispatch.setQueue(queue);
          }
        })
        .catch(() => null);
    },
    [dispatch]
  );
  return Func;
};

export const useSkipInQueue = () => {
  const Func = React.useCallback(async (id) => {
    await TrackPlayer.skip(id)
      .then(() => {
        updatePlayerOptions();
      })
      .catch(() => {
        null;
      });
  });
  return Func;
};

export const useStoreQueue = () => {
  const queue = useContext(CurrentQueueContext);
  return queue;
};

export const useSongsFetchedState = () => {
  const state = useContext(SongsFetchedStatesContext);
  return state;
};

/**
 *
 *
 *
 * OFFLINE MODE CONTROLS
 * `
 *
 *
 */

export const useRefreshPlayer = () => {
  const context = useContext(RefreshPlayerActionContext);
  const Func = React.useCallback(() => {
    context();
  }, [context]);
  return Func;
};

export const useResetLoadedStates = () => {
  const dispatch = useContext(ResetWebAndDownloadsLoadedContext);
  const Func = React.useCallback(() => {
    dispatch();
  }, [dispatch]);
  return Func;
};

export const useSkipOffline = () => {
  const playerStore = useContext(TrackPauseContext);
  const offlineSongs = useContext(DownloadedSongsContext);
  const downloadsLoaded = useContext(dispatchDownloadsLoaded);
  const setQueue = useContext(queueActionContext);
  const loadplayer = useContext(LoadPlayerActionContext);
  let arr = [];
  const skipFunction = React.useCallback(
    async (id, playerLoadedState, downloadsLoadedState, cardDownloaded) => {
      if (!downloadsLoadedState && cardDownloaded) {
        TrackPlayer.add([...offlineSongs]).then(async () => {
          downloadsLoaded();
          loadplayer();
          await TrackPlayer.skip(id)
            .then(async () => {
              await TrackPlayer.play()
                .then(() => {
                  playerStore.play();
                  updatePlayerOptions();
                })
                .catch(() => null);
            })
            .catch(() => null);
        });
        await TrackPlayer.getQueue()
          .then((queue) => {
            setQueue.setQueue(queue);
          })
          .catch(() => null);
      }
      if (!playerLoadedState && !downloadsLoadedState) {
        TrackPlayer.add([...offlineSongs]).then(async () => {
          downloadsLoaded();
          loadplayer();
          await TrackPlayer.skip(id)
            .then(async () => {
              await TrackPlayer.play()
                .then(() => {
                  playerStore.play();
                  updatePlayerOptions();
                })
                .catch(() => null);
            })
            .catch(() => null);
        });
        await TrackPlayer.getQueue()
          .then((queue) => {
            setQueue.setQueue(queue);
          })
          .catch(() => null);
      }
      if (playerLoadedState && !downloadsLoadedState) {
        await TrackPlayer.add([...offlineSongs]).then(async () => {
          downloadsLoaded();
          loadplayer();
          await TrackPlayer.skip(id)
            .then(async () => {
              await TrackPlayer.play()
                .then(() => {
                  playerStore.play();
                  updatePlayerOptions();
                })
                .catch(() => null);
            })
            .catch(() => null);
        });
        await TrackPlayer.getQueue()
          .then((queue) => {
            setQueue.setQueue(queue);
          })
          .catch(() => null);
      }
      if (
        (playerLoadedState && downloadsLoadedState) ||
        (downloadsLoadedState && cardDownloaded)
      ) {
        await TrackPlayer.getQueue()
          .then(async (queue) => {
            const solution = queue.findIndex((song) => song.id == id);
            if (solution != -1) {
              await TrackPlayer.skip(id)
                .then(async () => {
                  await TrackPlayer.play()
                    .then(() => {
                      playerStore.play();
                      updatePlayerOptions();
                    })
                    .catch(() => null);
                })
                .catch(() => null);
            }
            if (solution == -1) {
              TrackPlayer.add([offlineSongs[solution]])
                .then(async () => {
                  await TrackPlayer.skip(id)
                    .then(async () => {
                      await TrackPlayer.play()
                        .then(() => {
                          playerStore.play();
                          updatePlayerOptions();
                        })
                        .catch(() => null);
                    })
                    .catch(() => null);
                })
                .catch(() => null);
            }
          })
          .catch(() => null);
      }
    },
    [playerStore]
  );
  return skipFunction;
};

/**
 *
 *
 *
 * ONLINE MODE CONTROLS
 *
 *
 *
 */

export const resetPlayer = () => {
  TrackPlayer.reset();
};

export const useSkipOnline = () => {
  const playerStore = useContext(TrackPauseContext);
  const webSongs = useWebSongs(allSongsContext);
  const loadPlayer = useContext(LoadPlayerActionContext);
  const webLoadedDispatch = useContext(dispatchWebSongsLoaded);
  const setQueue = useContext(queueActionContext);
  const fetchedSongs = useContext(FetchedSongsContext);
  const fetchedAnthems = fetchedSongs.anthems;
  const fetchedHymns = fetchedSongs.hymns;
  const fetchedClassicals = fetchedSongs.classicals;
  const fetchedEasterAnthems = fetchedSongs.easterAnthems;
  const fetchedChristmasAnthems = fetchedSongs.christmasAnthems;
  const fetchedKelencha = fetchedSongs.kelencha;
  const fetchedChoralBlues = fetchedSongs.choralBlues;

  const skipFunction = React.useCallback(
    async (
      state,
      id,
      anthemsFetchedState,
      hymnsFetchedState,
      classicalsFetchedState,
      kelencahFetchedState,
      christmasAnthemsFetchedState,
      easterAnthemsFetchedState,
      choralBluesFetchedState,
      webLoadedState
    ) => {
      if (state && webLoadedState) {
        await TrackPlayer.skip(id)
          .then(async () => {
            await TrackPlayer.play()
              .then(() => {
                playerStore.play();
                updatePlayerOptions();
              })
              .catch(() => null);
          })
          .catch(() => null);
      }
      if (!state && !webLoadedState) {
        TrackPlayer.add([...webSongs])
          .then(async (tracks) => {
            webLoadedDispatch();
            loadPlayer();
            await TrackPlayer.skip(id)
              .then(async () => {
                await TrackPlayer.play()
                  .then(() => null)
                  .catch(() => null);
                playerStore.play();
                updatePlayerOptions();
              })
              .catch(() => null);
          })
          .catch(() => null);
        await TrackPlayer.getQueue()
          .then((queue) => {
            setQueue.setQueue(queue);
          })
          .catch(() => null);
      }
      if (state && !webLoadedState) {
        TrackPlayer.add([...webSongs])
          .then(async () => {
            webLoadedDispatch();
            loadPlayer();
            await TrackPlayer.skip(id)
              .then(async () => {
                await TrackPlayer.play()
                  .then(() => null)
                  .catch(() => null);
                playerStore.play();
                updatePlayerOptions();
              })
              .catch(() => null);
          })
          .catch(() => null);
        await TrackPlayer.getQueue()
          .then((queue) => {
            setQueue.setQueue(queue);
          })
          .catch(() => null);
      }
      if (
        !anthemsFetchedState &&
        hymnsFetchedState &&
        classicalsFetchedState &&
        kelencahFetchedState &&
        christmasAnthemsFetchedState &&
        easterAnthemsFetchedState &&
        choralBluesFetchedState
      ) {
        TrackPlayer.add([...fetchedAnthems])
          .then(async () => {
            webLoadedDispatch();
            loadPlayer();
            await TrackPlayer.skip(id)
              .then(async () => {
                await TrackPlayer.play()
                  .then(() => null)
                  .catch(() => null);
                playerStore.play();
                updatePlayerOptions();
              })
              .catch(() => null);
          })
          .catch(() => null);
        await TrackPlayer.getQueue()
          .then((queue) => {
            setQueue.setQueue(queue);
          })
          .catch(() => null);
      }

      if (
        anthemsFetchedState &&
        !hymnsFetchedState &&
        classicalsFetchedState &&
        kelencahFetchedState &&
        christmasAnthemsFetchedState &&
        easterAnthemsFetchedState &&
        choralBluesFetchedState
      ) {
        TrackPlayer.add([...fetchedHymns])
          .then(async () => {
            webLoadedDispatch();
            loadPlayer();
            await TrackPlayer.skip(id)
              .then(async () => {
                await TrackPlayer.play()
                  .then(() => null)
                  .catch(() => null);
                playerStore.play();
                updatePlayerOptions();
              })
              .catch(() => null);
          })
          .catch(() => null);
        await TrackPlayer.getQueue()
          .then((queue) => {
            setQueue.setQueue(queue);
          })
          .catch(() => null);
      }

      if (
        anthemsFetchedState &&
        hymnsFetchedState &&
        !classicalsFetchedState &&
        kelencahFetchedState &&
        christmasAnthemsFetchedState &&
        easterAnthemsFetchedState &&
        choralBluesFetchedState
      ) {
        TrackPlayer.add([...fetchedClassicals])
          .then(async () => {
            webLoadedDispatch();
            loadPlayer();
            await TrackPlayer.skip(id)
              .then(async () => {
                await TrackPlayer.play()
                  .then(() => null)
                  .catch(() => null);
                playerStore.play();
                updatePlayerOptions();
              })
              .catch(() => null);
          })
          .catch(() => null);
        await TrackPlayer.getQueue()
          .then((queue) => {
            setQueue.setQueue(queue);
          })
          .catch(() => null);
      }

      if (
        anthemsFetchedState &&
        hymnsFetchedState &&
        classicalsFetchedState &&
        !kelencahFetchedState &&
        christmasAnthemsFetchedState &&
        easterAnthemsFetchedState &&
        choralBluesFetchedState
      ) {
        TrackPlayer.add([...fetchedKelencha])
          .then(async () => {
            webLoadedDispatch();
            loadPlayer();
            await TrackPlayer.skip(id)
              .then(async () => {
                await TrackPlayer.play()
                  .then(() => null)
                  .catch(() => null);
                playerStore.play();
                updatePlayerOptions();
              })
              .catch(() => null);
          })
          .catch(() => null);
        await TrackPlayer.getQueue()
          .then((queue) => {
            setQueue.setQueue(queue);
          })
          .catch(() => null);
      }

      if (
        anthemsFetchedState &&
        hymnsFetchedState &&
        classicalsFetchedState &&
        kelencahFetchedState &&
        !christmasAnthemsFetchedState &&
        easterAnthemsFetchedState &&
        choralBluesFetchedState
      ) {
        TrackPlayer.add([...fetchedChristmasAnthems])
          .then(async () => {
            webLoadedDispatch();
            loadPlayer();
            await TrackPlayer.skip(id)
              .then(async () => {
                await TrackPlayer.play()
                  .then(() => null)
                  .catch(() => null);
                playerStore.play();
                updatePlayerOptions();
              })
              .catch(() => null);
          })
          .catch(() => null);
        await TrackPlayer.getQueue()
          .then((queue) => {
            setQueue.setQueue(queue);
          })
          .catch(() => null);
      }

      if (
        anthemsFetchedState &&
        hymnsFetchedState &&
        classicalsFetchedState &&
        kelencahFetchedState &&
        christmasAnthemsFetchedState &&
        !easterAnthemsFetchedState &&
        choralBluesFetchedState
      ) {
        TrackPlayer.add([...fetchedEasterAnthems])
          .then(async () => {
            webLoadedDispatch();
            loadPlayer();
            await TrackPlayer.skip(id)
              .then(async () => {
                await TrackPlayer.play()
                  .then(() => null)
                  .catch(() => null);
                playerStore.play();
                updatePlayerOptions();
              })
              .catch(() => null);
          })
          .catch(() => null);
        await TrackPlayer.getQueue()
          .then((queue) => {
            setQueue.setQueue(queue);
          })
          .catch(() => null);
      }
      if (
        anthemsFetchedState &&
        hymnsFetchedState &&
        classicalsFetchedState &&
        kelencahFetchedState &&
        christmasAnthemsFetchedState &&
        easterAnthemsFetchedState &&
        !choralBluesFetchedState
      ) {
        TrackPlayer.add([...fetchedChoralBlues])
          .then(async () => {
            webLoadedDispatch();
            loadPlayer();
            await TrackPlayer.skip(id)
              .then(async () => {
                await TrackPlayer.play()
                  .then(() => null)
                  .catch(() => null);
                playerStore.play();
                updatePlayerOptions();
              })
              .catch(() => null);
          })
          .catch(() => null);
        await TrackPlayer.getQueue()
          .then((queue) => {
            setQueue.setQueue(queue);
          })
          .catch(() => null);
      }
    }
  );
  return skipFunction;
};

export const useLoadDirToOnline = () => {
  const dispatch = useContext(onlineLoadFromDirContext);
  const Func = React.useCallback(() => {
    dispatch();
  }, [dispatch]);
  return Func;
};

export const useUpdateStoreOnlineLib = () => {
  const onlineSongs = useContext(allSongsContext);
  const updateOnlineLib = useContext(updateOnlineLibCOntext);
  const downloadedSongs = useContext(DownloadedSongsContext);
  const Func = React.useCallback(() => {
    let lib = [];
    /*
  RNFS.readDir(downloadsPath).then(res => {
    onlineSongs.forEach(onlineSong => {
      res.forEach(song => {
        const splitTitle =  song.name.split('Aa')
        if(onlineSong.id == splitTitle[3] && onlineSong.title == splitTitle[1]){
          lib.push(onlineSong)
          updateOnlineLib(lib)
        }
      })
    })
  }).catch(()=> null)
  */
    downloadedSongs.forEach((song) => {
      onlineSongs.forEach((onlineSong) => {
        if (song.title == onlineSong.title && song.id && onlineSong.id) {
          lib.push(onlineSong);
          updateOnlineLib(lib);
        }
      });
    });
  });
  return Func;
};

export const useStoreOnlineLib = () => {
  const storeLib = useContext(StoreOnlineLibContext);
  return storeLib;
};

/*
Download Hooks
*/

export const useDownloadSong = () => {
  const downloadAction = React.useContext(DownloadContext);
  const toDownload = React.useCallback(
    (
      title,
      id,
      url,
      artist,
      numDownloads,
      genre,
      artwork,
      duration,
      composer
    ) => {
      RNFS.readDir(downloadsPath).then((res) => {
        if (res.length == 0) {
          downloadAction(
            title,
            id,
            url,
            artist,
            numDownloads,
            genre,
            artwork,
            duration,
            composer
          );
          return;
        } else {
          res.forEach((file) => {
            if (
              file.name !=
              `Aa${title}Aa${artist}Aa${id}Aa${genre}Aa${duration}Aa${composer}Aa.mp3`
            ) {
              downloadAction(
                title,
                id,
                url,
                artist,
                numDownloads,
                genre,
                artwork,
                duration,
                composer
              );
              return;
            } else if (
              file.name ==
              `Aa${title}Aa${artist}Aa${id}Aa${genre}Aa${duration}Aa${composer}Aa.mp3`
            ) {
              return;
            }
          });
        }
      });
    },
    [downloadAction]
  );
  return toDownload;
};

export const useDownloadedSongs = () => {
  const songs = useContext(DownloadedSongsContext);
  return songs;
};

export const useWebSongs = () => {
  const songs = useContext(allSongsContext);
  return songs;
};

export const useLoadFromDir = () => {
  const loadFromDir = useContext(LoadFromDirContext);

  const Func = React.useCallback(async () => {
    loadFromDir();
  }, [loadFromDir]);
  return Func;
};

export const useDownloadSuccessState = () => {
  const value = useContext(DownloadingSongSuccessContext);
  return value;
};

export const useAfterDownloadSuccess = () => {
  const func = useContext(afterDownloadSuccessAcion);
  const Func = React.useCallback(() => {
    func();
  }, [func]);
  return Func;
};

export const useGetDownloadProgress = () => {
  const progress = useContext(getDownloadProgress);
  return progress;
};

export const useGetDownloadingSongState = () => {
  const downloadingState = useContext(DownloadingSongState);
  return downloadingState;
};

/*
DELETE SONG HOOKS
*/

export const useFileToDelete = () => {
  const value = useContext(FileToDeleteContext);
  return value;
};

export const useDeleteSong = () => {
  const deleteAction = useContext(DeleteSongActionContext);
  const FileToDel = useContext(FileToDeleteContext);
  const delFunc = React.useCallback(() => {
    deleteAction(
      FileToDel.title,
      FileToDel.id,
      FileToDel.artist,
      FileToDel.genre,
      FileToDel.duration,
      FileToDel.composer
    );
  });
  return delFunc;
};

export const useSongDeletedState = () => {
  const deleted = useContext(SongDeletedStateContext);
  return deleted;
};

export const useOpenDeleteState = () => {
  const state = useContext(OpenDeleteStateContext);
  return state;
};

export const useOpenDelete = () => {
  const action = useContext(openDeletContext);
  const openFunc = React.useCallback(
    (title, id, artist, genre, duration, composer, likes, artwork) => {
      action(
        title,
        id,
        artist,
        genre,
        duration,
        composer,
        artwork,
        likes,
        artwork
      );
    }
  );
  return openFunc;
};

export const useCloseDelete = () => {
  const action = useContext(closeDeleteContext);
  const closeFunc = React.useCallback(() => {
    action();
  });
  return closeFunc;
};

export const useAfterSongDelete = () => {
  const func = useContext(afterDeleteSuccessAction);
  const Func = React.useCallback(() => {
    func();
  }, [func]);
  return Func;
};

/*
SONG OPTIONS
*/
export const useLikeSongState = () => {
  const state = useContext(GetLikeSongStateContext);
  return state;
};

export const useUnlikeSongState = () => {
  const state = useContext(GetUnlikeSongStateContext);
  return state;
};

export const useResetLikeActions = () => {
  const dispatch = useContext(likeSongActionsContext);

  return dispatch;
};

export const useLikeSong = () => {
  const likeSong = useContext(likeSongActionsContext);
  const Func = React.useCallback(async (songState, genre, id) => {
    try {
      db.collection(genre)
        .doc(`${id}`)
        .get()
        .then((doc) => {
          const likes = doc.data().likes;
          db.collection(genre)
            .doc(`${id}`)
            .set(
              {
                likes: !songState ? likes + 1 : likes,
              },
              { merge: true }
            )
            .then(() => {
              if (songState) {
                likeSong.likeSongSuccess();
              }
              if (!songState) {
                likeSong.unlikeSongSuccess();
              }
            });
        })
        .catch(() => {
          likeSong.likeSongFailed();
        });
    } catch (error) {
      likeSong.likeSongFailed();
    }
  });

  return Func;
};

/*
TrackPlayer Control HOOKS
 */

export const useWebLoadedState = () => {
  const val = useContext(WebLoadedContext);
  return val;
};

export const useDownloadsLoadedState = () => {
  const downloadsLoadedState = useContext(DownloadsLoadedContext);
  return downloadsLoadedState;
};

const updatePlayerOptions = () => {
  TrackPlayer.updateOptions({
    stopWithApp: true,
    alwaysPauseOnInterruption: true,
    // playIcon: () => <PlayIcon />,
    // pauseIcon: () => <PauseIcon />,
    // stopIcon: () => <StopIcon />,
    // previousIcon: () => <PreviousIcon />,
    // nextIcon: () => <NextIcon />,
    notificationCapabilities: [
      CAPABILITY_PLAY,
      CAPABILITY_PAUSE,
      CAPABILITY_SKIP_TO_NEXT,
      CAPABILITY_SKIP_TO_PREVIOUS,
      CAPABILITY_STOP,
      CAPABILITY_PLAY_FROM_ID,
    ],
    capabilities: [
      CAPABILITY_PLAY,
      CAPABILITY_PAUSE,
      CAPABILITY_SKIP_TO_NEXT,
      CAPABILITY_SKIP_TO_PREVIOUS,
      CAPABILITY_STOP,
      CAPABILITY_PLAY_FROM_ID,
      CAPABILITY_SKIP,
    ],
    compactCapabilities: [
      CAPABILITY_PAUSE,
      CAPABILITY_PLAY,
      CAPABILITY_PLAY_FROM_ID,
      CAPABILITY_SKIP_TO_NEXT,
      CAPABILITY_SKIP_TO_PREVIOUS,
      CAPABILITY_STOP,
    ],
  });
};

export const usePlayerStoreActions = () => {
  const actions = useContext(TrackPauseContext);
  return actions;
};

export const useTrackState = () => {
  const value = React.useContext(TrackPlayContext);
  return value;
};

export const useTrackPlay = () => {
  const value = useContext(TrackPlayContext);
  const playSong = React.useCallback(
    (lpState) => {
      try {
        TrackPlayer.play().catch((e) => null);
        updatePlayerOptions();
        return;
      } catch (E) {
        null;
      }
    },
    [value]
  );
  return playSong;
};

export const useTrackPause = () => {
  const playerStore = useContext(TrackPauseContext);

  const pauseSong = React.useCallback(async () => {
    try {
      await TrackPlayer.pause().catch((e) => null);
      updatePlayerOptions();
      return;
    } catch (error) {
      null;
    }
  }, [playerStore]);

  return pauseSong;
};

export const useTrackNext = () => {
  const playerStore = useContext(TrackPauseContext);
  const forward = React.useCallback(async () => {
    TrackPlayer.skipToNext()
      .then(async () => {
        TrackPlayer.play().catch(() => null);
        playerStore.play();
      })
      .catch(() => {
        TrackPlayer.pause();
        playerStore.pause();
      });
  }, [playerStore]);
  return forward;
};

export const useTrackPrev = () => {
  const playerStore = useContext(TrackPauseContext);
  const prev = React.useCallback(async () => {
    const progress = await TrackPlayer.getPosition();
    if (progress > 10) {
      await TrackPlayer.seekTo(0).catch(() => null);
    } else if (progress < 10) {
      TrackPlayer.skipToPrevious()
        .then(async () => {
          TrackPlayer.play().catch(() => null);
          playerStore.play();
        })
        .catch(() => null);
    }
  }, [playerStore]);
  return prev;
};

export const useSetStoreOpenMax = () => {
  const func = useContext(openMaxPlayer);
  const Func = React.useCallback(() => {
    func();
  }, [func]);
  return Func;
};

export const useStoreMaxState = () => {
  const value = useContext(StoreMaxState);
  return value;
};

/*

Search Song Hook

*/

export const useSetKeyword = () => {
  const value = useContext(SearchDispatchContext);
  const setWord = React.useCallback(
    (word) => {
      value(word);
      return;
    },
    [value]
  );
  return setWord;
};

/*
To Load Songs on Initial Mount
*/

export const useLoadPlayer = () => {
  const loadPlayer = useContext(LoadPlayerActionContext);
  const Func = React.useCallback(() => {
    loadPlayer();
    return;
  }, [loadPlayer]);
  return Func;
};

export const usePlayerLoadedState = () => {
  const state = useContext(LoadPlayerStateContext);

  return state;
};

export const useLoadSongs = () => {
  const webSongs = useContext(allSongsContext);
  const downloadedSongs = useContext(DownloadedSongsContext);
  const loadPlayer = useContext(LoadPlayerActionContext);
  const webSongsLoadDispatch = useContext(dispatchWebSongsLoaded);
  const downloadsLoadDispatch = useContext(dispatchDownloadsLoaded);

  const loadTracks = React.useCallback((source, lpState) => {
    if (source == "download" && !lpState) {
      if (Songs.length != 0) {
        TrackPlayer.add(Songs)
          .then((res) => {
            loadPlayer();
            downloadsLoadDispatch();
            updatePlayerOptions();
          })
          .catch(() => null);
      } else return;
      // })
    } else if (source == "initial" && !lpState) {
      loadPlayer();
      updatePlayerOptions();
    }
  });
  return loadTracks;
};

/*  

REDUX CONNECT   

*/
const mapStateToProps = (state) => {
  return {
    playerState: {
      playing: getPlayerPlaying(state.player),
      running: getPlayerRunning(state.player),
    },
    allSongs: getAllSongs(state),
    downloadedSongs: getAllDownloads(state.downloads),
    playerLoaded: getPlayerLoaded(state.downloads),
    openDeleteState: getOpenDeleteState(state.downloads),
    songDeletedState: getSongDeleted(state.downloads),
    openDeleteState: getOpenDeleteState(state.player),
    filetoDelete: getFileToDelete(state.player),
    downloadingSuccessState: getDownloadSuccessState(state.downloads),
    downloadProgress: getDownloadProgress(state.downloads),
    downloadingSongState: getDownloadingSongState(state.downloads),
    storeMaxState: getStoreMaxState(state.player),

    getWebLoaded: getWebLoadedState(state.player),
    getDownlaodsLoaded: getDownloadsLoadedState(state.player),
    likeSongState: getLikeSongState(state.player),
    unlikeSongState: getUnlikeSongState(state.player),
    playerMode: getStorePlayerMode(state.player),
    queueState: getQueueState(state.player),
    storeQueue: getStoreQueue(state.player),
    storeNavBarState: getStoreNavBarState(state.player),
    storeOnlineLib: getStoreOnlineLib(state.downloads),
    fetchedStates: {
      anthemsFetchedState: getAnthemsFetchedState(state.anthems),
      hymnsFetchedState: getHymnsFetchedState(state.hymns),
      classicalsFetchedState: getClassicalsFetchedState(state.classicals),
      kelenchaFetchedState: getKelenchaFetchedState(state.kelencha),
      easterAnthemsFetchedState: getEasterAnthemsFetchedState(
        state.easterAnthems
      ),
      christmasAnthemsFetchedState: getChristmasAnthemsFetchedState(
        state.christmasAnthems
      ),
      choralBluesFetchedState: getChoralBluesFetchedState(state.choralBlues),
    },
    fetchedSongs: {
      anthems: getAnthems(state.anthems),
      kelencha: getKelencha(state.kelencha),
      classicals: getClassicals(state.classicals),
      hymns: getHymns(state.hymns),
      christmasAnthems: getChristmasAnthems(state.christmasAnthems),
      easterAnthems: getEasterAnthems(state.easterAnthems),
      choralBlues: getChoralBlues(state.choralBlues),
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    playerStore: {
      play: () => dispatch(playSong()),
      pause: () => dispatch(pauseSong()),
    },
    setSearchKeyword: (keyword) => dispatch(setKeyword(keyword)),
    downloadSongAction: (
      title,
      id,
      url,
      artist,
      numDownloads,
      genre,
      artwork,
      duration,
      composer
    ) =>
      dispatch(
        downloadSong(
          title,
          id,
          url,
          artist,
          numDownloads,
          genre,
          artwork,
          duration,
          composer
        )
      ),
    loadFromDir: () => dispatch(initialLoad()),
    loadPlayer: () => dispatch(loadPlayer()),
    refreshPlayer: () => dispatch(refreshPlayer()),
    updateStoreNavBarState: (state) => dispatch(updateBottomNavBarState(state)),
    deleteSongAction: (title, id, artist, genre, duration, composer) =>
      dispatch(deleteSong(title, id, artist, genre, duration, composer)),
    openDeleteAction: (
      title,
      id,
      artist,
      genre,
      duration,
      composer,
      likes,
      artwork
    ) =>
      dispatch(
        openDelete(title, id, artist, genre, duration, composer, likes, artwork)
      ),
    closeDeleteAction: () => dispatch(closeDelete()),
    afterDownloadSuccess: () => dispatch(afterDownloadSuccess()),
    afterDeleteSuccess: () => dispatch(afterDeleteSuccess()),
    downloadsLoaded: () => dispatch(loadDownloadedSongs()),
    webSongsLoaded: () => dispatch(loadWebSongs()),
    resetLoadedStates: () => dispatch(resetLoadedStates()),
    openMax: () => dispatch(openMax()),
    playerOnline: () => dispatch(launchOnline()),
    playerOffline: () => dispatch(launchOffline()),
    /// liking and unliking actions
    likeSong: {
      likeSongSuccess: () => dispatch(likeSongSuccess()),
      likeSongFailed: () => dispatch(likeSongFailed()),
      unlikeSongSuccess: () => dispatch(unlikeSongSuccess()),
      unlikeSongFailed: () => dispatch(unlikeSongFailed()),
      reset: () => dispatch(resetLikeUnlike()),
    },
    queueAction: {
      openQueue: () => dispatch(openQueue()),
      closeQueue: () => dispatch(closeQueue()),
      setQueue: (queue) => dispatch(updateQueue(queue)),
    },
    loadDirToOnline: () => dispatch(onlineLoadFromDir()),
    updateOnlineLib: (songs) => dispatch(updateStoreOnlineLib(songs)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackContextProvider);

/*

EXTRA COMPONENTS FROM  THE TRACK-PLAYER

*/
export const TimerComp = () => {
  const [tim, setTim] = React.useState(0);
  const progress = useTrackPlayerProgress(1000);
  function Timer(pos) {
    return pos > 3600
      ? [
          parseInt((pos / 60 / 60) % 60),
          parseInt((pos / 60) % 60),
          parseInt(pos % 60),
        ]
          .join(":")
          .replace(/\b(\d)\b/g, "0$1")
      : [parseInt((pos / 60) % 60), parseInt(pos % 60)]
          .join(":")
          .replace(/\b(\d)\b/g, "0$1");
  }

  const Time = Timer(progress.position);
  React.useEffect(() => {
    setTim(Time);
    return () => {
      setTim(0);
    };
  }, [progress]);

  return <Text style={{ color: "#e6e7e8", fontSize: 17 }}>{tim} </Text>;
};
