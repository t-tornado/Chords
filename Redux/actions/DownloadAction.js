import * as actions from '../actionTypes'
import {db} from '../../Config/firebase'
// import firestore from '@react-native-firebase/firestore'
var RNFS = require('react-native-fs')


const downloadSongsPath = RNFS.DocumentDirectoryPath + '/DownloadedSongs'
const artworkDownloadPath = RNFS.DocumentDirectoryPath + '/artwork'


export const downloadSongRequest = () => {
    return {
        type: actions.DOWNLOAD_SONG_REQUEST
    }
}


export const downloadSongSuccess = (title,id,artist,genre,duration, composer) => {
    return {
        type: actions.DOWNLOAD_SONG_SUCCESS,
        payload: {
            id: `10000000000${id}`,
            title: title,
            artist: artist,
            url: `file://${downloadSongsPath}/Aa${title}Aa${artist}Aa10000000000${id}Aa${genre}Aa${duration}Aa${composer}Aa.mp3`,
            artwork: `file://${artworkDownloadPath}/Aa${title}Aa${artist}Aa10000000000${id}Aa.jpg`,
            duration:duration,
            genre: genre,
            composer: composer 
        }
    } 
}

export const afterDownloadSuccess = () => {
    return {
        type: actions.AFTER_DOWNLOAD_SUCCESS
    }
}

export const downloadSongFailure = () => {
    return {
        type: actions.DOWNLOAD_SONG_FAILURE
    }
}

export const createMusicDirectory = () => {
    RNFS.mkdir(downloadSongsPath).then(()=> {
    }).catch(()=> {
        null
    })
    RNFS.mkdir(artworkDownloadPath).then(()=> {
        return
    }).catch(()=> {
        null
    })
}
 
export const setDownloadProgress = (progress) => {
    return {
        type: actions.SET_DOWNLOAD_PROGRESS,
        payload: progress
    }
}


export const downloadSong = (title,id,url,artist, numDownload,genre,artwork,duration,composer ) => {
return dispatch => {
    dispatch(downloadSongRequest())
         /// DOWNOAD ARTWORK
    RNFS.downloadFile({
        fromUrl: artwork,
        toFile: artworkDownloadPath + `/Aa${title}Aa${artist}Aa10000000000${id}Aa.jpg`
    }).promise.then(() => {
                                  // DOWNLOAD SONG 
           RNFS.downloadFile({
            toFile: downloadSongsPath + `/Aa${title}Aa${artist}Aa10000000000${id}Aa${genre}Aa${duration}Aa${composer}Aa.mp3`,
            fromUrl: url,   
        progressInterval: 500,
        progressDivider: 5,
        progress: (res) => {
            const value = Math.floor(res.bytesWritten/res.contentLength *100)
            setDownloadProgress(value)
        }
      }).promise.then(res => {
          dispatch(downloadSongSuccess(title,id,artist,genre,duration, composer))
         try {
            db.collection(genre).doc(`${id}`).set({
                downloads: numDownload + 1
            }, {merge: true}).then(()=> {
                        null
            }).catch(e=> {
                null
            })
         } catch (error) { 
             null
         }
      }).catch(err => {
          dispatch(downloadSongFailure())
      })


    }).catch(e => {
        null
    })     
}
}




export const checkDir = () =>  {
    RNFS.readDir(downloadSongsPath).then(res => {
        res.forEach(item => {
            const splitName = item.name.split('Aa')
        })
    }).catch(()=> null)
}

export const deleteDir = () => {
    RNFS.unlink(downloadSongsPath).then(res => {
    }).catch(()=> null)
    RNFS.unlink(artworkDownloadPath).then(res => {
    }).catch(()=> null)
    return
}







export const loadInitialReq = () => {
    return {
        type: actions.INITIAL_LOAD_REQ
    }
}

export const loadInitialFinished = (downloads) => {
    return {
        type: actions.INITIAL_LOAD_SUCCESS, 
        payload: downloads
    }
}
export const initialLoad = () => {
    return dispatch => {
        dispatch(loadInitialReq())
        let arr = [];
     RNFS.readDir(downloadSongsPath).then(res => {
        res.forEach((file,index)=> {
            const splitTitle = file.name.split('Aa')
            const obj = {
                id: splitTitle[3],
                title: splitTitle[1],
                artist: splitTitle[2],
                url: `file://${downloadSongsPath}/Aa${splitTitle[1]}Aa${splitTitle[2]}Aa${splitTitle[3]}Aa${splitTitle[4]}Aa${splitTitle[5]}Aa${splitTitle[6]}Aa.mp3`,
                artwork: `file://${artworkDownloadPath}/Aa${splitTitle[1]}Aa${splitTitle[2]}Aa${splitTitle[3]}Aa.jpg`,
                // duration: parseFloat(parseFloat(splitTitle[5]).toFixed(2)),
                duration: parseInt(splitTitle[5]),
                genre: splitTitle[4],
                composer: splitTitle[6]
                                
            } 
            arr.push(obj)
            dispatch(loadInitialFinished(arr))
        })
     }).catch((e)=> {
            null
    })
    
    }
}

/**
 * ONLINE ACTIONS
 */

export const onlineLoadFromDir = () => {
    return dispatch => {
        dispatch(loadInitialReq())
        let arr =[]
        RNFS.readDir(downloadSongsPath).then(res => {
            res.forEach(song => {
                const splitTitle = song.name.split('Aa')
            const obj = {
                id: splitTitle[3],
                title: splitTitle[1],
                artist: splitTitle[2],
            }
            arr.push(obj)
            dispatch(loadInitialFinished(arr))
            })
        }).catch(()=> null)
    }
}

export const updateStoreOnlineLib = (songs) => {
    return {
        type: actions.UPDATE_ONLINE_LIB,
        payload: songs
    }
}