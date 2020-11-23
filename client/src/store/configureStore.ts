import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(modules.rootReducer, applyMiddleware(sagaMiddleware))

export default store

sagaMiddleware.run(modules.rootSagas)

export type RootState = ReturnType<typeof modules.rootReducer>
