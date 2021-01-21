import * as actionType from "../actionTypes";
import { db, firebase } from "../../Config/firebase";

export function fetchClassicalsSuccess(data) {
  return {
    type: actionType.FETCH_CLASSICALS_SUCCESS,
    payload: data,
  };
}
export function fetchClassicalsFailure(error) {
  return {
    type: actionType.FETCH_CLASSICALS_FAILUER,
    payload: error,
  };
}

export function fetchClassicalsRequest() {
  return {
    type: actionType.FETCH_CLASSICALS_REQUEST,
  };
}

export function fetchclassicals() {
  return async (dispatch) => {
    dispatch(fetchClassicalsRequest());
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection("classicals")
            .get()
            .then((querySnapshot) => {
              let tracks = [];
              querySnapshot
                .forEach((documentSnapshot) => {
                  tracks.push(documentSnapshot.data());
                  dispatch(fetchClassicalsSuccess(tracks));
                })
                .catch(() => {
                  dispatch(fetchClassicalsFailure());
                });
            })
            .catch(() => {
              dispatch(fetchClassicalsFailure());
            });
        }
        if (!user) {
          firebase
            .auth()
            .signInAnonymously()
            .then(() => fetchclassicals())
            .catch(() => null);
        }
      });
    } catch (error) {
      dispatch(fetchClassicalsFailure());
    }
  };
}
