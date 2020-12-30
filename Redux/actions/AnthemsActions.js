import * as actionType from '../actionTypes'
import  {db} from '../../Config/firebase'


export function fetchAnthemsSuccess(data) {
    return {
      type: actionType.FETCH_ANTHEMS_SUCCESS,
      payload: data
    }
  }
  export function fetchAnthemsFailure(error) {
    return {
      type: actionType.FETCH_ANTHEMS_FAILUER,
      payload: error
    }
  } 
  
  export function fetchAnthemsRequest() {
    return {
      type: actionType.FETCH_ANTHEMS_REQUEST,
    }
  } 
    
  export function fetchAnthems() {
    let tracks = []
    return  async (dispatch) => {
      dispatch(fetchAnthemsRequest())
      try {
        db.collection('anthems').get().then(querySnapshot =>{
          querySnapshot.forEach(documentSnapshot  => {
              tracks.push(documentSnapshot.data())
              dispatch(fetchAnthemsSuccess(tracks))
          } ).catch(e => {
            dispatch(fetchAnthemsFailure())
          })
         }).catch(error => {
          dispatch(fetchAnthemsFailure())
        })         

          } catch (error) {
            dispatch(fetchAnthemsFailure())
          }
    }
  }   