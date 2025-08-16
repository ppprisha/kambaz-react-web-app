import React, { useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { addModule, updateModule, deleteModule, editModule } from "./reducer";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const [moduleName, setModuleName] = useState("");

  const courseModules = modules.filter((m: any) => m.course === cid);

  return (
    <Container>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() =>
          dispatch(addModule({ name: moduleName, course: cid }))
        }
      />

      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        {courseModules.map((module: any) => (
          <ListGroup.Item
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border border-secondary rounded"
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center text-white">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <input
                    className="form-control w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                  />
                )}
              </div>
              <ModuleControlButtons
                editModule={() => dispatch(editModule(module._id))}
                deleteModule={() => dispatch(deleteModule(module._id))} moduleId={""}              />
            </div>

            {module.lessons?.length > 0 && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroup.Item
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-start border-bottom"
                  >
                    <div className="d-flex align-items-center">
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
