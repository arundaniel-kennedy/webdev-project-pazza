"use client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";

import * as client from "../client";
import "./page.scss";

export default function Signin() {
  const [credentials, setCredentials] = useState({
    username: "iron_man",
    password: "stark123",
  });
  const dispatch = useDispatch();
  const signin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user = await client.signin(credentials);
    if (user.hasOwnProperty("message")) {
      alert(user.message);
    } else {
      if (!user) return;
      dispatch(setCurrentUser(user));
      redirect("/Dashboard");
    }
  };

  return (
    <div
      id="wd-signin-screen"
      // style={{ width: "350px" }}
    >
      <div className="content-left">
        <h2>Sign in</h2>
        <FormControl
          id="wd-email"
          placeholder="email"
          className="mb-2"
          defaultValue={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-2"
          defaultValue={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <Button
          type="button"
          onClick={signin}
          id="wd-signin-btn"
          className="btn btn-primary w-100 mb-2"
        >
          Sign in
        </Button>
        <br />
        <Link href="Signup" id="wd-signup-link">
          Sign up
        </Link>
      </div>
      <div className="content-right">
        <h2>Project Details</h2>
        <h4>Kambaz Pazza</h4>
        Project Participants:
        <ul>
          <li>Arun Daniel Kenendy - Section 04</li>
          <li>Arth Sindekar - Section 04</li>
          <li>Ashwin Gurumurthy - Section 04</li>
        </ul>
        <div>
          <b>Github Frontend URL:</b>
          <a
            target="_blank"
            href="https://github.com/arundaniel-kennedy/webdev-project-pazza"
          >
            https://github.com/arundaniel-kennedy/webdev-project-pazza
          </a>
        </div>
        <div className="mt-2">
          <b>Github Backend URL:</b>
          <a
            target="_blank"
            href="https://github.com/arundaniel-kennedy/webdev-project-pazza-backend"
          >
            https://github.com/arundaniel-kennedy/webdev-project-pazza-backend
          </a>
        </div>
      </div>
    </div>
  );
}
