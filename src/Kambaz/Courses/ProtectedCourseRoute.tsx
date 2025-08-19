import { useSelector } from "react-redux";
import { useParams, Navigate } from "react-router";

export default function ProtectedCourseRoute({ children }: { children: any }) {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { courses } = useSelector((state: any) => state.coursesReducer);

    const isEnrolled = courses.some((course: any) => course._id === cid);

    if (currentUser?.role === "FACULTY" || isEnrolled) {
        return children;
    }

    return <Navigate to="/Kambaz/Dashboard" replace />;
}