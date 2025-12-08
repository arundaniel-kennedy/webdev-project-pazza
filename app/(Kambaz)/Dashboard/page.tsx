"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setEnrollments, setCourses } from "../Courses/reducer";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";
import { RootState } from "../store";
import { redirect } from "next/navigation";

import * as client from "../Courses/client";

export default function Dashboard() {
  const { courses, enrollments } = useSelector(
    (state: RootState) => state.coursesReducer
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  if (!currentUser) {
    redirect("/Account/Signin");
  }

  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const [course, setCourse] = useState({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const fetchCourses = async () => {
    try {
      let courses;
      if (showAll) {
        courses = await client.fetchAllCourses();
      } else {
        courses = await client.findMyCourses();
      }
      console.log('courses =>',courses);
      dispatch(setCourses(courses));
      fetchEnrollments();
    } catch (error) {
      console.error(error);
    }
  };
  const fetchEnrollments = async () => {
    const enrollments = await client.fetchUserEnrollments();
    console.log('enrolled', enrollments)
    dispatch(setEnrollments(enrollments));
  };
  useEffect(() => {
    fetchCourses();
  }, [showAll]);

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
    fetchEnrollments();
  };
  const onDeleteCourse = async (courseId: string) => {
    console.log(courseId);
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
    fetchEnrollments();
  };
  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
      )
    );
    fetchEnrollments();
  };
  const onEnrollCourse = async (courseId: string) => {
    await client.enrollIntoCourse(currentUser._id, courseId);
    fetchCourses();
  };
  const onUnEnrollCourse = async (courseId: string) => {
    await client.unenrollFromCourse(currentUser._id, courseId);
    fetchCourses();
  };
  return (
    <div id="wd-dashboard">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button
          className="btn-primary"
          style={{ height: "fit-content" }}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "My Courses": "All Courses"}
        </Button>
      </div>
      <hr />
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={onAddNewCourse}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={onUpdateCourse}
          id="wd-update-course-click"
        >
          Update
        </button>
      </h5>
      <br />
      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        as="textarea"
        value={course.description}
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course_data, index) => {
            return (
              <Col
                className="wd-dashboard-course"
                style={{ width: "300px" }}
                key={index}
              >
                <Card>
                  <Link
                    href={`/Courses/${course_data._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      variant="top"
                      src={course_data.image}
                      width="100%"
                      height={160}
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course_data.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course_data.description}
                      </CardText>
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        {enrollments.find(
                          (e) =>
                            e.course === course_data._id &&
                            e.user === currentUser._id
                        ) ? (
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              onUnEnrollCourse(course_data._id);
                            }}
                            className="btn btn-danger"
                            id="wd-delete-course-click"
                          >
                            UnEnroll
                          </button>
                        ) : (
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              onEnrollCourse(course_data._id);
                            }}
                            className="btn btn-success"
                            id="wd-delete-course-click"
                          >
                            Enroll
                          </button>
                        )}
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            onDeleteCourse(course_data._id);
                          }}
                          className="btn btn-danger"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course_data);
                          }}
                          className="btn btn-warning"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="d-flex flex-row mt-3">
                        <Button variant="primary">Go</Button>
                      </div>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
