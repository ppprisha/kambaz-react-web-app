import Navigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import * as db from "./Database";
import { useState } from "react";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>(db.courses);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
    image: "/images/reactjs.jpg",
  });

  const addNewCourse = () => {
    const newId = Date.now().toString();
    setCourses([...courses, { ...course, _id: newId }]);
    resetForm();
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  const updateCourse = () => {
    setCourses(courses.map((c) => (c._id === course._id ? { ...course } : c)));
    resetForm();
  };

  const editCourse = (c: any) => setCourse({ ...c });

  const resetForm = () => {
    setCourse({
      _id: "0",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      description: "New Description",
      image: "/images/reactjs.jpg",
    });
  };

  return (
    <div id="wd-kambaz">
      <Navigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route
            path="Dashboard"
            element={
              <Dashboard
                courses={courses}
                course={course}
                setCourse={setCourse}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse}
                editCourse={editCourse}
              />
            }
          />
          <Route
            path="Courses/:cid/*"
            element={<Courses courses={courses} setCourse={setCourse} />}
          />
        </Routes>
      </div>
    </div>
  );
}
