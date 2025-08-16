import { createSlice } from "@reduxjs/toolkit";
import * as db from "./Database";

const initialState = { enrollments: db.enrollments };

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, action) => {
      const { user, course } = action.payload;
      state.enrollments = [
        ...state.enrollments,
        { _id: Date.now().toString(), user, course },
      ];
    },
    unenroll: (state, action) => {
      const { user, course } = action.payload;
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(enrollment.user === user && enrollment.course === course)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;