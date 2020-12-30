import * as actionType from '../actionTypes'
import  {db} from '../../Config/firebase'


export function fetchEasterAnthemsSuccess(data) {
    return {
      type: actionType.FETCH_EASTER_ANTHEMS_SUCCESS,
      payload: data
    }
  }
  export function fetchEasterAnthemsFailure() {
    return {
      type: actionType.FETCH_EASTER_ANTHEMS_FAILURE,
    }
  } 
  
  export function fetchEasterAnthemsRequest() {
    return {
      type: actionType.FETCH_EASTER_ANTHEMS_REQUEST,
    }
  } 
    
  export function fetchEasterAnthems() {
    let tracks = []
    return  async (dispatch) => { 
      dispatch(fetchEasterAnthemsRequest())
      try {
        db.collection('easterAnthems').get().then(querySnapshot =>{
          querySnapshot.forEach(documentSnapshot  => {
              tracks.push(documentSnapshot.data())
              dispatch(fetchEasterAnthemsSuccess(tracks))
          } ).catch(e => {
            dispatch(fetchEasterAnthemsFailure())
          })
         }).catch(error => {
          dispatch(fetchEasterAnthemsFailure())
        })         

          } catch (error) {
            dispatch(fetchEasterAnthemsFailure())
          }
    }
  }   