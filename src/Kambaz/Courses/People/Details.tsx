import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { FaPencil } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import * as client from "../../Account/client";
import { FormControl } from "react-bootstrap";
export default function PeopleDetails() {
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const closeDetails = () => {
    if (window.history.length <= 2) {
      navigate("/people");
    } else {
      navigate(-1);
    }
  };
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    closeDetails();
  };
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };
  useEffect(() => {
    fetchUser();
  }, [uid]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    if (editing) {
      setName(`${user.firstName || ""} ${user.lastName || ""}`.trim());
    }
  }, [editing, user]);
  const saveUser = async () => {
    const [firstName = "", lastName = ""] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    closeDetails();
  };
  return (
    <>
      {!uid ? null : (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
          <button
            onClick={closeDetails}
            className="btn position-fixed end-0 top-0 wd-close-details"
          >
            <IoCloseSharp className="fs-1" />
          </button>
          <div className="text-center mt-2">
            <FaUserCircle className="text-secondary me-2 fs-1" />
          </div>
          <hr />
          <div className="text-danger fs-4 wd-name">
            {!editing ? (
              <>
                <FaPencil
                  onClick={() => setEditing(true)}
                  className="float-end fs-5 mt-2 wd-edit"
                />
                <div className="wd-name" onClick={() => setEditing(true)}>
                  {user.firstName} {user.lastName}
                </div>
              </>
            ) : (
              <>
                <FaCheck
                  onClick={saveUser}
                  className="float-end fs-5 mt-2 me-2 wd-save"
                />
                <FormControl
                  className="w-50 wd-edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveUser();
                    }
                  }}
                />
              </>
            )}
          </div>
          <b>Roles:</b> <span className="wd-roles"> {user.role} </span> <br />
          <b>Login ID:</b> <span className="wd-login-id"> {user.loginId} </span>{" "}
          <br />
          <b>Section:</b> <span className="wd-section"> {user.section} </span>{" "}
          <br />
          <b>Total Activity:</b> <hr />
          <button
            onClick={() => deleteUser(uid)}
            className="btn btn-danger float-end wd-delete"
          >
            Delete
          </button>
          <button
            onClick={closeDetails}
            className="btn btn-secondary float-start float-end me-2 wd-cancel"
          >
            Cancel
          </button>
          <span className="wd-total-activity">{user.totalActivity}</span>
        </div>
      )}
    </>
  );
}