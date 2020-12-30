import * as actionType from '../actionTypes'
import {db} from  '../../Config/firebase'


export function fetchHymnsSuccess(data) {
    return {
      type: actionType.FETCH_HYMNS_SUCCESS,
      payload: data
    }
  }
  export function fetchHymnsFailure(error) {
    return {
      type: actionType.FETCH_HYMNS_FAILUER,
      payload: error
    }
  }
  
  export function fetchHymnsRequest() {
    return {
      type: actionType.FETCH_HYMNS_REQUEST,
    }
  } 
  
  export function fetchHymns() {
    let tracks = []
    return  (dispatch) => {
      dispatch(fetchHymnsRequest())
      try {
        db.collection('hymns').get().then(querySnapshot =>{
    querySnapshot.forEach(documentSnapshot  => {
        tracks.push(documentSnapshot.data())
        dispatch(fetchHymnsSuccess(tracks))
    } ).catch(e=> {
      dispatch(fetchHymnsFailure())
    })
   })
   .catch(error => {
    dispatch(fetchHymnsFailure())
  })
      } catch (error) {
        dispatch(fetchHymnsFailure())
      }
      
    }
    }  

