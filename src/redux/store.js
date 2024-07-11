import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './slice/registerSlice';

const store = configureStore({
    reducer: {
        reg: registerSlice,
    },
});

export default store;
