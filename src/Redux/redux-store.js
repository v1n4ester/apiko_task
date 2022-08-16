import { applyMiddleware, combineReducers, compose, legacy_createStore as createStote } from "redux";
import thunkMiddleware from 'redux-thunk'
import appReducer from "./app-reducer";
import authReducer from "./auth-reducer";
import { goodsReducer } from "./goods-reducer";
import offerReducer from "./offer-reducer";

const reducers = combineReducers({
    main: goodsReducer,
    auth: authReducer,
    app: appReducer,
    offer: offerReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStote(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;