import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Filter = 'All' | 'Active' | 'Completed';

export interface FilterState {
  value: Filter;
}

const initialState: FilterState = {
  value: 'All',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterOn: (state, action: PayloadAction<Filter>) => {
      state.value = action.payload;
    },
  },
});

export const { filterOn } = filterSlice.actions
export default filterSlice.reducer
