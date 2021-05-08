import {createStore, applyMiddleware,  combineReducers} from 'redux'
import thunk from 'redux-thunk'

import {
    playerReducer,  
    hymnReducer,
    kelenchaReducer,
    classicalsReducer,
    anthemReducer, 
    downlaodsReducer, 
    christmasAnthemsReducer, 
    easterAnthemsReducer,
    choralBluesReducer} from './reducer'

const rootReducer = combineReducers({
    hymns: hymnReducer,
    kelencha: kelenchaReducer,
    anthems: anthemReducer,
    classicals:classicalsReducer ,
    player: playerReducer,
    downloads: downlaodsReducer,
    easterAnthems: easterAnthemsReducer,
    christmasAnthems: christmasAnthemsReducer,
    choralBlues: choralBluesReducer
})

const middleware = applyMiddleware(thunk)

 const appStore = createStore(rootReducer,middleware)

export default appStore; 