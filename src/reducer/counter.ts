import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state): number => state + 1,
    decrement: (state): number => state - 1,
  },
});

export default counterSlice;
