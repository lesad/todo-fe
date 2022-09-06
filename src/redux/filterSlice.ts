import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";

export type Filter = "All" | "Active" | "Completed";

interface FilterState {
    value: Filter;
}

const initialState: FilterState = {
    value: "All",
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        filterOn: (state, action: PayloadAction<Filter>) => {
            state.value = action.payload;
        },
    },
});

export const selectFilter = (state: RootState) => state.filter.value;
export const { filterOn } = filterSlice.actions;
export default filterSlice.reducer;
