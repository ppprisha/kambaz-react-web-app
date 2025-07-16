import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function CourseNavigation() {
  const { pathname } = useLocation();

  return (
    <div id="wd-courses-navigation" className="wd position-fixed top-0 bottom-0 bg-white pt-4 px-2 d-none d-md-block" style={{ width: "200px" }}>
      <ListGroup className="rounded-0 fs-5 border-0">
        <ListGroup.Item
          as={Link}
          to="/Kambaz/Courses/1234/Home"
          className={`list-group-item border-0 ${pathname.includes("/Home") ? "active" : "text-danger"}`}>
          Home
        </ListGroup.Item>

        <ListGroup.Item
          as={Link}
          to="/Kambaz/Courses/1234/Modules"
          className={`list-group-item border-0 ${pathname.includes("/Modules") ? "active" : "text-danger"}`}>
          Modules
        </ListGroup.Item>

        <ListGroup.Item
          as={Link}
          to="/Kambaz/Courses/1234/Piazza"
          className={`list-group-item border-0 ${pathname.includes("/Piazza") ? "active" : "text-danger"}`}>
          Piazza
        </ListGroup.Item>

        <ListGroup.Item
          as={Link}
          to="/Kambaz/Courses/1234/Zoom"
          className={`list-group-item border-0 ${pathname.includes("/Zoom") ? "active" : "text-danger"}`}>
          Zoom
        </ListGroup.Item>

        <ListGroup.Item
          as={Link}
          to="/Kambaz/Courses/1234/Assignments"
          className={`list-group-item border-0 ${pathname.includes("/Assignments") ? "active" : "text-danger"}`}>
          Assignments
        </ListGroup.Item>

        <ListGroup.Item
          as={Link}
          to="/Kambaz/Courses/1234/Quizzes"
          className={`list-group-item border-0 ${pathname.includes("/Quizzes") ? "active" : "text-danger"}`}>
          Quizzes
        </ListGroup.Item>

        <ListGroup.Item
          as={Link}
          to="/Kambaz/Courses/1234/People"
          className={`list-group-item border-0 ${pathname.includes("/People") ? "active" : "text-danger"}`}>
          People
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
