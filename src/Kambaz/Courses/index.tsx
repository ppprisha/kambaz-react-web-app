import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizDetail from "./Quizzes/QuizDetail";
import QuizPreview from "./Quizzes/QuizPreview";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import People from "./People";
import { useSelector } from "react-redux";

export default function Courses() {
    const { cid } = useParams();
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const course = courses.find((courseItem: any) => courseItem._id === cid);
    const { pathname } = useLocation();

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}
            </h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="Quizzes/Editor" element={<QuizEditor quiz={undefined} onInputChange={function (field: string, value: any): void {
                throw new Error("Function not implemented.");
              } } onSave={function (shouldPublish: boolean, shouldNavigate: boolean): void {
                throw new Error("Function not implemented.");
              } } onCancel={function (): void {
                throw new Error("Function not implemented.");
              } } loading={false} isEditing={false} />} />
                        <Route path="Quizzes/:qid" element={<QuizDetail />} />
                        <Route path="Quizzes/:qid/Preview" element={<QuizPreview />} />
                        <Route path="Quizzes/:qid/Editor" element={<QuizEditor quiz={undefined} onInputChange={function (field: string, value: any): void {
                throw new Error("Function not implemented.");
              } } onSave={function (shouldPublish: boolean, shouldNavigate: boolean): void {
                throw new Error("Function not implemented.");
              } } onCancel={function (): void {
                throw new Error("Function not implemented.");
              } } loading={false} isEditing={false} />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/Editor" element={<AssignmentEditor />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="People" element={<People />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}