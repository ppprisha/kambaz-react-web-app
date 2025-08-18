import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

interface DashboardProps {
  courses: any[];
  courseForm: any;
  setCourseForm: (course: any) => void;
  addCourseHandler: () => void;
  updateCourseHandler: () => void;
  deleteCourseHandler: (courseId: any) => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}

export default function Dashboard({
  courses,
  courseForm,
  setCourseForm,
  addCourseHandler,
  updateCourseHandler,
  deleteCourseHandler,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: DashboardProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";
  const [enrollmentStatus, setEnrollmentStatus] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const statusMap: { [key: string]: boolean } = {};
    courses.forEach((course) => {
      statusMap[course._id] = course.enrolled;
    });
    setEnrollmentStatus(statusMap);
  }, [courses]);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addCourseHandler}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={(e) => {
                e.preventDefault();
                updateCourseHandler();
              }}
            >
              Update
            </button>
          </h5>
          <br />
          <input
            value={courseForm?.name || ""}
            className="form-control mb-2"
            onChange={(e) =>
              setCourseForm({ ...courseForm, name: e.target.value })
            }
          />
          <textarea
            value={courseForm?.description || ""}
            className="form-control"
            onChange={(e) =>
              setCourseForm({ ...courseForm, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      {isStudent && (
        <button
          className="btn btn-primary float-end"
          onClick={() => setEnrolling(!enrolling)}
        >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      )}
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course: any) => (
            <div
              key={course._id}
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
            >
              <div className="card rounded-3 overflow-hidden">
                {isFaculty ||
                !isStudent ||
                !enrolling ||
                enrollmentStatus[course._id] ? (
                  <Link
                    to={`/Kambaz/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <img
                      src="/images/reactjs.jpg"
                      width="100%"
                      height={160}
                      alt="course"
                    />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name.substring(0, 20)}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description.substring(0, 50)}
                      </p>
                      {isStudent && enrolling && (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            const newStatus = !enrollmentStatus[course._id];
                            setEnrollmentStatus({
                              ...enrollmentStatus,
                              [course._id]: newStatus,
                            });
                            updateEnrollment(course._id, newStatus);
                          }}
                          className={`btn ${
                            enrollmentStatus[course._id]
                              ? "btn-danger"
                              : "btn-success"
                          } d-block mt-2`}
                        >
                          {enrollmentStatus[course._id] ? "Unenroll" : "Enroll"}
                        </button>
                      )}
                      {isStudent && !enrolling && (
                        <button className="btn btn-primary d-block mt-2">
                          Go
                        </button>
                      )}
                      {isFaculty && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourseHandler(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourseForm({ ...course });
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </div>
                  </Link>
                ) : (
                  <div className="text-dark text-decoration-none">
                    <img
                      src="/images/reactjs.jpg"
                      width="100%"
                      height={160}
                      alt="course"
                    />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name.substring(0, 20)}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description.substring(0, 50)}
                      </p>
                      {isStudent && enrolling && (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            const newStatus = !enrollmentStatus[course._id];
                            setEnrollmentStatus({
                              ...enrollmentStatus,
                              [course._id]: newStatus,
                            });
                            updateEnrollment(course._id, newStatus);
                          }}
                          className={`btn ${
                            enrollmentStatus[course._id]
                              ? "btn-danger"
                              : "btn-success"
                          } d-block mt-2`}
                        >
                          {enrollmentStatus[course._id] ? "Unenroll" : "Enroll"}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}