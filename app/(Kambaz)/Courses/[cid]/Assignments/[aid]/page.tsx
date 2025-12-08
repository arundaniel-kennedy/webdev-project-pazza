"use client";
import { redirect, useParams } from "next/navigation";

import {
  Button,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
} from "react-bootstrap";
import { ParamValue } from "next/dist/server/request/params";
import InputGroup from "react-bootstrap/InputGroup";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAssignment } from "../reducer";
import Link from "next/link";
import { RootState } from "../../../../store";

import * as client from "../client";

interface AssignmentStruct {
    _id: string;
    title: string;
    course: ParamValue;
    description: string;
    points: number;
    due_date: string;
    available_date: string;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentReducer
  );
  const [assignment, setAssignment] = useState(
    assignments.find((e) => e._id === aid)
  );
  const dispatch = useDispatch();
  const saveAssignment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (assignment) {
      await client.updateAssignment(cid as string, assignment);
    }
    dispatch(updateAssignment(assignment));
    redirect(`/Courses/${cid}/Assignments`);
  };

  if (assignment !== undefined) {
    return (
      <div id="wd-assignments-editor" style={{ maxWidth: "512px" }}>
        <label htmlFor="wd-name">Assignment Name</label>
        <FormControl
          id="wd-name"
          defaultValue={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
          className="mb-3"
        />
        <FormControl
          as={"textarea"}
          id="wd-description"
          rows={10}
          cols={50}
          className="mb-3"
          defaultValue={assignment.description}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        ></FormControl>
        <div className="d-flex flex-row mb-3 gap-3 align-items-center">
          <FormLabel htmlFor="wd-points" className="w-30 text-end m-0">
            Points
          </FormLabel>
          <FormControl
            type="number"
            id="wd-points"
            defaultValue={assignment.points.toString()}
            onChange={(e) =>
              setAssignment({ ...assignment, points: parseInt(e.target.value) })
            }
            className="w-70"
          />
        </div>
        <div className="d-flex flex-row mb-3 gap-3 align-items-center">
          <FormLabel htmlFor="wd-points" className="w-30 text-end m-0">
            Assignment Group
          </FormLabel>
          <FormSelect name="" id="wd-assignment-group" className="w-70">
            <option value="assignments">ASSIGNMENTS</option>
            <option value="quizzes">QUIZZES</option>
            <option value="exams">EXAMS</option>
          </FormSelect>
        </div>
        <div className="d-flex flex-row mb-3 gap-3 align-items-center">
          <FormLabel htmlFor="wd-points" className="w-30 text-end m-0">
            Display Grade as
          </FormLabel>
          <FormSelect name="" id="wd-grade-display" className="w-70">
            <option value="percentage">Percentage</option>
          </FormSelect>
        </div>
        <div className="d-flex flex-row mb-3 gap-3 align-items-start">
          <FormLabel htmlFor="wd-points" className="w-30 text-end m-0 pt-2">
            Submission Type
          </FormLabel>
          <div className="w-70 p-2 rounded-2 border">
            <FormSelect name="" id="wd-submission-type" className="w-70 mb-3">
              <option value="online">Online</option>
            </FormSelect>
            <FormLabel htmlFor="wd-points" className="fw-bold">
              Online Entry Options
            </FormLabel>
            <div className="mb-2 d-flex gap-2 align-items-center">
              <FormCheck type="checkbox" name="" id="text_entry_box" />
              <FormLabel className="m-0" htmlFor="text_entry_box">
                Text Entry
              </FormLabel>
            </div>
            <div className="mb-2 d-flex gap-2 align-items-center">
              <FormCheck type="checkbox" name="" id="website_url_box" />
              <FormLabel className="m-0" htmlFor="website_url_box">
                Website URL
              </FormLabel>
            </div>
            <div className="mb-2 d-flex gap-2 align-items-center">
              <FormCheck type="checkbox" name="" id="media_recordings_box" />
              <FormLabel className="m-0" htmlFor="media_recordings_box">
                Media Recordings
              </FormLabel>
            </div>
            <div className="mb-2 d-flex gap-2 align-items-center">
              <FormCheck type="checkbox" name="" id="student_annotation_box" />
              <FormLabel className="m-0" htmlFor="student_annotation_box">
                Student Annotation
              </FormLabel>
            </div>
            <div className="mb-2 d-flex gap-2 align-items-center">
              <FormCheck type="checkbox" name="" id="file_uploads_box" />
              <FormLabel className="m-0" htmlFor="file_uploads_box">
                File Uploads
              </FormLabel>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row mb-3 gap-3 align-items-start">
          <FormLabel htmlFor="wd-points" className="w-30 text-end m-0 pt-2">
            Assign
          </FormLabel>
          <div className="w-70 p-2 rounded-2 border">
            <FormLabel className="fw-bold" htmlFor="wd-assign-to">
              Assign To
            </FormLabel>
            <FormControl
              className="mb-3"
              type="text"
              defaultValue={"Everyone"}
              name=""
              id="wd-assign-to"
            />
            <FormLabel htmlFor="wd-due-date" className="fw-bold">
              Due
            </FormLabel>
            <InputGroup className="mb-3">
              <FormControl
                type="date"
                name=""
                id="wd-due-date"
                defaultValue={assignment.due_date.split("T")[0]}
                onChange={(e) =>
                  setAssignment({ ...assignment, due_date: e.target.value })
                }
                aria-describedby="basic-addon2"
              />
              <span className="input-group-text" id="basic-addon2">
                <FaCalendarAlt />
              </span>
            </InputGroup>
            <div className="d-flex flex-row gap-2">
              <div className="w-50">
                <FormLabel htmlFor="wd-due-date" className="fw-bold">
                  Available from
                </FormLabel>
                <InputGroup className="mb-3">
                  <FormControl
                    type="date"
                    name=""
                    id="wd-avail-date"
                    defaultValue={assignment.available_date.split("T")[0]}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        available_date: e.target.value,
                      })
                    }
                    aria-describedby="basic-addon3"
                  />
                  <span className="input-group-text" id="basic-addon3">
                    <FaCalendarAlt />
                  </span>
                </InputGroup>
              </div>
              <div className="w-50">
                <FormLabel htmlFor="wd-due-date" className="fw-bold">
                  Until
                </FormLabel>
                <InputGroup className="mb-3">
                  <FormControl
                    type="date"
                    name=""
                    id="wd-until-date"
                    defaultValue={assignment.due_date.split("T")[0]}
                    onChange={(e) =>
                      setAssignment({ ...assignment, due_date: e.target.value })
                    }
                    aria-describedby="basic-addon4"
                  />
                  <span className="input-group-text" id="basic-addon4">
                    <FaCalendarAlt />
                  </span>
                </InputGroup>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex flex-row justify-content-end">
          <Link
            className="btn-secondary me-2"
            href={`/Courses/${cid}/Assignments`}
          >
            Cancel
          </Link>
          <Button onClick={saveAssignment} className="btn-danger">
            Save
          </Button>
        </div>
      </div>
    );
  } else {
    // redirect(`/Courses/${cid}/Assignments/`);
  }
}
