import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserReducer';

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
