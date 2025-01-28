import { configureStore } from '@reduxjs/toolkit'
import loginreducer from "./reducers/login"

export const store = configureStore({
  reducer: {
    login:loginreducer

  }
})
// console.log("store",store)