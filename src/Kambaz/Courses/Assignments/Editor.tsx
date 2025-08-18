import { BsCalendar2Date } from "react-icons/bs";
import { Link, useLocation, useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as assignmentClient from "./client";
import { addAssignment, updateAssignment } from "./reducer";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const assignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );
  const dispatch = useDispatch();
  const isNew = aid === "new";
  const [assignment, setAssignment] = useState({
    _id: "",
    title: "",
    description: "",
    points: 0,
    due_date: "",
    available_from: "",
    available_until: "",
    group: "",
    submission_type: "",
    display_grade_as: "",
    assign_to: "",
    course: cid,
  });
  useEffect(() => {
    if (!isNew) {
      const existing = assignments.find((a: any) => a._id === aid);
      if (existing) {
        setAssignment(existing);
      }
    }
  }, [aid, assignments, isNew]);
  const getAssignmentsUrl = () => {
    const pathSegments = location.pathname.split("/");
    pathSegments.pop();
    return pathSegments.join("/");
  };

  const saveAssignment = async () => {
    if (isNew) {
      const newAssignment = { ...assignment, _id: uuidv4() };
      const created = await assignmentClient.createAssignment(newAssignment);
      dispatch(addAssignment(created));
    } else {
      const updated = await assignmentClient.updateAssignment(assignment);
      dispatch(updateAssignment(updated));
    }
    navigate(getAssignmentsUrl());
  };
  return (
    <div>
      <label>Assignment Name</label>
      <div className="mb-4 row">
        <div>
          <input
            id="wd-name"
            className="form-control w-100"
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
            readOnly={!isFaculty}
          />
        </div>
      </div>
      <div className="mb-4 row">
        <div>
          <textarea
            id="wd-description"
            className="form-control w-100"
            rows={5}
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
            readOnly={!isFaculty}
          />
        </div>
      </div>
      <div className="row mb-3 align-items-center">
        <div className="col-sm-2 text-end">Points</div>
        <div className="col-sm-10">
          <input
            id="wd-points"
            className="form-control"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({ ...assignment, points: Number(e.target.value) })
            }
            readOnly={!isFaculty}
          />
        </div>
      </div>
      <div className="row mb-3 align-items-center">
        <div className="col-sm-2 text-end">Assignment Group</div>
        <div className="col-sm-10">
          <select
            id="wd-group"
            className="form-select"
            value={assignment.group}
            onChange={(e) =>
              setAssignment({ ...assignment, group: e.target.value })
            }
            disabled={!isFaculty}
          >
            <option value="">Select Group</option>
            <option>ASSIGNMENTS1</option>
            <option>ASSIGNMENTS2</option>
          </select>
        </div>
      </div>
      <div className="row mb-3 align-items-center">
        <div className="col-sm-2 text-end">Display Grade as</div>
        <div className="col-sm-10">
          <select
            id="wd-display-grade-as"
            className="form-select"
            value={assignment.display_grade_as}
            onChange={(e) =>
              setAssignment({ ...assignment, display_grade_as: e.target.value })
            }
            disabled={!isFaculty}
          >
            <option value="">Select</option>
            <option>Point</option>
          </select>
        </div>
      </div>
      <div className="row mb-4 align-items-start">
        <div className="col-sm-2 text-end">Submission Type</div>
        <div className="col-sm-10">
          <div className="mb-4 p-4 border rounded">
            <select
              id="wd-submission-type"
              className="form-select"
              value={assignment.submission_type}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  submission_type: e.target.value,
                })
              }
              disabled={!isFaculty}
            >
              <option value="">Select</option>
              <option>Online</option>
              <option>Offline</option>
            </select>
            <label className="form-label fw-bold mt-2">
              Online Entry Options
            </label>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="wd-text-entry"
                className="form-check-input"
                disabled={!isFaculty}
              />
              <label htmlFor="wd-text-entry" className="form-check-label">
                Text Entry
              </label>
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="wd-website-url"
                className="form-check-input"
                disabled={!isFaculty}
              />
              <label htmlFor="wd-website-url" className="form-check-label">
                Website URL
              </label>
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="wd-media-recordings"
                className="form-check-input"
                disabled={!isFaculty}
              />
              <label htmlFor="wd-media-recordings" className="form-check-label">
                Media Recordings
              </label>
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="wd-student-annotations"
                className="form-check-input"
                disabled={!isFaculty}
              />
              <label
                htmlFor="wd-student-annotations"
                className="form-check-label"
              >
                Student Annotations
              </label>
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="wd-file-uploads"
                className="form-check-input"
                disabled={!isFaculty}
              />
              <label htmlFor="wd-file-uploads" className="form-check-label">
                File Uploads
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4 align-items-start">
        <div className="col-sm-2 text-end">Assign</div>
        <div className="col-sm-10">
          <div className="mb-4 p-4 border rounded">
            <label className="form-label fw-bold">Assign to</label>
            <div className="border rounded-lg px-3 py-1 inline-flex items-center bg-gray-100">
              <button
                className="btn btn-outline-secondary"
                disabled={!isFaculty}
              >
                {assignment.assign_to} ✕
              </button>
            </div>
            <div className="mt-3">
              <label className="form-label fw-bold">Due</label>
              <div className="input-group">
                <input
                  type="text"
                  id="wd-due-date"
                  className="form-control"
                  value={assignment.due_date}
                  onChange={(e) =>
                    setAssignment({ ...assignment, due_date: e.target.value })
                  }
                  readOnly={!isFaculty}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  disabled={!isFaculty}
                >
                  <BsCalendar2Date />
                </button>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="form-label fw-bold">Available from</label>
                <div className="input-group">
                  <input
                    type="text"
                    id="wd-available-from"
                    className="form-control"
                    value={assignment.available_from}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        available_from: e.target.value,
                      })
                    }
                    readOnly={!isFaculty}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    disabled={!isFaculty}
                  >
                    <BsCalendar2Date />
                  </button>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Until</label>
                <div className="input-group">
                  <input
                    type="text"
                    id="wd-available-until"
                    className="form-control"
                    value={assignment.available_until}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        available_until: e.target.value,
                      })
                    }
                    readOnly={!isFaculty}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    disabled={!isFaculty}
                  >
                    <BsCalendar2Date />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-end gap-1">
        <Link to={getAssignmentsUrl()} className="btn btn-secondary">
          Cancel
        </Link>
        {isFaculty && (
          <button onClick={saveAssignment} className="btn btn-danger">
            Save
          </button>
        )}
      </div>
    </div>
  );
}