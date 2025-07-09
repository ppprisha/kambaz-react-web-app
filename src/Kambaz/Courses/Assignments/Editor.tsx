export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>

        <tr>
            <td><label htmlFor="wd-group">Group</label></td>
            <td>
                <select id="wd-dgroup">
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
                <select id="wd-display-grade-as">
                    <option value="Percentage">Percentage</option>
                    <option value="Points">Points</option>
                    <option value="Complete/Incomplete">Complete/Incomplete</option>
                </select>
            </td>
        </tr>
        <tr>
            <td><label htmlFor="wd-submission-type">Submission Type</label></td>
            <td>
                <select id="wd-submission-type">
                    <option value="Online">Online</option>
                </select>
            </td>
        </tr>
        <tr>
            <td valign="top">Online Entry Options</td>
            <td>
                <input type="checkbox" id="wd-text-entry" />
                <label htmlFor="wd-text-entry">Text Entry</label><br/>

                <input type="checkbox" id="wd-website-url" />
                <label htmlFor="wd-website-url">Website URL</label><br/>

                <input type="checkbox" id="wd-media-recordings" />
                <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

                <input type="checkbox" id="wd-student-annotation" />
                <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

                <input type="checkbox" id="wd-file-upload" />
                <label htmlFor="wd-file-upload">File Upload</label>
            </td>
        </tr>

        <tr>
            <td><label htmlFor="wd-assign-to">Assign To</label></td>
            <td><input id="wd-assign-to" value="Everyone"/></td>
        </tr>

        <tr>
            <td><label htmlFor="wd-available-from">Available From</label></td>
            <td><input type="date"  id="wd-available-from" /></td>
        </tr>

        <tr>
            <td><label htmlFor="wd-available-until">Available Until</label></td>
            <td><input type="date"  id="wd-available-until" /></td>
        </tr>

      </table>
    </div>
);}

