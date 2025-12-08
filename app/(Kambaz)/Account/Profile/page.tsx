"use client";
import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser, User } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";

import * as client from "../client";

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const [profile, setProfile] = useState<User | null>(null);

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };
  const updateProfile = async () => {
    if (!profile) return;
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  useEffect(() => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser);
  }, [currentUser]);

  return (
    <div className="wd-profile-screen" style={{maxWidth: "350px"}}>
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl
            id="wd-username"
            className="mb-2"
            placeholder="username"
            defaultValue={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <FormControl
            id="wd-password"
            className="mb-2"
            defaultValue={profile.password}
            placeholder="password"
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <FormControl
            id="wd-firstname"
            className="mb-2"
            defaultValue={profile.firstName}
            placeholder="First Name"
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <FormControl
            id="wd-lastname"
            className="mb-2"
            defaultValue={profile.lastName}
            placeholder="Last Name"
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <FormControl
            id="wd-dob"
            className="mb-2"
            type="date"
            defaultValue={profile.dob}
            title="Date of Birth"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <FormControl
            id="wd-email"
            className="mb-2"
            defaultValue={profile.email}
            placeholder="email"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select className="form-control mb-2" id="wd-role">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>{" "}
            <option value="STUDENT">Student</option>
          </select>
          <button
            onClick={updateProfile}
            className="btn btn-primary w-100 mb-2"
          >
            Update
          </button>
          <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
