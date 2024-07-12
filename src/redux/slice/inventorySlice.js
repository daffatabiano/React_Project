import { createSlice } from '@reduxjs/toolkit';

const useInventory = createSlice({
    name: 'inventory',
    initialState: [],
    reducers: {
        getInventory: (state, action) => {
            return action.payload;
        },
    },
});

export const { getInventory } = useInventory.actions;
export default useInventory.reducer;
