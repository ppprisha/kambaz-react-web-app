import { BsCalendar2Date } from "react-icons/bs";
import { Link, useLocation, useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addAssignment, updateAssignment } from "./reducer";
import { FormControl, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const assignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );

  const isFaculty = currentUser?.role === "FACULTY";
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
      if (existing) setAssignment(existing);
    }
  }, [aid, assignments, isNew]);

  const getAssignmentsUrl = () => {
    const pathSegments = location.pathname.split("/");
    pathSegments.pop();
    return pathSegments.join("/");
  };

  const saveAssignment = () => {
    if (isNew) dispatch(addAssignment(assignment));
    else dispatch(updateAssignment(assignment));
    navigate(getAssignmentsUrl());
  };

  return (
    <div id="wd-assignment-editor">
      <h1>Assignment Editor</h1>

      <FormControl
        id="wd-name"
        className="mb-3"
        placeholder="Assignment Name"
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
        readOnly={!isFaculty}
      />

      <FormControl
        as="textarea"
        id="wd-description"
        className="mb-3"
        rows={5}
        placeholder="Description"
        value={assignment.description}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
        readOnly={!isFaculty}
      />

      <div className="row mb-3">
        <div className="col-sm-2 text-end">Points</div>
        <div className="col-sm-10">
          <FormControl
            id="wd-points"
            type="number"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({ ...assignment, points: Number(e.target.value) })
            }
            readOnly={!isFaculty}
          />
        </div>
      </div>

      <div className="row mb-3">
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

      <div className="row mb-3">
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

      <div className="row mb-4">
        <div className="col-sm-2 text-end">Submission Type</div>
        <div className="col-sm-10 p-3 border rounded">
          <select
            id="wd-submission-type"
            className="form-select mb-2"
            value={assignment.submission_type}
            onChange={(e) =>
              setAssignment({ ...assignment, submission_type: e.target.value })
            }
            disabled={!isFaculty}
          >
            <option value="">Select</option>
            <option>Online</option>
            <option>Offline</option>
          </select>

          <label className="form-label fw-bold">Online Entry Options</label>
          {["Text Entry", "Website URL", "Media Recordings", "Student Annotations", "File Uploads"].map(
            (option, idx) => (
              <div className="form-check mb-2" key={idx}>
                <input
                  type="checkbox"
                  id={`wd-${option.toLowerCase().replace(/\s+/g, "-")}`}
                  className="form-check-input"
                  disabled={!isFaculty}
                />
                <label
                  htmlFor={`wd-${option.toLowerCase().replace(/\s+/g, "-")}`}
                  className="form-check-label"
                >
                  {option}
                </label>
              </div>
            )
          )}
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-sm-2 text-end">Assign</div>
        <div className="col-sm-10 p-3 border rounded">
          <label className="form-label fw-bold">Assign to</label>
          <div className="d-inline-flex mb-3">
            <Button variant="outline-secondary" disabled={!isFaculty}>
              {assignment.assign_to} ✕
            </Button>
          </div>

          <label className="form-label fw-bold">Due</label>
          <div className="input-group mb-2">
            <FormControl
              id="wd-due-date"
              value={assignment.due_date}
              onChange={(e) =>
                setAssignment({ ...assignment, due_date: e.target.value })
              }
              readOnly={!isFaculty}
            />
            <Button variant="outline-secondary" disabled={!isFaculty}>
              <BsCalendar2Date />
            </Button>
          </div>

          <div className="row">
            {[
              { label: "Available from", id: "wd-available-from", value: assignment.available_from },
              { label: "Until", id: "wd-available-until", value: assignment.available_until },
            ].map((field, idx) => (
              <div className="col-md-6 mb-2" key={idx}>
                <label className="form-label fw-bold">{field.label}</label>
                <div className="input-group">
                  <FormControl
                    id={field.id}
                    value={field.value}
                    onChange={(e) =>
                      setAssignment({ ...assignment, [field.id.split("-").pop()]: e.target.value })
                    }
                    readOnly={!isFaculty}
                  />
                  <Button variant="outline-secondary" disabled={!isFaculty}>
                    <BsCalendar2Date />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <Link to={getAssignmentsUrl()} className="btn btn-secondary">
          Cancel
        </Link>
        {isFaculty && (
          <Button variant="danger" onClick={saveAssignment}>
            Save
          </Button>
        )}
      </div>
    </div>
  );
}
