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
    },
});

export const { userLogData } = useInventory.actions;
export default useInventory.reducer;
