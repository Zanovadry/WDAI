import { useState } from "react";

function Logowanie() {
    const [isDisabled, setIsDisabled] = useState(true);
    const [passwordValue, setPasswordValue] = useState("");
    const [repeatPasswordValue, setRepeatPasswordValue] = useState("");
    const [loginValue, setLoginValue] = useState("");

    function UpdateButton(
        passwordValue: string,
        repeatPasswordValue: string,
        loginValue: string
    ) {
        if (
            passwordValue.length == 0 ||
            repeatPasswordValue.length == 0 ||
            loginValue.length == 0
        ) {
            setIsDisabled(true);
            return;
        }
        setIsDisabled(false);
    }

    function Login() {
        if (passwordValue != repeatPasswordValue) {
            alert("Hasła nie są zgodne");
            return;
        }
        alert("Zalogowano pomyślnie");
    }

    return (
        <div>
            <label htmlFor="login">Nazwa użytkownika</label>
            <input
                type="text"
                id="login"
                value={loginValue}
                onChange={(event) => {
                    setLoginValue(event.target.value);
                    UpdateButton(
                        passwordValue,
                        repeatPasswordValue,
                        event.target.value
                    );
                }}
            />
            <label htmlFor="password">Hasło</label>
            <input
                type="text"
                id="password"
                value={passwordValue}
                onChange={(event) => {
                    setPasswordValue(event.target.value);
                    UpdateButton(
                        event.target.value,
                        repeatPasswordValue,
                        loginValue
                    );
                }}
            />
            <label htmlFor="repeatPassword">Powtórz hasło</label>
            <input
                type="text"
                id="repeatPassword"
                value={repeatPasswordValue}
                onChange={(event) => {
                    setRepeatPasswordValue(event.target.value);
                    UpdateButton(passwordValue, event.target.value, loginValue);
                }}
            />
            <button onClick={Login} disabled={isDisabled}>
                Logowanie
            </button>
        </div>
    );
}

export default Logowanie;
