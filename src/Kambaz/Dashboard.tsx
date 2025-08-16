import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

interface DashboardProps {
  courses: any[];
  course: any;
  setCourse: React.Dispatch<any>;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
  editCourse: (c: any) => void;
}

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  editCourse,
}: DashboardProps) {
  return (
    <div id="wd-dashboard" className="ps-md-5 pe-3 pt-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* Add/Edit Course Form */}
      <h5>
        New Course
        <Button className="float-end ms-2" onClick={updateCourse} variant="warning">
          Update
        </Button>
        <Button className="float-end" onClick={addNewCourse} variant="primary">
          Add
        </Button>
      </h5>

      <FormControl
        value={course.name}
        placeholder="Course Name"
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        value={course.description}
        as="textarea"
        rows={3}
        placeholder="Course Description"
        className="mb-3"
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />

      {/* Courses List */}
      <h2>Published Courses ({courses.length})</h2>
      <hr />

      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {courses.map((c: any) => (
          <Col key={c._id}>
            <Card>
              <Link to={`/Courses/${c._id}/Home`} className="text-decoration-none text-dark">
                <Card.Img variant="top" src={c.image || "/images/reactjs.png"} height={160} />
                <Card.Body>
                  <Card.Title className="text-nowrap overflow-hidden">{c.name}</Card.Title>
                  <Card.Text className="overflow-hidden" style={{ height: "100px" }}>
                    {c.description}
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>

              <div className="d-flex justify-content-between m-1">
                <Button variant="warning" onClick={() => editCourse(c)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => deleteCourse(c._id)}>
                  Delete
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
