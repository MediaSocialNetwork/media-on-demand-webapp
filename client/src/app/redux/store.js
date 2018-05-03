import { applyMiddleware, createStore, compose } from 'redux'

import reducer from './reducers'

// support REDUX Chrome Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...[])
  )
)
