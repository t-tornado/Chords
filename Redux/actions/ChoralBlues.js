import * as actionType from '../actionTypes'
import  {db} from '../../Config/firebase'


export function fetchChoralBluesSuccess(data) {
    return {
      type: actionType.FETCH_CHORAL_BLUES_SUCCESS,
      payload: data
    }
  }
  export function fetchChoralBluesFailure() {
    return {
      type: actionType.FETCH_CHORAL_BLUES_FAILURE,
    }
  } 
  
  export function fetchChoralBluesRequest() {
    return {
      type: actionType.FETCH_CHORAL_BLUES_REQUEST,
    }
  } 
    
  export function fetchChoralBlues() {
    let tracks = []
    return  async (dispatch) => {
      dispatch(fetchChoralBluesRequest())
      try {
        db.collection('choralBlues').get().then(querySnapshot =>{
          querySnapshot.forEach(documentSnapshot  => {
              tracks.push(documentSnapshot.data())
              dispatch(fetchChoralBluesSuccess(tracks))
          } ).catch(error => {
            dispatch(fetchChoralBluesFailure())
          })
         }).catch(error => {
          dispatch(fetchChoralBluesFailure())
        })         

          } catch (error) {
            dispatch(fetchChoralBluesFailure())
          }
    }
  }   