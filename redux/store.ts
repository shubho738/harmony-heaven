
import { configureStore } from '@reduxjs/toolkit'

import modalReducer, { modalState } from './features/modalSlice'


const store = configureStore({
  reducer: {
    modal: modalReducer
  }
})


export type RootState = {
  modal: modalState
}


export default store
