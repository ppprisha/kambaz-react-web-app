import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a: any) => a._id === aid);

  if (!assignment) return <div>Assignment not found</div>;

  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value={assignment.title} readOnly /><br /><br />

      <textarea id="wd-description" readOnly>
        {assignment.description}
      </textarea><br />

      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={assignment.points} readOnly />
            </td>
          </tr>

          <tr>
            <td><label htmlFor="wd-group">Group</label></td>
            <td>
              <select id="wd-group" defaultValue={assignment.group}>
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="PROJECT">PROJECT</option>
                <option value="EXAMS">EXAMS</option>
              </select>
            </td>
          </tr>

          <tr>
            <td><label htmlFor="wd-display-grade-as">Display Grade As</label></td>
            <td>
              <select id="wd-display-grade-as" defaultValue={assignment.displayGradeAs}>
                <option value="Percentage">Percentage</option>
                <option value="Points">Points</option>
                <option value="Complete/Incomplete">Complete/Incomplete</option>
              </select>
            </td>
          </tr>

          <tr>
            <td><label htmlFor="wd-submission-type">Submission Type</label></td>
            <td>
              <select id="wd-submission-type" defaultValue={assignment.submissionType}>
                <option value="Online">Online</option>
              </select>
            </td>
          </tr>

          <tr>
            <td valign="top">Online Entry Options</td>
            <td>
              <input type="checkbox" id="wd-text-entry" /> <label htmlFor="wd-text-entry">Text Entry</label><br />
              <input type="checkbox" id="wd-website-url" /> <label htmlFor="wd-website-url">Website URL</label><br />
              <input type="checkbox" id="wd-media-recordings" /> <label htmlFor="wd-media-recordings">Media Recordings</label><br />
              <input type="checkbox" id="wd-student-annotation" /> <label htmlFor="wd-student-annotation">Student Annotation</label><br />
              <input type="checkbox" id="wd-file-upload" /> <label htmlFor="wd-file-upload">File Upload</label>
            </td>
          </tr>

          <tr>
            <td><label htmlFor="wd-assign-to">Assign To</label></td>
            <td><input id="wd-assign-to" value="Everyone" readOnly /></td>
          </tr>

          <tr>
            <td><label htmlFor="wd-available-from">Available From</label></td>
            <td><input type="date" id="wd-available-from" defaultValue={assignment.availableFrom} /></td>
          </tr>

          <tr>
            <td><label htmlFor="wd-available-until">Available Until</label></td>
            <td><input type="date" id="wd-available-until" defaultValue={assignment.availableUntil} /></td>
          </tr>
        </tbody>
      </table>

      <br />
      <Link to={`/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
      <Link to={`/Courses/${cid}/Assignments`} className="btn btn-primary">Save</Link>
    </div>
  );
}
