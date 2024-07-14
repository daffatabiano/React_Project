import { createSlice } from '@reduxjs/toolkit';

const useInventory = createSlice({
    name: 'inventory',
    initialState: {
        user: [],
    },
    reducers: {
        userLogData: (state, action) => {
            state.user.push(action.payload);
            return state;
        },

        clearUser: (state) => {
            state.user = [];
            return state;
        },
    },
});

export const { userLogData, clearUser } = useInventory.actions;
export default useInventory.reducer;
