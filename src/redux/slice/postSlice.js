import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        isShow: false,
        isId: '',
    },
    reducers: {
        setIsShow: (state, action) => {
            state.isId = action?.payload;
            state.isShow = true;
        },

        clearIsShow: (state) => {
            state.isShow = false;
            state.isId = '';
        },
    },
});

export const { setIsShow, clearIsShow } = postSlice.actions;
export default postSlice.reducer;
