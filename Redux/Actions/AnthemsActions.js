import * as actionType from "../ActionTypes";
import { db, firebase } from "../../Config/Firebase";

export function fetchAnthemsSuccess(data) {
  return {
    type: actionType.FETCH_ANTHEMS_SUCCESS,
    payload: data,
  };
}
export function fetchAnthemsFailure(error) {
  return {
    type: actionType.FETCH_ANTHEMS_FAILUER,
    payload: error,
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
