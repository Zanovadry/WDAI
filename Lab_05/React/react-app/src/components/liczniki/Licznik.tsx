import { useState } from "react";

function Licznik() {
    const [counter, setCounter] = useState(0);

    return (
        <>
            <div>{counter}</div>
            <button type="button" onClick={() => setCounter(counter + 1)}>
                Dodaj
            </button>
        </>
    );
}

export default Licznik;
