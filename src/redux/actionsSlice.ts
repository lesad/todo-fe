import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "./store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: string[] = [];

const actionsSlice = createSlice({
    name: "actions",
    initialState,
    reducers: {
        appendEffect: (draft, action) => {
            draft.push(JSON.stringify(action.payload));
        },
    },
});

export const selectLastAction = (state: RootState) => {
    const { length } = state.actions;
    return length > 0 ? state.actions[length - 1] : null;
};
export const { appendEffect } = actionsSlice.actions;
export default actionsSlice.reducer;
