// store.js
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducer/login';  // Assuming loginReducer is in a separate file

export const store = configureStore({
  reducer: {
    auth: loginReducer,
  },
});

export default store;