"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { ParamValue } from "next/dist/server/request/params";

export default function Breadcrumb({
  course,
  cid
}: {
  course: { name: string } | undefined;
  cid: ParamValue
}) {
  const pathname = usePathname();
  return (
    <span>
      Course {course?.name} [{cid}] &gt; {pathname.split("/").pop()}
    </span>
  );
}
