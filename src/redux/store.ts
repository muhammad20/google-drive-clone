import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/auth.reducer";
import { fileReducer } from "./reducers/file.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    files: fileReducer
});

export const store = createStore(rootReducer,
    applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;