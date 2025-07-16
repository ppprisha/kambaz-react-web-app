import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard" className="ps-md-5 pe-3 pt-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          <Col style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1234/Home" className="text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.png" height={160} />
                <Card.Body>
                  <Card.Title>CS1234 React JS</Card.Title>
                  <Card.Text>Full Stack software developer</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1220/Home" className="text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/angular.jpg" height={160} />
                <Card.Body>
                  <Card.Title>CS1220 Angular</Card.Title>
                  <Card.Text>Reactive web apps</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/4390/Home" className="text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/csharpgame.jpg" height={160} />
                <Card.Body>
                  <Card.Title>CS4390 C# Unity</Card.Title>
                  <Card.Text>Unity C# game developer</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/3500/Home" className="text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/iosswift.jpg" height={160} />
                <Card.Body>
                  <Card.Title>CS3500 iOS & Swift</Card.Title>
                  <Card.Text>iOS App Developer</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/4550/Home" className="text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/unrealengine.jpg" height={160} />
                <Card.Body>
                  <Card.Title>CS4550 Unreal Engine 5</Card.Title>
                  <Card.Text>Epic Games C++ developer</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/3200/Home" className="text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/sql.jpg" height={160} />
                <Card.Body>
                  <Card.Title>CS3200 SQL & MySQL</Card.Title>
                  <Card.Text>Data engineer</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1500/Home" className="text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/java.jpg" height={160} />
                <Card.Body>
                  <Card.Title>CS1500 Java</Card.Title>
                  <Card.Text>Java and OOP expert</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
