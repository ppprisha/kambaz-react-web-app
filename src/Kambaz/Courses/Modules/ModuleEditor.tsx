import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface ModuleEditorProps {
    show: boolean;
    handleClose: () => void;
    dialogTitle: string;
    moduleName: string;
    setModuleName: (title: string) => void;
    addModule: () => void;
}

export default function ModuleEditor({
    show,
    handleClose,
    dialogTitle,
    moduleName,
    setModuleName,
    addModule,
}: ModuleEditorProps) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{dialogTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Module Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={moduleName}
                            onChange={(e) => setModuleName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        addModule();
                        handleClose();
                    }}
                >
                    Add Module
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
