"use client";

import Link from "next/link";
import { FormControl } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { redirect } from "next/navigation";

import * as client from "../client";

export default function Signup() {
  interface SignupUser {
    username?: string;
    password?: string;
  }
  const [user, setUser] = useState<SignupUser>({});
  const dispatch = useDispatch();
  const signup = async () => {
    if (!user.username || !user.password) {
      alert("All fields are required");
      return;
    }
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    redirect("/Account/Profile");
  };

  return (
    <div className="wd-signup-screen" style={{ width: "350px" }}>
      <h2>Sign up</h2>
      <FormControl
        defaultValue={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username mb-2"
        placeholder="username"
      />
      <FormControl
        defaultValue={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-2"
        placeholder="password"
        type="password"
      />
      <button
        onClick={signup}
        className="wd-signup-btn btn btn-primary mb-2 w-100"
      >
        Sign up
      </button>
      <br />
      <Link href="/Account/Signin" className="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
