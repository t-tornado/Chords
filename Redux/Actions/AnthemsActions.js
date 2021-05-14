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
        
        if (user) {
          db.collection("anthems")
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach(docs => console.log('DOCS SNAP: ',docs.data()))
              // console.log('NFO FROM ANTHEMS ACTIONS  >>>> document snapshot object from query snapshot object ', querySnapshot)
              let tracks = [];
              querySnapshot
              .forEach((documentSnapshot) => {
                console.log(documentSnapshot.data())
                  tracks.push(documentSnapshot.data());
                  dispatch(fetchAnthemsSuccess(tracks));
                  console.log('INFO FROM ANTHEMS ACTIONS  >>>>: anthems fetched successfully. ', tracks)
                })
                .catch((e) => {
                  dispatch(fetchAnthemsFailure());
                });
            })
            .catch((error) => {
              dispatch(fetchAnthemsFailure());
              console.log('INFO FROM ANTHEMS ACTIONS  >>>>: dispatching fetching anthems error  ',error)
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
