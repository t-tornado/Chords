import * as actionType from "../actionTypes";
import { db, firebase } from "../../Config/firebase";

export function fetchKelenchaSuccess(data) {
  return {
    type: actionType.FETCH_KELENCHA_SUCCESS,
    payload: data,
  };
}
export function fetchKelenchaFailure(error) {
  return {
    type: actionType.FETCH_KELENCHA_FAILUER,
    payload: error,
  };
}

export function fetchKelenchaRequest() {
  return {
    type: actionType.FETCH_KELENCHA_REQUEST,
  };
}

export function fetchKelencha() {
  return (dispatch) => {
    dispatch(fetchKelenchaRequest());
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection("kelencha")
            .get()
            .then((querySnapshot) => {
              let tracks = [];
              querySnapshot
                .forEach((documentSnapshot) => {
                  tracks.push(documentSnapshot.data());
                  dispatch(fetchKelenchaSuccess(tracks));
                })
                .catch(() => {
                  dispatch(fetchKelenchaFailure());
                });
            })
            .catch(() => {
              dispatch(fetchKelenchaFailure());
            });
        }
        if (!user) {
          firebase
            .auth()
            .signInAnonymously()
            .then(() => fetchKelencha())
            .catch(() => null);
        }
      });
    } catch (error) {
      dispatch(fetchKelenchaFailure());
    }
  };
}
