import * as actionType from "../actionTypes";
import { db, firebase } from "../../Config/firebase";

export function fetchHymnsSuccess(data) {
  return {
    type: actionType.FETCH_HYMNS_SUCCESS,
    payload: data,
  };
}
export function fetchHymnsFailure(error) {
  return {
    type: actionType.FETCH_HYMNS_FAILUER,
    payload: error,
  };
}

export function fetchHymnsRequest() {
  return {
    type: actionType.FETCH_HYMNS_REQUEST,
  };
}

export function fetchHymns() {
  return (dispatch) => {
    dispatch(fetchHymnsRequest());
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection("hymns")
            .get()
            .then((querySnapshot) => {
              let tracks = [];
              querySnapshot
                .forEach((documentSnapshot) => {
                  tracks.push(documentSnapshot.data());
                  dispatch(fetchHymnsSuccess(tracks));
                })
                .catch(() => {
                  dispatch(fetchHymnsFailure());
                });
            })
            .catch(() => {
              dispatch(fetchHymnsFailure());
            });
        }
        if (!user) {
          firebase
            .auth()
            .signInAnonymously()
            .then(() => fetchHymns())
            .catch(() => null);
        }
      });
    } catch (error) {
      dispatch(fetchHymnsFailure());
    }
  };
}
