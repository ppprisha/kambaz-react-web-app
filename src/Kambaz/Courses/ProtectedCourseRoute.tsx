import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedCourseRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const courses = useSelector((state: any) => state.courseReducer.courses);
  const { cid } = useParams();

  if (!currentUser) {
    return <Navigate to="/Kambaz/Account/Signin" />;
  }
  console.log("currentUser", currentUser);
  console.log("enrollments", enrollments);
  console.log("cid", cid);
  let hasAccess = enrollments.some(
    (enrollment: any) =>
      enrollment.user === currentUser?._id && enrollment.course === cid
  );

  if (!hasAccess && currentUser.role === "FACULTY") {
    const course = courses.find((c: any) => c._id === cid);
    if (course && course.createdBy === currentUser._id) {
      hasAccess = true;
    }
  }

  if (currentUser.role === "FACULTY") {
    hasAccess = true;
  }

  return children;
}