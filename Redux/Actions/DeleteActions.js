import * as actions from '../ActionTypes'
var RNFS = require('react-native-fs')

const downloadPath = RNFS.DocumentDirectoryPath + '/DownloadedSongs'
const artworkDownloadPath = RNFS.DocumentDirectoryPath + '/artwork'

export const deleteFileRequest =() =>  {
    return {
        type: actions.DELETE_SONG_REQUEST
    }
}

export const deleteFileSuccess = (id) => {
    return {
        type: actions.DELETE_SONG_SUCCESS,
        payload: id
    }
} 

export const deleteSong = (title,id,artist,genre,duration,composer) => {
    return dispatch => {
        dispatch(deleteFileRequest())
        /// DELETE SONG
       RNFS.readDir(downloadPath).then(res => {
           res.forEach(file => {
               if(file.name == `Aa${title}Aa${artist}Aa${id}Aa${genre}Aa${duration}Aa${composer}Aa.mp3`) {
                   RNFS.unlink(file.path).then(()=> {
                       RNFS.unlink(artworkDownloadPath + `/Aa${title}Aa${artist}Aa${id}Aa.jpg`).then(res =>{
                        return
                    }).catch(e=> null)
                       dispatch(deleteFileSuccess(id))
                       return
                   }).catch(()=>null) 
                   
               }
           })
       }).catch(()=> null)
    }
}

export const openDelete = (title,id,artist, genre, duration,composer,likes,artwork) => {
    return {
        type: actions.OPEN_DELETE,
        payload: {
            id,
            title, 
            artist,
            genre,
            duration,
            composer,
            likes,
            artwork
        }
    }
}

export const closeDelete = () => {
    return {
        type: actions.CLOSE_DELETE
    }
}

export const afterDeleteSuccess = () => {
    return {
        type: actions.AFTER_DELETE_SUCESS
    }
}