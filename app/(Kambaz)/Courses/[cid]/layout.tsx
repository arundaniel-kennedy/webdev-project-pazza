"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

import Breadcrumb from "./Breadcrumb";
import { RootState } from "../../store";


export default function CoursesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { cid } = useParams();
  const [showSideNav, setShowSideNav] = useState(true);
  const { courses } = useSelector((state:RootState) => state.coursesReducer);
  const course = courses.find((course) => course._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setShowSideNav(!showSideNav)}
          style={{cursor: "pointer"}}
        />
        <Breadcrumb course={course} cid={cid} />
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation showSideNav={showSideNav} />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
