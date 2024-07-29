import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        isShow: false,
        isId: '',
        isLike: false,
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

        setIsClose: (state) => {
            state.isShow = false;
        },
    },
});

export const { setIsShow, clearIsShow, setIsClose } = postSlice.actions;
export default postSlice.reducer;
