import { createSlice } from "@reduxjs/toolkit";

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbacks: [],
  },
  reducers: {
    setFeedbacks: (state, action) => {
      state.feedbacks = action.payload;
    },
    delFeedbacks: (state, action) => {
      state.feedbacks = state.feedbacks.filter(item => item?._id !== action.payload._id);
    },
    newFeedback: (state, action) => {
        state.feedbacks.push(action.payload);
    },
    updateFeedbackx: (state, action) => {
        const arrIndex = state.feedbacks.findIndex(item => item._id === action.payload._id);
        state.feedbacks[arrIndex] = action.payload;   
    }
  },
});

export const { setFeedbacks, delFeedbacks, newFeedback, updateFeedbackx } = feedbackSlice.actions;
export default feedbackSlice.reducer;
