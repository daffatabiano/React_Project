import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './slice/registerSlice';
import postSlice from './slice/postSlice';

const store = configureStore({
    reducer: {
        reg: registerSlice,
        post: postSlice,
    },
});

export default store;
