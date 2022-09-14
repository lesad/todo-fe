import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import createSagaMiddleware from "redux-saga";

import api from "./apiSlice";
import effectReducer from "./effectSlice";
import filterReducer from "./filterSlice";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        filter: filterReducer,
        effect: effectReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, sagaMiddleware),
});

setupListeners(store.dispatch);
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
