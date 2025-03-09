import { combineReducers } from "redux";
import { authReducer } from "./authReducers";

export const allReducers = combineReducers({
  authReducer,
  //add more reducers
})