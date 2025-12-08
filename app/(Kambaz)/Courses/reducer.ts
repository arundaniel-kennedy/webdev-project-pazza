import { createSlice } from "@reduxjs/toolkit";
import { courses, enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    department: string;
    credits: string;
    description: string;
    image: string;
}

interface Enrollment {
    _id: string;
    user: string;
    course: string;
}

const initialState: {
    courses: Course[];
    enrollments: Enrollment[];
} = {
    courses: [],
    enrollments: []
};
const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setCourses: (state, { payload: courses }) => {
            state.courses = courses
        },
        addNewCourse: (state, { payload: course }) => {
            const newCourse = { ...course, _id: uuidv4() };
            state.courses = [...state.courses, newCourse];
            const newEnrollment = {
                _id: uuidv4(),
                user: course.currentUserId,
                course: newCourse._id,
            };
            state.enrollments = [...state.enrollments, newEnrollment];
        },
        deleteCourse: (state, { payload: courseId }) => {
            state.courses = state.courses.filter(
                (course) => course._id !== courseId
            );
        },
        updateCourse: (state, { payload: course }) => {
            state.courses = state.courses.map((c) =>
                c._id === course._id ? course : c
            );
        },
        setEnrollments: (state, { payload: enrollments }) => {
            state.enrollments = enrollments
        },
        enrollCourse: (state, { payload: enrollment }) => {
            const newEnrollment = {
                _id: uuidv4(),
                user: enrollment.currentUserId,
                course: enrollment.courseId,
            };
            state.enrollments = [...state.enrollments, newEnrollment];
        },
        unEnrollCourse: (state, { payload: enrollmentData }) => {
            state.enrollments = state.enrollments.filter(
                (enrollment) => enrollment.course !== enrollmentData.courseId &&
                    enrollment.user === enrollmentData.currentUserId
            )
        },
    },
});
export const { setCourses, addNewCourse, deleteCourse, updateCourse, setEnrollments, enrollCourse, unEnrollCourse } =
    coursesSlice.actions;
export default coursesSlice.reducer;