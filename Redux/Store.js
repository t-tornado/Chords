import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {
  hymnReducer,
  kelenchaReducer,
  anthemReducer,
  choralBluesReducer,
  classicalsReducer,
  easterAnthemsReducer,
  christmasAnthemsReducer, 
} from './Reducers/AllGenresReducer';
import {playerReducer} from './Reducers/PlayerReducer'
import {downlaodsReducer} from './Reducers/DownloadsReducer'

const rootReducer = combineReducers({
  hymns: hymnReducer,
  kelencha: kelenchaReducer,
  anthems: anthemReducer,
  classicals: classicalsReducer,
  player: playerReducer,
  downloads: downlaodsReducer,
  easterAnthems: easterAnthemsReducer,
  christmasAnthems: christmasAnthemsReducer,
  choralBlues: choralBluesReducer,
});

const middleware = applyMiddleware(thunk);

const appStore = createStore(rootReducer, middleware);

export {appStore};
