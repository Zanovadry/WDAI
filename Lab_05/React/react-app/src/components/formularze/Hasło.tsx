import { useState } from "react";

function Hasło() {
    const [message, setMessage] = useState("Proszę wprowadzić hasło");
    const [passwordValue, setPasswordValue] = useState("");
    const [repeatPasswordValue, setRepeatPasswordValue] = useState("");

    function UpdateMessage(passwordValue: string, repeatPasswordValue: string) {
        if (passwordValue.length == 0 && repeatPasswordValue.length == 0) {
            setMessage("Proszę wprowadzić hasło");
            return;
        }
        if (passwordValue != repeatPasswordValue) {
            setMessage("Hasła nie są zgodne");
        } else {
            setMessage("");
        }
    }

    return (
        <div>
            <label htmlFor="password">Hasło</label>
            <input
                type="text"
                id="password"
                value={passwordValue}
                onChange={(event) => {
                    setPasswordValue(event.target.value);
                    UpdateMessage(event.target.value, repeatPasswordValue);
                }}
            />
            <label htmlFor="repeatPassword">Powtórz hasło</label>
            <input
                type="text"
                id="repeatPassword"
                value={repeatPasswordValue}
                onChange={(event) => {
                    setRepeatPasswordValue(event.target.value);
                    UpdateMessage(passwordValue, event.target.value);
                }}
            />
            <div>{message}</div>
        </div>
    );
}

export default Hasło;
