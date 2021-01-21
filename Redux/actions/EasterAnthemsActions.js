import * as actionType from "../actionTypes";
import { db, firebase } from "../../Config/firebase";

export function fetchEasterAnthemsSuccess(data) {
  return {
    type: actionType.FETCH_EASTER_ANTHEMS_SUCCESS,
    payload: data,
  };
}
export function fetchEasterAnthemsFailure() {
  return {
    type: actionType.FETCH_EASTER_ANTHEMS_FAILURE,
  };
}

export function fetchEasterAnthemsRequest() {
  return {
    type: actionType.FETCH_EASTER_ANTHEMS_REQUEST,
  };
}

export function fetchEasterAnthems() {
  return async (dispatch) => {
    dispatch(fetchEasterAnthemsRequest());
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection("easterAnthems")
            .get()
            .then((querySnapshot) => {
              let tracks = [];
              querySnapshot
                .forEach((documentSnapshot) => {
                  tracks.push(documentSnapshot.data());
                  dispatch(fetchEasterAnthemsSuccess(tracks));
                })
                .catch(() => {
                  dispatch(fetchEasterAnthemsFailure());
                });
            })
            .catch(() => {
              dispatch(fetchEasterAnthemsFailure());
            });
        }
        if (!user) {
          firebase
            .auth()
            .signInAnonymously()
            .then(() => fetchEasterAnthems())
            .catch(() => null);
        }
      });
    } catch (error) {
      dispatch(fetchEasterAnthemsFailure());
    }
  };
}
