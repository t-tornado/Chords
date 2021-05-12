import * as actionType from '../ActionTypes'
import {playerState} from '../MainAppState'

export const anthemReducer = (state = playerState, action) => {
    if (action.type === actionType.FETCH_ANTHEMS_REQUEST) {
      return {
        ...state,
        loadingAnthems: true,
        loadingAnthemsError: false,
      };
    } else if (action.type === actionType.FETCH_ANTHEMS_FAILUER) {
      return {
        ...state,
        loadingAnthems: false,
        loadingAnthemsError: true,
      };
    } else if (action.type === actionType.FETCH_ANTHEMS_SUCCESS) {
      return {
        ...state,
        loadingAnthems: false,
        anthems: action.payload,
        loadingAnthemsError: false,
        anthemsFetched: true,
      };
    }
    return state;
  };


export const classicalsReducer = (state = playerState, action) => {
    if (action.type === actionType.FETCH_CLASSICALS_REQUEST) {
      return {
        ...state,
        loadingClassicals: true,
        loadingClassicalsError: false,
      };
    } else if (action.type === actionType.FETCH_CLASSICALS_FAILUER) {
      return {
        ...state,
        loadingClassicals: false,
        loadingClassicalsError: true,
      };
    } else if (action.type === actionType.FETCH_CLASSICALS_SUCCESS) {
      return {
        ...state,
        loadingClassicals: false,
        classicals: action.payload,
        loadingClassicalsError: false,
        classicalsFetched: true,
      };
    }
    return state;
  };

  export const kelenchaReducer = (state = playerState, action) => {
    if (action.type === actionType.FETCH_KELENCHA_REQUEST) {
      return {
        ...state,
        loadingKelencha: true,
        loadingKelenchaError: false,
      };
    } else if (action.type === actionType.FETCH_KELENCHA_FAILUER) {
      return {
        ...state,
        loadingKelencha: false,
        loadingKelenchaError: true,
      };
    } else if (action.type === actionType.FETCH_KELENCHA_SUCCESS) {
      return {
        ...state,
        loadingKelencha: false,
        kelencha: action.payload,
        loadingKelenchaError: false,
        kelenchaFetched: true,
      };
    }
    return state;
  };

  export const hymnReducer = (state = playerState, action) => {
    if (action.type === actionType.FETCH_HYMNS_REQUEST) {
      return {
        ...state,
        loadingHymns: true,
        loadingHymnsError: false,
      };
    } else if (action.type === actionType.FETCH_HYMNS_FAILUER) {
      return {
        ...state,
        loadingHymns: false,
        loadingHymnsError: true,
      };
    } else if (action.type === actionType.FETCH_HYMNS_SUCCESS) {
      return {
        ...state,
        loadingHymns: false,
        hymns: action.payload,
        loadingHymnsError: false,
        hymnsFetched: true,
      };
    }
    return state;
  };


export const easterAnthemsReducer = (state = playerState, action) => {
    if (action.type == actionType.FETCH_EASTER_ANTHEMS_FAILURE) {
      return {
        ...state,
        loadingEasterAnthemsError: true,
        loadingEasterAnthems: false,
      };
    } else if (action.type == actionType.FETCH_EASTER_ANTHEMS_SUCCESS) {
      return {
        ...state,
        loadingEasterAnthems: false,
        loadingEasterAnthemsError: false,
        easterAnthemsFetched: true,
        easterAnthems: action.payload,
      };
    } else if (action.type == actionType.FETCH_EASTER_ANTHEMS_REQUEST) {
      return {
        ...state,
        loadingEasterAnthems: true,
        loadingEasterAnthemsError: false,
      };
    }
    return state;
  };
  

  export const christmasAnthemsReducer = (state = playerState, action) => {
    if (action.typ == actionType.FETCH_CHRISTMAS_ANTHEMS_REQUEST) {
      return {
        ...state,
        loadingChristmasAnthemsError: false,
        loadingChristmasAnthems: true,
      };
    } else if (action.type == actionType.FETCH_CHRISTMAS_ANTHEMS_SUCCESS) {
      return {
        ...state,
        loadingChristmasAnthems: false,
        loadingChristmasAnthemsError: false,
        christmasAnthemsFetched: true,
        christmasAnthems: action.payload,
      };
    } else if (action.type == actionType.FETCH_CHRISTMAS_ANTHEMS_FAILURE) {
      return {
        ...state,
        loadingChristmasAnthemsError: true,
        loadingChristmasAnthems: false,
      };
    }
    return state;
  };

  
  export const choralBluesReducer = (state = playerState, action) => {
    if (action.type == actionType.FETCH_CHORAL_BLUES_REQUEST) {
      return {
        ...state,
        loadingChoralBlues: true,
        loadingChoralBluesError: false,
      };
    } else if (action.type == actionType.FETCH_CHORAL_BLUES_SUCCESS) {
      return {
        ...state,
        choralBlues: action.payload,
        choralBluesFetched: true,
        loadingChoralBluesError: false,
        loadingChoralBlues: false,
      };
    } else if (action.type == actionType.FETCH_CHORAL_BLUES_FAILURE) {
      return {
        ...state,
        loadingChoralBlues: false,
        loadingChoralBluesError: true,
      };
    }
    return state;
  };
  