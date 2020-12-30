import * as actionType from '../actionTypes'
import {db} from  '../../Config/firebase'



export function fetchClassicalsSuccess(data) {
    return {
      type: actionType.FETCH_CLASSICALS_SUCCESS,
      payload: data
    }
  }
  export function fetchClassicalsFailure(error) {
    return {
      type: actionType.FETCH_CLASSICALS_FAILUER,
      payload: error
    }
  }
  
  export function fetchClassicalsRequest() {
    return {
      type: actionType.FETCH_CLASSICALS_REQUEST,
    }
  }
 

export function fetchclassicals() {
  let tracks = []
  return async (dispatch) => {
    dispatch(fetchClassicalsRequest())
    try {
      db.collection('classicals').get().then(querySnapshot =>{
        querySnapshot.forEach(documentSnapshot  => {
            tracks.push(documentSnapshot.data())
            dispatch(fetchClassicalsSuccess(tracks))
        } ).catch(e=> {
          dispatch(fetchClassicalsFailure())
        })
       })
       .catch(error => {
        dispatch(fetchClassicalsFailure())
      })
        } catch (error) {
          dispatch(fetchClassicalsFailure())
        }
} 
}  