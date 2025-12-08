"use client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";

import * as client from "../client";

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
      alert(user.message)
    } else {
      if (!user) return;
      dispatch(setCurrentUser(user));
      redirect("/Dashboard");
    }
  };

  return (
    <div id="wd-signin-screen" style={{ width: "350px" }}>
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
  );
}
