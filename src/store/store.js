import {createStore, combineReducers} from 'redux'
import {reducers} from '../reducers/index'

const reducer = combineReducers(reducers)

export const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
