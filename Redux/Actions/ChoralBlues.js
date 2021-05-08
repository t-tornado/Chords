import * as actionType from "../ActionTypes";
import { db, firebase } from "../../Config/Firebase";

export function fetchChoralBluesSuccess(data) {
  return {
    type: actionType.FETCH_CHORAL_BLUES_SUCCESS,
    payload: data,
  };
}
export function fetchChoralBluesFailure() {
  return {
    type: actionType.FETCH_CHORAL_BLUES_FAILURE,
  };
}

export function fetchChoralBluesRequest() {
  return {
    type: actionType.FETCH_CHORAL_BLUES_REQUEST,
  };
}

export function fetchChoralBlues() {
  return async (dispatch) => {
    dispatch(fetchChoralBluesRequest());
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection("choralBlues")
            .get()
            .then((querySnapshot) => {
              let tracks = [];
              querySnapshot
                .forEach((documentSnapshot) => {
                  tracks.push(documentSnapshot.data());
                  dispatch(fetchChoralBluesSuccess(tracks));
                })
                .catch(() => {
                  dispatch(fetchChoralBluesFailure());
                });
            })
            .catch(() => {
              dispatch(fetchChoralBluesFailure());
            });
        }
        if (!user) {
          firebase
            .auth()
            .signInAnonymously()
            .then(() => fetchChoralBlues())
            .catch(() => null);
        }
      });
    } catch (error) {
      dispatch(fetchChoralBluesFailure());
    }
  };
}
