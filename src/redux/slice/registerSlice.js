import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
    name: 'reg',
    initialState: {
        imageUrl: '',
        reg: [],
    },
    reducers: {
        imageUrl: (state, action) => {
            if (action.payload) {
                state.imageUrl = action.payload;
            }
        },

        clearImageUrl: (state) => {
            state.imageUrl = '';
        },

        reg: (state, action) => {
            if (action.payload) {
                state.reg.push(action.payload);
            }
            console.log(state);
        },

        clearReg: (state) => {
            state.reg = [];
        },
    },
});

export const { imageUrl, clearImageUrl, reg, clearReg } = registerSlice.actions;
export default registerSlice.reducer;
