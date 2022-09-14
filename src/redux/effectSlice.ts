import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { sagaActions } from "./sagaActions";
import type { RootState } from "./store";

const initialState: { value: typeof sagaActions | "" } = {
    value: "",
};

const effectSlice = createSlice({
    name: "effect",
    initialState,
    reducers: {
        currentEffect: (draft, action: PayloadAction<typeof sagaActions>) => {
            draft.value = action.payload;
        },
    },
});

export const selectEffect = (state: RootState) => state.effect.value;
export const { currentEffect } = effectSlice.actions;
export default effectSlice.reducer;
