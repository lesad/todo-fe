import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./store";

export enum Filter {
    All = "All",
    Active = "Active",
    Completed = "Completed",
}

const initialState: { value: Filter } = {
    value: Filter.All,
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        filterOn: (draft, action: PayloadAction<Filter>) => {
            draft.value = action.payload;
        },
    },
});

export const selectFilter = (state: RootState) => state.filter.value;
export const { filterOn } = filterSlice.actions;
export default filterSlice.reducer;
