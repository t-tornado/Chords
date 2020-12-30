import * as actionType from '../actionTypes'
import {db}from  '../../Config/firebase'


export function fetchKelenchaSuccess(data) {
    return {
      type: actionType.FETCH_KELENCHA_SUCCESS,
      payload: data
    }
  }
  export function fetchKelenchaFailure(error) {
    return {
      type: actionType.FETCH_KELENCHA_FAILUER,
      payload: error
    }
  }
  
  export function fetchKelenchaRequest() {
    return {
      type: actionType.FETCH_KELENCHA_REQUEST,
    }
  }
   
export function fetchKelencha() {
  let tracks = []
  return  (dispatch) => {
    dispatch(fetchKelenchaRequest())
    try {
      db.collection('kelencha').get().then(querySnapshot =>{
        querySnapshot.forEach(documentSnapshot  => {
            tracks.push(documentSnapshot.data())
            dispatch(fetchKelenchaSuccess(tracks))
        } ).catch(e => {
          dispatch(fetchKelenchaFailure())
          null
        })
       })
       .catch(error => {
        dispatch(fetchKelenchaFailure())
      })
        } catch (error) {
          dispatch(fetchKelenchaFailure())
          null
        }
} 
} 