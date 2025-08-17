import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";

export default function QueryParameters() {
    const [a, setA] = useState("5");
    const [b, setB] = useState("2");

    return (
        <div id="wd-query-parameters">
            <h3>Query Parameters</h3>
            <FormControl id="wd-query-parameter-a"
                className="mb-2"
                defaultValue={a} type="number"
                onChange={(e) => setA(e.target.value)} />
            <FormControl id="wd-query-parameter-b"
                className="mb-2"
                defaultValue={b} type="number"
                onChange={(e) => setB(e.target.value)} />

            <a id="wd-query-parameter-add"
                href={`${REMOTE_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}>
                Add {a} + {b}
            </a><br />

            <a id="wd-query-parameter-subtract"
                href={`${REMOTE_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}>
                Subtract {a} - {b}
            </a><br />

            <a id="wd-query-parameter-multiply"
                href={`${REMOTE_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}>
                Multiply {a} × {b}
            </a><br />

            <a id="wd-query-parameter-divide"
                href={`${REMOTE_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}>
                Divide {a} ÷ {b}
            </a>

            <hr />
        </div>
    );
}
