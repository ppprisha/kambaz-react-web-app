import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as db from "../../Database";

type Assignment = {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  group: "ASSIGNMENTS" | "QUIZZES" | "PROJECT" | "EXAMS";
  displayGradeAs: "Percentage" | "Points" | "Complete/Incomplete";
  submissionType: "Online";
  onlineOptions: {
    textEntry: boolean;
    websiteUrl: boolean;
    mediaRecordings: boolean;
    studentAnnotation: boolean;
    fileUpload: boolean;
  };
  assignTo: string;
};

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const navigate = useNavigate();

  const original = db.assignments.find(a => a._id === aid);

  const [assignment, setAssignment] = useState<Assignment>(
    original
      ? {
          ...original,
          group: "ASSIGNMENTS",
          displayGradeAs: "Percentage",
          submissionType: "Online",
          onlineOptions: {
            textEntry: false,
            websiteUrl: false,
            mediaRecordings: false,
            studentAnnotation: false,
            fileUpload: false,
          },
          assignTo: "Everyone",
        }
      : null as any
  );

  if (!assignment) return <div>Assignment not found</div>;

  const handleChange = (key: keyof Assignment, value: any) => {
    setAssignment({ ...assignment, [key]: value });
  };

  const handleOnlineOptionChange = (option: keyof Assignment["onlineOptions"]) => {
    setAssignment({
      ...assignment,
      onlineOptions: {
        ...assignment.onlineOptions,
        [option]: !assignment.onlineOptions[option],
      },
    });
  };

  const handleSave = () => {
    // Optional: persist changes to db.assignments here
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => navigate(`/Kambaz/Courses/${cid}/Assignments`);

  return (
    <div id="wd-assignments-editor">
      <label>Assignment Name</label>
      <input
        value={assignment.title}
        onChange={e => handleChange("title", e.target.value)}
      />
      <br /><br />

      <label>Description</label>
      <textarea
        value={assignment.description}
        onChange={e => handleChange("description", e.target.value)}
      />
      <br />

      <label>Points</label>
      <input
        type="number"
        value={assignment.points}
        onChange={e => handleChange("points", Number(e.target.value))}
      />
      <br /><br />

      <label>Group</label>
      <select
        value={assignment.group}
        onChange={e => handleChange("group", e.target.value)}
      >
        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
        <option value="QUIZZES">QUIZZES</option>
        <option value="PROJECT">PROJECT</option>
        <option value="EXAMS">EXAMS</option>
      </select>
      <br /><br />

      <label>Display Grade As</label>
      <select
        value={assignment.displayGradeAs}
        onChange={e => handleChange("displayGradeAs", e.target.value)}
      >
        <option value="Percentage">Percentage</option>
        <option value="Points">Points</option>
        <option value="Complete/Incomplete">Complete/Incomplete</option>
      </select>
      <br /><br />

      <label>Submission Type</label>
      <select
        value={assignment.submissionType}
        onChange={e => handleChange("submissionType", e.target.value)}
      >
        <option value="Online">Online</option>
      </select>
      <br /><br />

      <label>Online Entry Options</label>
      <div>
        {Object.keys(assignment.onlineOptions).map(option => (
          <div key={option}>
            <input
              type="checkbox"
              checked={assignment.onlineOptions[option as keyof Assignment["onlineOptions"]]}
              onChange={() => handleOnlineOptionChange(option as keyof Assignment["onlineOptions"])}
            />
            <label>{option.replace(/([A-Z])/g, " $1")}</label>
          </div>
        ))}
      </div>
      <br />

      <label>Assign To</label>
      <input
        value={assignment.assignTo}
        onChange={e => handleChange("assignTo", e.target.value)}
      />
      <br /><br />

      <label>Due Date</label>
      <input
        type="date"
        value={assignment.dueDate}
        onChange={e => handleChange("dueDate", e.target.value)}
      />
      <br /><br />

      <label>Available From</label>
      <input
        type="date"
        value={assignment.availableFrom}
        onChange={e => handleChange("availableFrom", e.target.value)}
      />
      <label>Until</label>
      <input
        type="date"
        value={assignment.availableUntil}
        onChange={e => handleChange("availableUntil", e.target.value)}
      />
      <br /><br />

      <button className="btn btn-secondary me-2" onClick={handleCancel}>Cancel</button>
      <button className="btn btn-primary" onClick={handleSave}>Save</button>
    </div>
  );
}
