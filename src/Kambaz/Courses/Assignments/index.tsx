import {
  BsChevronDown,
  BsGripVertical,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { BiBook } from "react-icons/bi";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as assignmentClient from "./client";
import { deleteAssignment, setAssignments } from "./reducer";

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
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this assignment?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              data-bs-dismiss="modal"
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const assignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const isFaculty = currentUser?.role === "FACULTY";
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(
    null
  );

  useEffect(() => {
    assignmentClient.fetchAllAssignments().then((data) => {
      dispatch(setAssignments(data));
    });
  }, [dispatch]);

  const handleDeleteConfirm = async () => {
    if (assignmentToDelete) {
      await assignmentClient.deleteAssignment(assignmentToDelete);
      dispatch(deleteAssignment(assignmentToDelete));
      setAssignmentToDelete(null);
    }
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex" style={{ width: "200px" }}>
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              id="wd-search-assignment"
            />
          </div>
        </div>
        {isFaculty && (
          <div className="d-flex gap-2">
            <button id="wd-add-assignment-group" className="btn btn-secondary">
              <FaPlus className="position-relative" style={{ bottom: "1px" }} />
              Group
            </button>
            <button
              id="wd-add-assignment"
              className="btn btn-danger"
              onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}
            >
              <FaPlus className="position-relative" style={{ bottom: "1px" }} />
              Assignment
            </button>
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
                <button className="btn btn-link text-dark p-1 mx-1">
                  <FaPlus />
                </button>
                <button className="btn btn-link text-dark p-1 mx-1">
                  <BsThreeDotsVertical />
                </button>
              </div>
            )}
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
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
                        <strong>Available Until</strong>{" "}
                        {assignment.available_until} | <strong>Due</strong>{" "}
                        {assignment.due_date} | {assignment.points} pts
                      </div>
                    </div>
                  </div>
                  {isFaculty && (
                    <div className="d-flex align-items-center">
                      <GreenCheckmark />
                      <button
                        className="btn btn-link text-dark p-1"
                        data-bs-toggle="modal"
                        data-bs-target="#wd-delete-assignment-dialog"
                        onClick={() => setAssignmentToDelete(assignment._id)}
                      >
                        <FaTrash />
                      </button>
                      <button className="btn btn-link text-dark p-1">
                        <BsThreeDotsVertical className="text-muted" />
                      </button>
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