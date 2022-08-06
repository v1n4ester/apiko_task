import { applyMiddleware, combineReducers, compose, legacy_createStore as createStote} from "redux";
import thunkMiddleware from 'redux-thunk'
import authReducer from "./auth-reducer";
import { goodsReducer } from "./goods-reducer";

const reducers = combineReducers({
    main: goodsReducer,
    auth: authReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store= createStote(reducers , composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;