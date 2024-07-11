import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
    name: 'reg',
    initialState: {
        imageUrl: '',
        regPayload: {
            name: '',
            username: '',
            email: '',
            password: '',
            passwordRepeat: '',
            profilePictureUrl: '',
            phoneNumber: '',
            bio: '',
            website: '',
        },
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
    },
});

export const { imageUrl, clearImageUrl } = registerSlice.actions;
export default registerSlice.reducer;
