import React, { useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import * as db from "../../Database";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
  const { cid } = useParams();
  const [modules, setModules] = useState<any[]>(db.modules);

  const courseModules = modules.filter((module) => module.course === cid);

  return (
    <Container>
      <ModulesControls />
      <br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        {courseModules.map((module) => (
          <ListGroup.Item
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border border-secondary rounded"
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center text-white">
                <BsGripVertical className="me-2 fs-3" />
                {module.name}
              </div>
              <ModuleControlButtons />
            </div>

            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson) => (
                  <ListGroup.Item
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-start border-bottom"
                  >
                    <div className="d-flex">
                      <BsGripVertical className="me-2 fs-3 mt-1" />
                      <div>{lesson.name}</div>
                    </div>
                    <LessonControlButtons />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
