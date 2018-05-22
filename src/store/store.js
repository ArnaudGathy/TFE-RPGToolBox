import {compose, createStore} from 'redux'
import {persistCombineReducers, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {reducers} from '../reducers/index'

const config = {
  key: 'root',
  storage,
  debug: true
}

const persistedReducer = persistCombineReducers(config, reducers)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
    persistedReducer,
    composeEnhancers()
  )

export const persistor = persistStore(store)
