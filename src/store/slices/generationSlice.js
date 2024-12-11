import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  history: [],
  isGenerating: false,
  error: null,
};

const generationSlice = createSlice({
  name: 'generation',
  initialState,
  reducers: {
    setGenerating: (state, action) => {
      state.isGenerating = action.payload;
    },
    addToHistory: (state, action) => {
      state.history.unshift(action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setGenerating, addToHistory, setError } = generationSlice.actions;
export default generationSlice.reducer;