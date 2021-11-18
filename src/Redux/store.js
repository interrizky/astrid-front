import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '../Redux/UserReducer'

export default configureStore({
  reducer: { 
      UserReducer,
  },
})