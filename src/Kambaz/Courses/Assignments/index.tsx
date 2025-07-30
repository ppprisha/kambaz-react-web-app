import { useParams } from "react-router";
import * as db from "../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const courseAssignments = db.assignments.filter((a) => a.course === cid);

  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <button id="wd-add-quiz">+ Quiz</button>

      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        {courseAssignments.map((assignment) => (
          <li className="wd-assignment-list-item" key={assignment._id}>
            <a
              href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
              className="wd-assignment-link"
            >
              {assignment.title}
            </a>
          </li>
        ))}
      </ul>

      <h3 id="wd-quizzes-title">
        QUIZZES 10% of Total <button>+</button>
      </h3>
      <ul id="wd-quiz-list">
        <li className="wd-quiz-list-item">
          <a
            href={`#/Kambaz/Courses/${cid}/Quizzes/123`}
            className="wd-quiz-link"
          >
            Q1 - BASICS
          </a>
        </li>
      </ul>

      <h3 id="wd-quizzes-title">
        PROJECT 30% of Total <button>+</button>
      </h3>
      <ul id="wd-projects-list">
        <li className="wd-projects-list-item">
          <a
            href={`#/Kambaz/Courses/${cid}/Projects/123`}
            className="wd-project-link"
          >
            PROJECT
          </a>
        </li>
      </ul>

      <h3 id="wd-quizzes-title">
        EXAMS 20% of Total <button>+</button>
      </h3>
      <ul id="wd-exams-list">
        <li className="wd-exam-list-item">
          <a
            href={`#/Kambaz/Courses/${cid}/Exams/1`}
            className="wd-exam-link"
          >
            Exam 1
          </a>
        </li>
        <li className="wd-exam-list-item">
          <a
            href={`#/Kambaz/Courses/${cid}/Exams/2`}
            className="wd-exam-link"
          >
            Exam 2
          </a>
        </li>
      </ul>
    </div>
  );
}
