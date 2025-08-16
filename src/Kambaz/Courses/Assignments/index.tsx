import {
  BsChevronDown,
  BsGripVertical,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { BiBook } from "react-icons/bi";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteAssignment } from "./reducer";
import { Button, FormControl, InputGroup } from "react-bootstrap";

function DeleteAssignmentModal({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div
      id="wd-delete-assignment-dialog"
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Delete Assignment</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" />
          </div>
          <div className="modal-body">
            Are you sure you want to delete this assignment?
          </div>
          <div className="modal-footer">
            <Button variant="secondary" data-bs-dismiss="modal">
              Cancel
            </Button>
            <Button variant="danger" onClick={onConfirm} data-bs-dismiss="modal">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const assignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );

  const isFaculty = currentUser?.role === "FACULTY";
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete));
      setAssignmentToDelete(null);
    }
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <InputGroup style={{ width: "200px" }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl placeholder="Search..." id="wd-search-assignment" />
        </InputGroup>

        {isFaculty && (
          <div className="d-flex gap-2">
            <Button id="wd-add-assignment-group" variant="secondary">
              <FaPlus className="me-1" />
              Group
            </Button>
            <Button
              id="wd-add-assignment"
              variant="danger"
              onClick={() =>
                navigate(`/Kambaz/Courses/${cid}/Assignments/new`)
              }
            >
              <FaPlus className="me-1" />
              Assignment
            </Button>
          </div>
        )}
      </div>

      <ul id="wd-modules" className="list-group rounded-0 mt-4">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <BsChevronDown className="me-2 fs-5" />
              ASSIGNMENTS
            </div>
            {isFaculty && (
              <div className="d-flex align-items-center">
                <span className="border rounded-pill px-3 py-1 text-muted">
                  40% of Total
                </span>
                <Button variant="link" className="text-dark p-1 mx-1">
                  <FaPlus />
                </Button>
                <Button variant="link" className="text-dark p-1 mx-1">
                  <BsThreeDotsVertical />
                </Button>
              </div>
            )}
          </div>

          <ul className="wd-lessons list-group rounded-0">
            {assignments
              .filter((a: any) => a.course === cid)
              .map((assignment: any) => (
                <li
                  key={assignment._id}
                  className="wd-lesson list-group-item p-3 d-flex align-items-center justify-content-between border-start border-success"
                >
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-5 text-muted" />
                    <BiBook className="me-2 fs-5 text-muted" />
                    <div>
                      <a
                        href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                        className="wd-assignment-link text-decoration-none text-dark fw-bold"
                      >
                        {assignment.title}
                      </a>
                      <div className="text-muted">
                        <span className="text-danger">Multiple Modules</span> |{" "}
                        <strong>Not available until</strong>{" "}
                        {assignment.available_from} |
                      </div>
                      <div className="text-muted">
                        <strong>Available Until</strong> {assignment.available_until} |{" "}
                        <strong>Due</strong> {assignment.due_date} | {assignment.points} pts
                      </div>
                    </div>
                  </div>

                  {isFaculty && (
                    <div className="d-flex align-items-center">
                      <GreenCheckmark />
                      <Button
                        variant="link"
                        className="text-dark p-1"
                        data-bs-toggle="modal"
                        data-bs-target="#wd-delete-assignment-dialog"
                        onClick={() => setAssignmentToDelete(assignment._id)}
                      >
                        <FaTrash />
                      </Button>
                      <Button variant="link" className="text-dark p-1">
                        <BsThreeDotsVertical className="text-muted" />
                      </Button>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </li>
      </ul>

      {isFaculty && <DeleteAssignmentModal onConfirm={handleDeleteConfirm} />}
    </div>
  );
}
