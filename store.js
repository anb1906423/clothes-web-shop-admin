import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import { persistStore } from 'redux-persist';

import createRootReducer from './reducers/rootReducer';

const environment = process.env.NODE_ENV || 'development';
let isDevelopment = environment === 'development';

//hide redux logs
isDevelopment = false;

const rootReducer = createRootReducer();
const middleware = [thunkMiddleware];

const reduxStore = configureStore({
    reducer: rootReducer,
    middleware: middleware,
    devTools: isDevelopment,
});

export const dispatch = reduxStore.dispatch;

export const persistor = persistStore(reduxStore);

export default reduxStore;