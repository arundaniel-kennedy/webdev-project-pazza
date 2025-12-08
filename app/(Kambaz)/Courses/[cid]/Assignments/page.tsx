"use client";
import { useParams } from "next/navigation";

import Link from "next/link";
import AssignmentsControls from "./AssignmentsControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdEditDocument } from "react-icons/md";
import AssignmentSectionControl from "./AssignmentSectionControl";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments } from "./reducer";
import { RootState } from "../../../store";

import * as client from "./client";
import { useEffect } from "react";

function makeDateReadable(givenDate: string) {
  const locales = "default";
  const parsedDate = new Date(givenDate);
  const longMonth = parsedDate.toLocaleString(locales, { month: "long" });
  const date = parsedDate.getDate().toString().padStart(2, "0");
  const hour = (
    parsedDate.getHours() % 12 != 0 ? parsedDate.getHours() % 12 : 12
  )
    .toString()
    .padStart(2, "0");
  const minute = parsedDate.getMinutes().toString().padStart(2, "0");
  const last_bit = parsedDate.getHours() < 12 ? "AM" : "PM";
  return `${longMonth} ${date} at ${hour}:${minute} ${last_bit}`;
}

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentReducer
  );
  const dispatch = useDispatch();

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    console.log(assignments)
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  
  const onRemoveAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(cid as string, assignmentId);
    dispatch(setAssignments(assignments.filter((a) => a._id !== assignmentId)));
  };

  return (
    <div id="wd-assignments">
      <AssignmentsControls />
      <ListGroup className="rounded-0 mt-5" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary fs-5">
            <BsGripVertical className="me-2 fs-3" /> Assignments
            <AssignmentSectionControl />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {assignments
              .map((assignment) => {
                return (
                  <ListGroupItem
                    className="wd-lesson p-3 ps-2 d-flex flex-row gap-3 align-items-center"
                    key={assignment._id}
                  >
                    <BsGripVertical className="fs-3" />
                    <MdEditDocument className="fs-3" />
                    <div className="d-flex flex-column">
                      <Link
                        href={`/Courses/${cid}/Assignments/${assignment._id}`}
                        className="wd-assignment-link"
                      >
                        <h4>{assignment.title}</h4>
                      </Link>
                      <div className="d-flex flex-row flex-wrap gap-2">
                        <span className="text-danger pe-2 border-end border-dark-subtle">
                          Multiple Modules
                        </span>
                        <strong className="pe-2 border-end border-dark-subtle">
                          Not available until{" "}
                          <span style={{ fontWeight: "normal" }}>
                            {makeDateReadable(assignment.available_date)}
                          </span>
                        </strong>
                        <div className="pe-2 border-end border-dark-subtle">
                          <strong>Due</strong>
                          <span> {makeDateReadable(assignment.due_date)}</span>
                        </div>
                        <span>{assignment.points} pts</span>
                      </div>
                    </div>
                    <AssignmentControlButtons
                      assignmentId={assignment._id}
                      onRemoveAssignment={onRemoveAssignment}
                    />
                  </ListGroupItem>
                );
              })}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
