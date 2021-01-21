import * as actionType from "../actionTypes";
import { db, firebase } from "../../Config/firebase";

export function fetchChristmasAnthemsSuccess(data) {
  return {
    type: actionType.FETCH_CHRISTMAS_ANTHEMS_SUCCESS,
    payload: data,
  };
}
export function fetchChristmasAnthemsFailure() {
  return {
    type: actionType.FETCH_CHRISTMAS_ANTHEMS_FAILURE,
  };
}

export function fetchChristmasAnthemsRequest() {
  return {
    type: actionType.FETCH_CHRISTMAS_ANTHEMS_REQUEST,
  };
}

export function fetchChristmasAnthems() {
  return async (dispatch) => {
    dispatch(fetchChristmasAnthemsRequest());
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection("christmasAnthems")
            .get()
            .then((querySnapshot) => {
              let tracks = [];
              querySnapshot
                .forEach((documentSnapshot) => {
                  tracks.push(documentSnapshot.data());
                  dispatch(fetchChristmasAnthemsSuccess(tracks));
                })
                .catch(() => {
                  dispatch(fetchChristmasAnthemsFailure());
                });
            })
            .catch(() => {
              dispatch(fetchChristmasAnthemsFailure());
            });
        }
        if (!user) {
          firebase
            .auth()
            .signInAnonymously()
            .then(() => fetchChristmasAnthems())
            .catch(() => null);
        }
      });
    } catch (error) {
      dispatch(fetchChristmasAnthemsFailure());
    }
  };
}
