import * as actionType from '../actionTypes'
import  {db} from '../../Config/firebase'


export function fetchChristmasAnthemsSuccess(data) {
    return {
      type: actionType.FETCH_CHRISTMAS_ANTHEMS_SUCCESS,
      payload: data
    }
  }
  export function fetchChristmasAnthemsFailure() {
    return {
      type: actionType.FETCH_CHRISTMAS_ANTHEMS_FAILURE,
    }
  } 
  
  export function fetchChristmasAnthemsRequest() {
    return {
      type: actionType.FETCH_CHRISTMAS_ANTHEMS_REQUEST,
    }
  } 
    
  export function fetchChristmasAnthems() {
    let tracks = []
    return  async (dispatch) => {
      dispatch(fetchChristmasAnthemsRequest())
      try {
        db.collection('christmasAnthems').get().then(querySnapshot =>{
          querySnapshot.forEach(documentSnapshot  => {
              tracks.push(documentSnapshot.data())
              dispatch(fetchChristmasAnthemsSuccess(tracks))
          } ).catch(e => {
            dispatch(fetchChristmasAnthemsFailure())
          })
         }).catch(error => {
          dispatch(fetchChristmasAnthemsFailure())
        })         

          } catch (error) {
            dispatch(fetchChristmasAnthemsFailure())
          }
    }
  }   