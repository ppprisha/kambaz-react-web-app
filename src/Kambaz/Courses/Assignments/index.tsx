export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments"
             id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <button id="wd-add-quiz">+ Quiz</button>

      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button> </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            A1 - ENV + HTML
          </a> </li>
        <li className="wd-assignment-list-item">
          {/* Complete On Your Own */}
        </li>
      </ul>
      <h3 id="wd-quizzes-title">
        QUIZZES 10% of Total <button>+</button> </h3>
        <ul id="wd-quiz-list">
            <li className="wd-quiz-list-item">
                <a href="#/Kambaz/Courses/1234/Quizzes/123"
                    className="wd-quiz-link" >
                        Q1 - BASICS
                    </a>
            </li>
        </ul>

    <h3 id="wd-quizzes-title">
        PROJECT 30% of Total <button>+</button> </h3>
        <ul id="wd-projects-list">
            <li className="wd-projects-list-item">
                <a href="#/Kambaz/Courses/1234/Projects/123"
                    className="wd-project-link" >
                        PROJECT
                    </a>
            </li>
        </ul>

        <h3 id="wd-quizzes-title">
        EXAMS 20% of Total <button>+</button> </h3>
        <ul id="wd-exams-list">
            <li className="wd-exams-list-item">
                <a href="#/Kambaz/Courses/1234/Exams/1"
                    className="wd-exam-link" >
                        Exam 1
                    </a>
            </li>
            <li className="wd-exam-list-item">
                <a href="#/Kambaz/Courses/1234/Exams/2"
                    className="wd-exam-link" >
                        Exam 2
                    </a>
        </li>
        </ul>
    </div>
);}
