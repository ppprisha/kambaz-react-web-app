import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedCourseRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const { cid } = useParams();

  if (!currentUser) {
    return <Navigate to="/Kambaz/Account/Signin" />;
  }

  const isEnrolled = enrollments.some(
    (enrollment: any) =>
      enrollment.user === currentUser?._id && enrollment.course === cid
  );

  if (isEnrolled) {
    return children;
  } else {
    return <Navigate to="/Kambaz/Dashboard" />;
  }
}