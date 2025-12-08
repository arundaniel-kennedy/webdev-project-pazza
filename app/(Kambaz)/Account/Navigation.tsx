"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  return (
    <div id="wd-account-navigation" className="wd list-group rounded-0">
      {links.map((e, i) => {
        return (
          <Link
            href={e}
            id="wd-course-home-link"
            key={i}
            className={`list-group-item border-0
              ${pathname.includes(e) ? "active" : "text-danger"}`}
          >
            {e}
          </Link>
        );
      })}
      {currentUser && currentUser.role === "ADMIN" && (
       <Link href={`/Account/Users`} className={`list-group-item border-0
              ${pathname.includes('Users') ? "active" : "text-danger"}`}> Users </Link> )}
    </div>
  );
}
