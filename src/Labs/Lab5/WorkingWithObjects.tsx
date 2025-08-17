import React, { useState } from "react";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment", description: "", due: "", completed: false, score: 0,
    });

    const [moduleObj, setModule] = useState({
        id: 1, name: "Module 1", description: "", course: "Full Stack Development",
    });

    return (
        <div id="wd-working-with-objects">
            <h3>Assignment</h3>

            <h4>Retrieve</h4>
            <a className="btn btn-primary me-2" href={`${REMOTE_SERVER}/lab5/assignment`}>
                Get Assignment
            </a>
            <a className="btn btn-primary" href={`${REMOTE_SERVER}/lab5/assignment/title`}>
                Get Title
            </a>

            <h4>Update</h4>
            <input type="text" value={assignment.title} onChange={(e) =>
                setAssignment({ ...assignment, title: e.target.value })} />
            <a className="btn btn-primary" href={`${REMOTE_SERVER}/lab5/assignment/title/${assignment.title}`}>
                Update Title
            </a>

            <input type="number" value={assignment.score} onChange={(e) =>
                setAssignment({ ...assignment, score: Number(e.target.value) })} />
            <a className="btn btn-secondary" href={`${REMOTE_SERVER}/lab5/assignment/score/${assignment.score}`}>
                Update Score
            </a>

            <label>
                Completed
                <input type="checkbox" checked={assignment.completed} onChange={(e) =>
                    setAssignment({ ...assignment, completed: e.target.checked })} />
            </label>
            <a className="btn btn-success" href={`${REMOTE_SERVER}/lab5/assignment/completed/${assignment.completed}`}>
                Update Completed
            </a>

            <h3>Module</h3>

            <a className="btn btn-primary me-2" href={`${REMOTE_SERVER}/lab5/module`}>
                Get Module
            </a>
            <a className="btn btn-primary" href={`${REMOTE_SERVER}/lab5/module/name`}>
                Get Module Name
            </a>

            <input type="text" value={moduleObj.name} onChange={(e) =>
                setModule({ ...moduleObj, name: e.target.value })} />
            <a className="btn btn-primary" href={`${REMOTE_SERVER}/lab5/module/name/${moduleObj.name}`}>
                Update Module Name
            </a>

            <input type="text" value={moduleObj.description} onChange={(e) =>
                setModule({ ...moduleObj, description: e.target.value })} />
            <a className="btn btn-primary" href={`${REMOTE_SERVER}/lab5/module/description/${moduleObj.description}`}>
                Update Module Description
            </a>
        </div>
    );
}
