import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Modules() {
  const { courseId } = useParams();
const modules = db.modules.filter((module: any) => module.course === courseId);

  return (
    <div>
      <ModuleControlButtons /><br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: any, index: number) => (
          <ListGroup.Item key={index} className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {module.name} <ModuleControlButtons />
            </div>

            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any, lessonIndex: number) => (
                  <ListGroup.Item key={lessonIndex} className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name} <LessonControlButtons />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
