import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { createStore } from 'redux';
import userReducer from './Component/Reducer/userReducer';  // Your user reducer

const persistConfig = {
  key: 'root',
  storage,  // LocalStorage by default
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
