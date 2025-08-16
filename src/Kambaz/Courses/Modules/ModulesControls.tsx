import { useState } from "react";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import ModuleEditor from "./ModuleEditor";

interface ModulesControlsProps {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: ModulesControlsProps) {
  const [showEditor, setShowEditor] = useState(false);

  const handleClose = () => setShowEditor(false);
  const handleShow = () => setShowEditor(true);

  return (
    <div id="wd-modules-controls" className="text-nowrap d-flex flex-wrap justify-content-end gap-2">
      <Button variant="danger" size="lg" onClick={handleShow}>
        <FaPlus className="me-2" /> Module
      </Button>

      <Dropdown as={ButtonGroup}>
        <Button variant="secondary" size="lg">
          <GreenCheckmark /> Publish All
        </Button>
        <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />
        <Dropdown.Menu>
          <Dropdown.Item href="#">
            <GreenCheckmark /> Publish all modules and items
          </Dropdown.Item>
          <Dropdown.Item href="#">
            <GreenCheckmark /> Publish modules only
          </Dropdown.Item>
          <Dropdown.Item href="#">
            <GreenCheckmark /> Unpublish all modules and items
          </Dropdown.Item>
          <Dropdown.Item href="#">
            <GreenCheckmark /> Unpublish modules only
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Button variant="secondary" size="lg">
        View Progress
      </Button>
      <Button variant="secondary" size="lg">
        Collapse All
      </Button>

      {/* Module Editor Modal */}
      <ModuleEditor
        show={showEditor}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}
