import * as actionType from "../ActionTypes";
import { db, firebase } from "../../Config/Firebase";

export function fetchAnthemsSuccess(data) {
  return {
    type: actionType.FETCH_ANTHEMS_SUCCESS,
    payload: data,
  };
}
export function fetchAnthemsFailure() {
  return {
    type: actionType.FETCH_ANTHEMS_FAILURE,
  };
}

export function fetchAnthemsRequest() {
  return {
    type: actionType.FETCH_ANTHEMS_REQUEST,
  };
}

export function fetchAnthems() {
  return async (dispatch) => {
    dispatch(fetchAnthemsRequest());
    try {
      firebase.auth().onAuthStateChanged((user) => {
        // console.log('INFO FROM ANTHEMS ACTIONS  >>>>: after dispatching fetching anthems request')
        if (user) {
          db.collection("anthems")
            .get()
            .then((querySnapshot) => {
              let tracks = [];
              querySnapshot
                .forEach((documentSnapshot) => {
                  tracks.push(documentSnapshot.data());
                  dispatch(fetchAnthemsSuccess(tracks));
                })
                .catch((e) => {
                  dispatch(fetchAnthemsFailure());
                });
            })
            .catch((error) => {
              dispatch(fetchAnthemsFailure());
              // console.log('INFO FROM ANTHEMS ACTIONS  >>>>: dispatching fetching anthems error  ')
            });
        }
        if (!user) {
          firebase
            .auth()
            .signInAnonymously()
            .then(() => fetchAnthems())
            .catch(() => null);
        }
      });
    } catch (error) {
      dispatch(fetchAnthemsFailure());
    }
  };
}
