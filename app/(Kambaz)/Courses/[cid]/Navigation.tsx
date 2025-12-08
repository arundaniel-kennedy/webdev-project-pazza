"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";

export default function CourseNavigation({
  showSideNav,
}: {
  showSideNav: boolean;
}) {
  const pathname = usePathname();
  const { cid } = useParams();
  const links = [
    "Home",
    "Modules",
    "Pazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  return (
    <div
      id="wd-courses-navigation"
      className={`wd list-group fs-5 rounded-0 position-sticky ${showSideNav ? "": "d-none"}`}
      style={{ top: "20px" }}
    >
      {links.map((e, i) => {
        return (
          <Link
            href={`/Courses/${cid}/${e}`}
            id="wd-course-home-link"
            key={i}
            className={`list-group-item border-0
              ${pathname.includes(e) ? "active" : "text-danger"}`}
          >
            {e}
          </Link>
        );
      })}
      {/* <Link
        href={`/Courses/${cid}/Home`}
        id="wd-course-home-link"
        className="list-group-item active border-0"
      >
        Home
      </Link>
      <Link
        href={"/Courses/" + cid + "/Modules"}
        id="wd-course-modules-link"
        className="list-group-item text-danger border-0"
      >
        Modules
      </Link>
      <Link
        href={"/Courses/" + cid + "/Piazza"}
        id="wd-course-piazza-link"
        className="list-group-item text-danger border-0"
      >
        Piazza
      </Link>
      <Link
        href={"/Courses/" + cid + "/Zoom"}
        id="wd-course-zoom-link"
        className="list-group-item text-danger border-0"
      >
        Zoom
      </Link>
      <Link
        href={"/Courses/" + cid + "/Assignments"}
        id="wd-course-assignments-link"
        className="list-group-item text-danger border-0"
      >
        Assignments
      </Link>
      <Link
        href={"/Courses/" + cid + "/Quizzes"}
        id="wd-course-quizzes-link"
        className="list-group-item text-danger border-0"
      >
        Quizzes
      </Link>
      <Link
        href={"/Courses/" + cid + "/Grades"}
        id="wd-course-grades-link"
        className="list-group-item text-danger border-0"
      >
        Grades
      </Link>
      <Link
        href={"/Courses/" + cid + "/People"}
        id="wd-course-people-link"
        className="list-group-item text-danger border-0"
      >
        People
      </Link> */}
    </div>
  );
}
