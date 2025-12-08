import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Assignment {
    _id: string;
    title: string;
    course: string;
    description: string;
    points: number;
    due_date: string;
    available_date: string;
}

const initialState: { assignments: Assignment[] } = {
    assignments: [],
};
const assignmentSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, { payload: assignments }) => {
            state.assignments = assignments
        },
        addAssignment: (state, { payload: assignment }) => {
            const newModule = {
                _id: uuidv4(),
                title: assignment.title,
                course: assignment.course,
                description: assignment.description,
                points: assignment.points,
                due_date: assignment.due_date,
                available_date: assignment.available_date
            };
            state.assignments = [...state.assignments, newModule];
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (m) => m._id !== assignmentId);
        },
        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((m) =>
                m._id === assignment._id ? assignment : m
            );
        },
        editAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.map((m) =>
                m._id === assignmentId ? { ...m, editing: true } : m
            );
        },
    },
});
export const { setAssignments, addAssignment, deleteAssignment, updateAssignment, editAssignment } =
    assignmentSlice.actions;
export default assignmentSlice.reducer;