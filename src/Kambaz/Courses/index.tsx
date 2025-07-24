import CourseNavigation from "./Navigation";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Modules from "./Modules";
import Home from "./Home";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { courses } from "../Database";
import { FaAlignJustify } from "react-icons/fa";

export default function Courses() {
    const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
         <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />
              {course && course.name}  &gt; {pathname.split("/")[4]}

      Course 1234 </h2> <hr />
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block me-3">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<h2>People</h2>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

