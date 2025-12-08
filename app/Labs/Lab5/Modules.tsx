"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function Modules() {
  const [module, setModule] = useState({
    id: "M101",
    name: "Introduction to Rocket Propulsion",
    description: "Basic principles of rocket propulsion and rocket engines.",
    course: "RS101",
  });
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects: Modules</h3>
      <h4>Retrieving Module</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/module`}
        target="_blank"
      >
        Get Module
      </a>
      <hr />
      <h4>Retrieving name</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/module/name`}
        target="_blank"
      >
        Get Module Name
      </a>
      <hr />
      <h4>Modifying Properties</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end me-3"
        href={`${HTTP_SERVER}/lab5/module/name/${module.name}`}
        target="blank"
      >
        Update Name{" "}
      </a>
      <FormControl
        className="w-75"
        id="wd-module-name"
        defaultValue={module.name}
        onChange={(e) =>
          setModule({ ...module, name: e.target.value })
        }
      />
      <hr />
    </div>
  );
}
