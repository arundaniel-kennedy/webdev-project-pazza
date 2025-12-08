import EnvironmentVariables from "./EnvironmentVariables";
import HttpClient from "./HttpClient";
import Modules from "./Modules";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

import "./page.css";

export default function Lab5() {
  return (
    <div id="wd-lab5" className="pt-3">
      <h2>Lab 5</h2>
      <div className="list-group">
        <a
          href={`${HTTP_SERVER}/lab5/welcome`}
          className="list-group-item w-25"
          target="_blank"
        >
          Welcome
        </a>
      </div>
      <hr />
      <EnvironmentVariables />
      <PathParameters />
      <QueryParameters />
      <WorkingWithObjects />
      <Modules />
      <WorkingWithArrays />
      <HttpClient />
      <WorkingWithObjectsAsynchronously />
      <WorkingWithArraysAsynchronously />
    </div>
  );
}
