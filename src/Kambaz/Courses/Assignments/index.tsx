import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";
import { Button, Form } from "react-bootstrap";

interface Assignment {
  _id: string;
  course: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find(
    (a: Assignment) => a._id === aid && a.course === cid
  );

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  const [formData, setFormData] = useState<Assignment>({ ...assignment });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value } as Assignment);
  };

  return (
    <div id="wd-assignment-editor" className="p-4">
      <h2>{assignment.title}</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            name="points"
            value={formData.points}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control
            type="date"
            name="availableFrom"
            value={formData.availableFrom}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available Until</Form.Label>
          <Form.Control
            type="date"
            name="availableUntil"
            value={formData.availableUntil}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="primary">Save</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
