import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
// import {reducer as AppReducer} from "./appReducer/reducer";
// import {reducer as AuthReducer} from "./authRedcer/reducer";
import {authReducer} from "./user/reducer.user"
import thunk from "redux-thunk";

const rootReducer = combineReducers({authReducer})

const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
export {store};
