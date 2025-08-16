import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { assignments as rawAssignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

export interface Assignment {
  _id: string;
  title: string;
  description: string;
  points: number;
  due_date: string;
  available_from: string;
  available_until: string;
  group: string;
  submission_type: string;
  display_grade_as: string;
  assign_to: string;
  course: string;
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: rawAssignments.map(a => ({
    _id: a._id,
    title: a.title,
    description: a.description,
    points: a.points,
    course: a.course,
    due_date: a.dueDate,
    available_from: a.availableFrom,
    available_until: a.availableUntil,
    group: "",
    submission_type: "",
    display_grade_as: "",
    assign_to: "",
  })),
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment(state, action: PayloadAction<Partial<Assignment>>) {
      state.assignments.push({
        _id: uuidv4(),
        title: action.payload.title || "",
        description: action.payload.description || "",
        points: action.payload.points || 0,
        due_date: action.payload.due_date || "",
        available_from: action.payload.available_from || "",
        available_until: action.payload.available_until || "",
        group: action.payload.group || "",
        submission_type: action.payload.submission_type || "",
        display_grade_as: action.payload.display_grade_as || "",
        assign_to: action.payload.assign_to || "",
        course: action.payload.course || "",
      });
    },

    deleteAssignment(state, action: PayloadAction<string>) {
      state.assignments = state.assignments.filter(a => a._id !== action.payload);
    },

    updateAssignment(state, action: PayloadAction<Assignment>) {
      state.assignments = state.assignments.map(a =>
        a._id === action.payload._id ? action.payload : a
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
