"use client";
import { redirect, useParams } from "next/navigation";

import {
  Button,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments } from "../reducer";
import Link from "next/link";

import * as client from "../client";
import { RootState } from "../../../../store";
import { ParamValue } from "next/dist/server/request/params";

interface AssignmentStruct {
    _id: string;
    title: string;
    course: ParamValue;
    description: string;
    points: number;
    due_date: string;
    available_date: string;
}

export default function AddAssignment() {
  const { cid } = useParams();
  const [validated, setValidated] = useState(false);
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentReducer
  );
  const [assignment, setAssignment] = useState<AssignmentStruct>({
    _id: "",
    title: "",
    course: cid as string,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt minus maiores atque odit quos optio praesentium voluptatibus recusandae! Mollitia facilis blanditiis aut quis voluptas debitis atque repellendus, fugiat iste officiis. \n Quos eius beatae quisquam obcaecati, laborum temporibus, cumque architecto ea a veritatis dolorem delectus quibusdam, dignissimos ex. Rerum accusantium dolorum quia, quidem eligendi architecto adipisci, animi, saepe ipsam dignissimos id.\n Perspiciatis quisquam odio consectetur quaerat? Nam fuga, ex quam reprehenderit corporis in similique repellendus repudiandae consectetur incidunt culpa, magnam qui vero, quaerat atque laborum suscipit animi ipsa praesentium. Mollitia, a.\n Commodi similique a laboriosam, expedita enim numquam quos sit at tempora ullam ad possimus itaque, sint, eius quod minus explicabo dolores! Quidem minus esse facere dolorem, voluptate dignissimos deleniti minima?\n Numquam, aliquid nostrum possimus nam, eligendi dolor corrupti obcaecati modi eaque illo quas quaerat commodi sint nihil impedit expedita, laudantium non distinctio consectetur repudiandae veniam iste quis! Saepe, quaerat aliquam.\n Hic, laborum! Voluptas delectus autem quas inventore neque enim rem suscipit voluptatum earum tenetur repellat quidem, officia nesciunt quasi, ut unde architecto. Quae ea veniam soluta suscipit sed quo accusamus?\n Odit, modi! Expedita ipsam, rerum suscipit quibusdam eos, dolorem nihil fugit sequi, voluptatem exercitationem earum. Vitae dolorem a illo earum, eum, sed labore et tempore odit consequatur ipsa optio reprehenderit.\n Eius, sed alias perferendis, cupiditate laudantium, officia ab incidunt eaque error aperiam accusamus rerum et vero fuga suscipit cum molestiae est aut odio. Ea cum assumenda ullam fugiat, dolores et.\n Sit deserunt voluptate alias nobis dolore aperiam placeat neque error! Magni et maxime earum, hic numquam beatae necessitatibus deserunt. Quae repellendus consequuntur cumque voluptates reiciendis quos explicabo ea, officiis cupiditate!\n Totam, assumenda ut ea cupiditate, esse delectus commodi, laboriosam soluta sed nesciunt distinctio recusandae provident expedita voluptas ab natus consectetur voluptatibus. Praesentium commodi nemo error hic corporis illo voluptatibus modi.\n",
    points: 0,
    due_date: "",
    available_date: "",
  });
  const dispatch = useDispatch();

  const saveAssignment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      console.log(assignment);
      const newAssignment = await client.createAssignmentForCourse(
        cid as string,
        assignment
      );
      dispatch(setAssignments([...assignments, newAssignment]));
      redirect(`/Courses/${cid}/Assignments`);
    }

    setValidated(true);
  };

  return (
    <Form
      id="wd-assignments-editor"
      style={{ maxWidth: "512px" }}
      noValidate
      validated={validated}
      onSubmit={saveAssignment}
    >
      <label htmlFor="wd-name">Assignment Name</label>
      <FormControl
        id="wd-name"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
        className="mb-3"
        required
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
        required
      ></FormControl>
      <div className="d-flex flex-row mb-3 gap-3 align-items-center">
        <FormLabel htmlFor="wd-points" className="w-30 text-end m-0">
          Points
        </FormLabel>
        <FormControl
          type="number"
          id="wd-points"
          defaultValue={assignment.points}
          onChange={(e) =>
            setAssignment({ ...assignment, points: parseInt(e.target.value) })
          }
          className="w-70"
          required
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
                setAssignment({
                  ...assignment,
                  due_date: e.target.value + "T11:59",
                })
              }
              aria-describedby="basic-addon2"
              required
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
                      available_date: e.target.value + "T00:00",
                    })
                  }
                  aria-describedby="basic-addon3"
                  required
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
                    setAssignment({
                      ...assignment,
                      due_date: e.target.value + "T11:59",
                    })
                  }
                  aria-describedby="basic-addon4"
                  required
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
          className="btn btn-secondary me-2"
          href={`/Courses/${cid}/Assignments`}
        >
          Cancel
        </Link>
        <Button type="submit" className="btn-danger">
          Save
        </Button>
      </div>
    </Form>
  );
}
