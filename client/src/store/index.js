// store.js
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducer/login';  // Assuming loginReducer is in a separate file

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
