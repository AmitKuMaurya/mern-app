import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {authReducer} from "./user/reducer.user"
import thunk from "redux-thunk";

const rootReducer = combineReducers({authReducer})

const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
export {store};
