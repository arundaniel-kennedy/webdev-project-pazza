"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment`}
        target="_blank"
      >
        Get Assignment
      </a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment/title`}
        target="_blank"
      >
        Get Title
      </a>
      <hr />
      <h4>Modifying Properties</h4>
      <div className="d-flex flex-row justify-content-between">
        <FormControl
          className="w-75"
          id="wd-assignment-title"
          defaultValue={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
        <a
          id="wd-update-assignment-title"
          className="btn btn-primary mx-3"
          href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
          target="blank"
        >
          Update Title{" "}
        </a>
      </div>
      <div className="d-flex flex-row justify-content-between my-2">
        <FormControl
          type="number"
          className="w-75"
          id="wd-assignment-score"
          defaultValue={assignment.score}
          onChange={(e) =>
            setAssignment({ ...assignment, score: parseInt(e.target.value) })
          }
        />
        <a
          id="wd-update-assignment-score"
          className="btn btn-primary mx-3"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
          target="blank"
        >
          Update Score{" "}
        </a>
      </div>
      <div className="d-flex flex-row align-items-center">
        <input
          type="checkbox"
          id="wd-assignment-completed"
          defaultChecked={assignment.completed}
          onClick={(e) =>
            setAssignment({
              ...assignment,
              completed: !assignment.completed,
            })
          }
        />
        <label htmlFor="wd-assignment-completed" className="ms-2">
          Completed
        </label>
        <a
          id="wd-update-assignment-completed"
          className="btn btn-primary ms-auto me-3"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
          target="blank"
        >
          Update Completed
        </a>
      </div>
      <hr />
    </div>
  );
}
