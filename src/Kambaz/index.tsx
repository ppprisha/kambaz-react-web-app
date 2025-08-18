import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import ProtectedCourseRoute from "./Courses/ProtectedCourseRoute";
import Session from "./Account/Session";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import { addCourse, updateCourse, setCourses } from "./Courses/reducer";
import { enroll, unenroll } from "./enrollmentReducer";

export default function Kambaz() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [courses, setCoursesState] = useState<any[]>([]);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const initialCourseForm = {
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  };
  const [courseForm, setCourseForm] = useState(initialCourseForm);

  const findCoursesForUser = async () => {
    try {
      const userCourses = await userClient.findCoursesForUser(currentUser._id);
      setCoursesState(userCourses);
    } catch (error) {
      console.error(error);
    }
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
      dispatch(enroll({ user: currentUser?._id, course: courseId }));
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
      dispatch(unenroll({ user: currentUser?._id, course: courseId }));
    }
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };
        } else {
          return course;
        }
      })
    );
  };

  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const coursesWithEnrolledFlag = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true };
        }
        return course;
      });
      setCoursesState(coursesWithEnrolledFlag);
    } catch (error) {
      console.error(error);
    }
  };

  const addCourseHandler = async () => {
    try {
      const newCourse = await courseClient.createCourse(courseForm);
      dispatch(addCourse(newCourse));
      dispatch(enroll({ user: currentUser._id, course: newCourse._id }));
      setCoursesState([...courses, newCourse]);
      setCourseForm(initialCourseForm);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCourseHandler = async () => {
    try {
      await courseClient.updateCourse(courseForm);
      dispatch(updateCourse(courseForm));
      setCoursesState(
        courses.map((course) =>
          course._id === courseForm._id ? courseForm : course
        )
      );
      setCourseForm(initialCourseForm);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCourseHandler = async (courseId: any) => {
    try {
      await courseClient.deleteCourse(courseId);
      await userClient.deleteAllEnrollmentsForCourse(courseId);
      setCoursesState(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "STUDENT") {
        enrolling ? fetchCourses() : findCoursesForUser();
      } else {
        findCoursesForUser();
      }
    }
  }, [currentUser, enrolling]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const allCourses = await courseClient.fetchAllCourses();
        dispatch(setCourses(allCourses));
      } catch (error) {
        console.error(error);
      }
    };
    if (currentUser) {
      fetchAll();
    }
  }, [currentUser, dispatch]);

  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    courseForm={courseForm}
                    setCourseForm={setCourseForm}
                    addCourseHandler={addCourseHandler}
                    updateCourseHandler={updateCourseHandler}
                    deleteCourseHandler={deleteCourseHandler}
                    enrolling={enrolling}
                    setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedCourseRoute>
                  <Courses courses={courses} />
                </ProtectedCourseRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}