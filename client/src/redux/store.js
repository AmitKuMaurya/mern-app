import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {authReducer} from "./user/reducer.user";
import {productReducer} from "./product/reducer.product"; 
import thunk from "redux-thunk";

const rootReducer = combineReducers({authReducer, productReducer});

const store = legacy_createStore(rootReducer,applyMiddleware(thunk));
export {store};
