import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({ cart: cartReducer });

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
