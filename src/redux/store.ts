import { applyMiddleware, createStore } from "redux";
// Redux DevTools
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
// Root reducer/saga
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";
// Redux-saga
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
const middlewareEnhancer = [sagaMiddleware];

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middlewareEnhancer)
    )
);

sagaMiddleware.run(rootSaga);

export default store;
