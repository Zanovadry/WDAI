import { useState } from "react";
import Przycisk from "./Przycisk";

function NowyLicznik() {
    const [counter, setCounter] = useState(0);
    const incremetCounter = () => setCounter(counter + 1);

    return (
        <div>
            <div>{counter}</div>
            <Przycisk incrementFunction={incremetCounter}></Przycisk>
        </div>
    );
}

export default NowyLicznik;
