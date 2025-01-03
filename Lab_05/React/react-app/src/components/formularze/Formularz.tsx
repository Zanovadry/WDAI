import { useState } from "react";

function Formularz() {
    const [text, setText] = useState("");

    return (
        <div>
            <div>{text}</div>
            <textarea
                onChange={(event) => setText(event.target.value)}
            ></textarea>
        </div>
    );
}

export default Formularz;
