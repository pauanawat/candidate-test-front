import {
    applyMiddleware,
    compose,
    legacy_createStore as createStore,
    Store,
    StoreEnhancer
  } from 'redux'
  import { createLogger } from 'redux-logger'
  import thunk, { ThunkMiddleware } from 'redux-thunk'
  import { AppActions } from './type'
  
  import rootReducer, { AppState } from './rootReducer'
  
  const logger = createLogger()
  
  export default function configureStore(preloadedState?: AppState): Store<any> {
    const middlewareEnhancer = applyMiddleware(
      thunk as ThunkMiddleware<AppState, AppActions>,
      logger
    )
  
    const enhancers = [middlewareEnhancer]
    // const enhancers = [
    //   middlewareEnhancer,
    //   (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    //     (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    // ]
    const composedEnhancers: StoreEnhancer = compose(...enhancers)
  
    const store = createStore<AppState, AppActions, {}, {}>(
      rootReducer,
      preloadedState,
      composedEnhancers
    )
  
    return store
  }
  