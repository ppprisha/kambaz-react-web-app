import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, deleteCourse, updateCourse } from "./Courses/reducer";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const dispatch = useDispatch();
   const navigate = useNavigate();
  const courses = useSelector((state: any) => state.courseReducer.courses);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showEnrollments, setShowEnrollments] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [courseForm, setCourseForm] = useState({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const handleCourseFormChange = (field: string, value: string) => {
    setCourseForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddOrUpdate = () => {
    if (courseForm._id === "0") {
      dispatch(addCourse(courseForm));
    } else {
      dispatch(updateCourse(courseForm));
    }
    setCourseForm({
      _id: "0",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      image: "/images/reactjs.jpg",
      description: "New Description",
    });
  };

  const handleEditCourse = (course: any) => setCourseForm(course);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <div className="mb-3">
        <input
          value={courseForm.name}
          className="form-control mb-2"
          placeholder="Course Name"
          onChange={(e) => handleCourseFormChange("name", e.target.value)}
        />
        <textarea
          value={courseForm.description}
          className="form-control mb-2"
          placeholder="Course Description"
          onChange={(e) => handleCourseFormChange("description", e.target.value)}
        />
        <button className="btn btn-primary me-2" onClick={handleAddOrUpdate}>
          {courseForm._id === "0" ? "Add Course" : "Update Course"}
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-5 g-4">
        {courses.map((course: any) => (
          <div key={course._id} className="col wd-dashboard-course" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                to={`/Kambaz/Courses/${course._id}/Home`}
                className="text-decoration-none text-dark"
              >
                <img
                  src={course.image || "/images/reactjs.jpg"}
                  width="100%"
                  height={160}
                  alt={course.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{course.name.substring(0, 20)}</h5>
                  <p className="card-text" style={{ maxHeight: 100 }}>
                    {course.description.substring(0, 50)}
                  </p>
                </div>
              </Link>

              <div className="card-footer d-flex justify-content-between">
                <div>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEditCourse(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(deleteCourse(course._id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
