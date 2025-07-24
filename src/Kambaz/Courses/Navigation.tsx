import { ListGroup } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const { pathname } = useLocation();
  const { courseId } = useParams();

  const items = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "People",
  ];

  return (
    <div
      id="wd-courses-navigation"
      className="wd position-fixed top-0 bottom-0 bg-white pt-4 px-2 d-none d-md-block"
      style={{ width: "200px" }}
    >
      <ListGroup className="rounded-0 fs-5 border-0">
        {items.map((item) => (
          <ListGroup.Item
            key={item}
            as={Link}
            to={`/Kambaz/Courses/${courseId}/${item}`}
            className={`list-group-item border-0 ${
              pathname.includes(`/${item}`) ? "active" : "text-danger"
            }`}
          >
            {item}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}