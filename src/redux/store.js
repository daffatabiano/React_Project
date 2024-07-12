import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './slice/registerSlice';
import postSlice from './slice/postSlice';
import inventorySlice from './slice/inventorySlice';

const store = configureStore({
    reducer: {
        reg: registerSlice,
        post: postSlice,
        inventory: inventorySlice,
    },
});

export default store;
